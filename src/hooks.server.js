import * as dotenv from 'dotenv';
dotenv.config();
import { redirect } from '@sveltejs/kit';
import { User } from '$lib/server/user.js';
import { S3Read } from '$lib/server/sthree.js';

const BASEURL = process.env.HIGHFLASH_PROTOCOL + "://" + 
                process.env.HIGHFLASH_HOST + 
                (process.env.HIGHFLASH_PORT ? ":" + process.env.HIGHFLASH_PORT : "") +
                process.env.HIGHFLASH_ROOT;

User.sync();

export const handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session')
  const path = event.url.pathname;

  if(path == "/") {
    throw redirect(307, '/public/auth/login');
  }

  if(path.match("^/images")) {
    const image_path = path.replace("/images/", "")  
    console.log(image_path);
    //const img = await fetch("https://highflashimages.s3.us-east-2.amazonaws.com/" + image_path)
    const img = await S3Read(image_path)
    const options = {
      status:200,
      headers: {
        "Content-type" : "application/octet-stream",
        "Content-Disposition": "attachment; filename=" + image_path
      }
    }
    var res = new Response(img, options );
    return(res);
  }

  if(path.match("/public/auth/logout")) {
    console.log("logging out")
    event.cookies.set('session', '', {
      path: '/',
      expires: new Date(0),
    })
    return await resolve(event);
  }

  if(path.match("/api")) {
    return await resolve(event);
  }

  if(path.match("favicon")) {
    return await resolve(event);
  }
  // http://localhost:5173/protected/study
  if (!session || session === "null") {
    const regex = /^\/public/g;
    const pub = path.match(regex);
    if(!pub) {
      throw redirect(307, process.env.HIGHFLASH_SSO_URI + "?" +
                            "requested_url=" + event.url + 
                            "&auth_url=" + BASEURL + "public/auth/sso");
    } else {
      // public route ... proceed with request
      return await resolve(event)
    }
  }

  const user = await User.findOne(
    {
        where: { token: session } 
    });

  console.log("HOOKS: session is " + JSON.stringify(session))

  if (user) {
    console.log("HOOKS: user is " + JSON.stringify(user))
    const regex = /^\/private\/admin/g;
    const admin = path.match(regex);
    if(admin) {
      if(!user.group == "admin") {
        // requested an admin route but not an admin
        throw redirect(401, '/protected/study');
      }
    }
    event.locals.user = {
      email: user.email,
      group: user.group
    }
  } else {
    console.log("HOOKS: User not found.")
    const regex = /^\/public/g;
    const pub = path.match(regex);
    if(!pub) {
      // requested a protected route invalid token...re-auth
      throw redirect(307, "www.example.com");
      throw redirect(307, process.env.HIGHFLASH_SSO_URI + "?" +
                            "requested_url=" + event.url + 
                            "&auth_url=" + BASEURL + "public/auth/sso");
    }
    // stale session cookie but public route so ok to continue...
  }
  return await resolve(event);
}
