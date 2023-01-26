import * as dotenv from "dotenv";
import { r as redirect } from "./index.js";
import { U as User } from "./user.js";
import { a as S3Read } from "./sthree.js";
dotenv.config();
const BASEURL = process.env.HIGHFLASH_PROTOCOL + "://" + process.env.HIGHFLASH_HOST + (process.env.HIGHFLASH_PORT ? ":" + process.env.HIGHFLASH_PORT : "") + process.env.HIGHFLASH_ROOT;
User.sync();
const handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session");
  const path = event.url.pathname;
  if (path == "/") {
    throw redirect(307, "/public/auth/login");
  }
  if (path.match("^/images")) {
    const image_path = path.replace("/images/", "");
    console.log(image_path);
    const img = await S3Read(image_path);
    const options = {
      status: 200,
      headers: {
        "Content-type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=" + image_path
      }
    };
    var res = new Response(img, options);
    return res;
  }
  if (path.match("/public/auth/logout")) {
    console.log("logging out");
    event.cookies.set("session", "", {
      path: "/",
      expires: new Date(0)
    });
    return await resolve(event);
  }
  if (path.match("/api")) {
    return await resolve(event);
  }
  if (path.match("favicon")) {
    return await resolve(event);
  }
  if (!session || session === "null") {
    const regex = /^\/public/g;
    const pub = path.match(regex);
    if (!pub) {
      throw redirect(307, process.env.HIGHFLASH_SSO_URI + "?requested_url=" + event.url + "&auth_url=" + BASEURL + "public/auth/sso");
    } else {
      return await resolve(event);
    }
  }
  const user = await User.findOne(
    {
      where: { token: session }
    }
  );
  if (user) {
    const regex = /^\/private\/admin/g;
    const admin = path.match(regex);
    if (admin) {
      if (!user.group == "admin") {
        throw redirect(401, "/protected/study");
      }
    }
    event.locals.user = {
      email: user.email,
      group: user.group
    };
  } else {
    const regex = /^\/public/g;
    const pub = path.match(regex);
    if (!pub) {
      throw redirect(307, process.env.HIGHFLASH_SSO_URI + "?requested_url=" + event.url + "&auth_url=" + BASEURL + "public/auth/sso");
    }
  }
  return await resolve(event);
};
export {
  handle
};
