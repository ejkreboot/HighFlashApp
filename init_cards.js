import {Cards} from 'high-flash';
import getopts from "getopts"

const options = getopts(process.argv.slice(2), {
  alias: {
    force: "f",
    usage: "u"
  },
})

if(options.u) {
    console.log("Usage: node init-cards.js [--force]\n")
    process.exit();
}

const c = new Cards();
const exists = await c.check_db();

if(exists && options.f) {
    console.log("Resetting database and loading cards...\n")
    await c.reset_db();
    await c.import_from_csv("data/cards.csv");
    console.log("Done.\n")
} else if (exists) {
    console.log("Database exists...use --force option to re-initialize.\n")
} else {
    console.log("Creating database and loading cards...\n")
    await c.reset_db();
    console.log("Done.\n")
}

c.close_db();
