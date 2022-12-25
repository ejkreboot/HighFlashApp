import { Cards } from "high-flash";

const c = new Cards();

// get all cards for specified category
export async function GET({ request, url, params }) {
  return new Response(JSON.stringify(await(c.get_category(params.slug))));
}
