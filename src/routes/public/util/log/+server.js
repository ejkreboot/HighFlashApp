import * as dotenv from 'dotenv' 
dotenv.config()
import { Logtail } from "@logtail/node";

export async function POST({ request, params, url }) {
    const log_token = process.env.HIGHFLASH_LOG_TOKEN || null;
    let res;
    if(log_token && log_token == url.searchParams.get("token")) {
        const logtail = new Logtail(process.env.HIGHFLASH_LOGTAIL_TOKEN);
        let msg = await request.json();
        await logtail.debug(msg);
        res = new Response("OK", {status: 200});
    } else {
        const options = {
            status:403,
            headers: {
              "Content-type" : "application/problem+json",
              "Content-Language": "en"
            }
          }
        const body = {
            "title": "Authorization token missing",
            "detail": "An authorization token must be provided in query string to use this service.",
            "status": 403,
        }
        res = new Response(JSON.stringify(body), options);
    }
    return res;
}
