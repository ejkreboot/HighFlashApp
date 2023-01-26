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
  const body = await response.json();
  console.log("Retrieve session: " + JSON.stringify(body))
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
    const session = await fetch_session(idp_session_token)
    try {
      const auth_token = jwt.verify(session.token, public_key, options);
      console.log("Verifid token: ", JSON.stringify(auth_token);
      session_token = session.token;
      destination = session.destination;
      console.log("Upserting new session: ", session_token)
      const user = await User.upsert({ email: auth_token.email, token: session_token, status: "verified"})
    } catch(err) {
        console.log("Error: ", err)
        session_token = "";
        destination = BASEURL + "public/auth/login";
    }
  } else {
    session_token = "";
    destination = BASEURL + "public/auth/login";
  }

  console.log("Redirecting to ", destination);
  let res = new Response("<html><head><meta http-equiv='Refresh' content='0; url=" + destination + "'><head></html>");
  res.headers.append("Content-Type", "text/html; charset=utf-8");
  res.headers.append("Set-Cookie", "session=" + session_token + "; SameSite=None; Secure; HttpOnly; Path=/; Max-Age=86400");
  return res;
}