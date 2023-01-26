import { Cards } from "high-flash";
async function GET({ request, url, params }) {
  const c = new Cards();
  const cats = await c.get_categories();
  await c.close_db();
  return new Response(cats);
}
export {
  GET
};
