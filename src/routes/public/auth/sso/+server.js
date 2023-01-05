import jwt from 'jsonwebtoken';
import fs from 'fs';
import { User } from '$lib/server/user.js';
import { nanoid } from 'nanoid';

const DEBUG = false;

function log(m) {
  if(DEBUG) { console.log(m)}
}

const options = {
  issuer:  'highflowpeds.com',
  audience:  'hfpsso',
  expiresIn:  "1d",
  algorithms: ["RS256"]
};

const BASEURL = process.env.HIGHFLASH_PROTOCOL + "://" + 
                process.env.HIGHFLASH_HOST + 
                (process.env.HIGHFLASH_PORT ? ":" + process.env.HIGHFLASH_PORT : "") +
                process.env.HIGHFLASH_ROOT;

async function fetch_session(token) {
  // retrieve credentials
  const response = await fetch("https://www.highflowpeds.com/_functions/hfpSSO", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({"session_token": token})
  })
  log("(HF 29) : Parsing response.")
  const body = await response.json();
  log("(HF 33) : Response body: " + JSON.stringify(body))
  return {token: body.auth_token, destination: body.destination};
}

// retrieve session from SSO based on session cookie query param, 
// set session cookie, and redirect to destination orginally requested
// (via http refresh so we can set cookie).
export async function GET({ request, url }) {
  var session_token, destination;
  const public_key = process.env.WIX_SSO_PUBLIC_KEY || fs.readFileSync('data/hfp_public_key', 'utf8');
  const idp_session_token = url.searchParams.get('session_token');

  if(idp_session_token) {
    log("(HF 46) : Posting back to SSO for credentials for token " + idp_session_token)
    const session = await fetch_session(idp_session_token)
    try {
      const auth_token = jwt.verify(session.token, public_key, options);
      session_token = nanoid();
      destination = session.destination;
      const user = await User.upsert({ email: auth_token.email, token: session_token, status: "verified"})
      console.log("USPSERTED USER: " + JSON.stringify(user))
    } catch(err) {
        log("(HF 54) : No valid session found at SSO endpoint.")
        session_token = "";
        destination = BASEURL + "public/auth/login";
    }
  } else {
    log("(HF 59) : No valid session token passed to /public/auth/sso")
    session_token = "";
    destination = BASEURL + "public/auth/login";
  }

  log("(HF 64) : Responding with html redirect to " + destination)
  let res = new Response("<html><head><meta http-equiv='Refresh' content='0; url=" + destination + "'><head></html>");
  res.headers.append("Content-Type", "text/html; charset=utf-8");
  res.headers.append("Set-Cookie", "session=" + session_token + "; SameSite=Lax; HttpOnly; Path=/; Max-Age=86400");
  return res;
}