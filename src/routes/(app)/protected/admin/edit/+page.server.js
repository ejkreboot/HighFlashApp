import { Cards } from "high-flash";
import { S3Save } from '$lib/server/sthree.js';

/*
 *  Get category list from server on page load
 */

export const load = async ({ locals }) => {
    const c = new Cards(true, 'data/cards.sqlite');
    const categories = await c.get_categories();
    await c.close_db();
    return {
      categories: categories
    }
  }

async function import_csv(data) {
    const chunks = [];
    for await (const chunk of data.stream()) {
        chunks.push(Buffer.from(chunk));
    }
    const file = Buffer.concat(chunks);
    const csv = file.toString('utf8');
}

/*
 *  Backend scripting for file uploader via default POST action
 *
 */
 

function get_ext(f) {
    const ext = f.replace(/(.*)(\.\w{2,4})/, "$2")
    return(ext)
}

function file_filter(filelist) {
    const allowed = [".png", ".jpg", ".jpeg", ".tif", ".tiff", ".csv", ".JPG", ".JPEG", ".PNG", ".TIF", ".TIFF",".CSV"];
    return(filelist.map(f => { return(allowed.indexOf(get_ext(f)) > -1 )}));
}

export const actions = {
    default: async ({ request }) => {
        const values = await request.formData();
        let filenames = values.get("upload_file_name").split(",");
        let files = values.getAll("upload_file");

        // ignore files that are not image types
        const file_ok = file_filter(filenames);
        files = files.filter((f,i) => file_ok[i]);
        filenames = filenames.filter((f,i) => file_ok[i]);

        const result = await Promise.all(files.map(async (f, i) => {
            const filename = filenames[i];
            console.log(get_ext(filename));
            if(get_ext(filename).toUpperCase() == ".CSV") {
                console.log("Importing CSV");
                await import_csv(f);
            } else {
                // To Do: don't over write files. 
                await S3Save(f, filename);
            }
            return(true);
        }))

        let message = null;
        if(!result.every(r => r)) {
            message = "The following file(s) already exist on the server and were not saved: " + 
              filenames.filter( (f,i) => !result[i]).join(", ") + "."
        }

        return {
            success: true,
            message: message
        } 
    }
  };
