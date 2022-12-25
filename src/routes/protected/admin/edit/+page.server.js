import fs from 'fs';
import { Cards } from "high-flash";
const c = new Cards(true, 'data/cards.sqlite');

/*
 *  Get category list from server on page load
 */

export const load = async ({ locals }) => {
    const categories = await c.get_categories();
    return {
      categories: categories
    }
  }

/*
 *  Backend scripting for file uploader via default POST action
 *
 */
 
/*
 * write a File object to disk
 *   f: File object
 *   p: path to save to
 * 
*/
async function write_file(f, p) {
    const readableStream = f.stream();
    const reader = readableStream.getReader();
    const writer = fs.createWriteStream(p, {flags: 'a'});
    while (true) {
        let { done, value } = await reader.read();
        if (done) {
          break;
        }
        writer.write(value);
    }
    return true;
}

function get_ext(f) {
    const ext = f.replace(/(.*)(\.\w{2,4})/, "$2")
    return(ext)
}

function file_filter(filelist) {
    const allowed = [".png", ".jpg", ".jpeg", ".tif", ".tiff", ".JPG", ".JPEG", ".PNG", ".TIF", ".TIFF"];
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
            const filename = "static/images/" + filenames[i];
            // don't over write files. 
            if(fs.existsSync(filename)) {
                return false;
            }
            await write_file(f, filename);
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