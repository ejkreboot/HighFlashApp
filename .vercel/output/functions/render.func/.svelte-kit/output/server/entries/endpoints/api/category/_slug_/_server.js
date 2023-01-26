import { Cards } from "high-flash";
async function GET({ request, url, params }) {
  const c = new Cards();
  const cards = await c.get_category(params.slug);
  await c.close_db();
  return new Response(JSON.stringify(cards));
}
export {
  GET
};
