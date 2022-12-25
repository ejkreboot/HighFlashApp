import { Cards } from "high-flash";

const c = new Cards();

// get list of all categories
export async function GET({ request, url, params }) {
  return new Response(JSON.stringify(await(c.get_categories())));
}
