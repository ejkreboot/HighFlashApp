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
    await User.sync();
    let uuid = nanoid();
    const pwd = await(bcrypt.hash(p, 10));
    let ok = true;
    try{
        await User.create({
            email: e,
            token: null,
            status: "verified",
            password: pwd,
            reset: null,
            newpassword: null,
            group: g, 
            expired: false
        });
    } catch(e) {
        if(!e.name.match("SequelizeUniqueConstraintError"))
        {
            throw(e)
        } else {
            console.log("Warning: create user ignored as user already exists")
            ok = false;
        }
    }
    return ok;
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

var token;

await create_user("me@mail.com", "mypassword", "admin")
await create_user("jane@mail.com", "janepassword", "regular")
await create_user("bob@mail.com", "bobpassword", "regular")
// await User.upsert({email: "me@mail.com", status: "verified", token: token})

await Close();

console.log("Done.\n");
