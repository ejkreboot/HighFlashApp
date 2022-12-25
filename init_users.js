import getopts from "getopts"
import {User, Init, Close} from './src/lib/server/user.js';
import { nanoid } from 'nanoid';
import * as bcrypt from 'bcrypt'
import pkg from 'why-is-node-still-running';
const { whyIsNodeStillRunning } = pkg;

const options = getopts(process.argv.slice(2), {
    alias: {
      drop: "d", // clear database (!)
      usage: "u"
    },
  })

async function create_user(e, p, g) {
    const key = nanoid(6);
    await User.sync();
    let uuid = nanoid();
    const pwd = await(bcrypt.hash(p, 10));
    await User.create({
        email: e,
        id: uuid,
        token: null,
        status: "verified",
        password: pwd,
        key: key,
        reset: null,
        newpassword: null,
        group: g, 
        expired: false
    });
}

if(options.u) {
    console.log("Usage: node init-users.js [--drop]\n")
    process.exit();
}

if(options.d) {
    console.log("Removing current users since --drop option used!\n")
    await Init(true);
} else {
    await Init();
}

await create_user("me@mail.com", "mypassword", "admin")
await create_user("jane@mail.com", "janepassword", "regular")
await create_user("bob@mail.com", "bobpassword", "regular")
await Close();

console.log("Done.\n");
