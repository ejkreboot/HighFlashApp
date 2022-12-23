import { redirect } from '@sveltejs/kit';
import { User } from '$lib/server/user.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';

export const handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session')
  const path = event.url.pathname;
  if(path == "/") {
    throw redirect(307, '/public/landing');
  }

  if (!session) {
    const regex = /^\/public/g;
    const pub = path.match(regex);
    if(!pub) {
      // requested a protected route but not logged in
      // attempt SSO login
      const url = "https://www.highflowpeds.com/_functions/hfpSSO"
      const response = await fetch(url, {
        method: 'GET'
      })
      const token = await response.json();
      console.log(token);

      const private_key = fs.readFileSync('./data/hfp_public_key', 'utf8');
      const options = {
        issuer:  'highflowpeds.com',
        audience:  'hfpsso',
        expiresIn:  "1d",
        algorithms: ["RS256"]
      };
      const user_data = jwt.verify(token, token, options);
      console.log(user_data);

      throw redirect(307, '/public/auth/login');
    } else {
      // public route ... proceed with request
      return await resolve(event)
    }
  }

  const user = await User.findOne(
    {
        where: { token: session } 
    });

  if (user) {
    const regex = /^\/private\/admin/g;
    const admin = path.match(regex);
    if(admin) {
      if(!user.group == "admin") {
        // requested an admin route but not an admin
        throw redirect(403, '/protected/landing');
      }
    }
    event.locals.user = {
      email: user.email,
      group: user.group
    }
  } else {
    const regex = /^\/public/g;
    const pub = path.match(regex);
    if(!pub) {
      // requested a protected route invalid token...
      throw redirect(307, '/public/auth/login');
    }
    // stale session cookie but public route so ok to continue...
  }

  return await resolve(event);
}
