import { Cards } from "high-flash";


// get all cards for specified category
export async function GET({ request, url, params }) {
  const c = new Cards();
  const cards = await(c.get_category(params.slug));
  await c.close_db();
  return new Response(JSON.stringify(cards));
}
