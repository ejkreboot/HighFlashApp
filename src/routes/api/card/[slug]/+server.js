import { Cards } from "high-flash";
import sanitizeHtml from "sanitize-html";

// get card
export async function GET({ params }) {
  const c = new Cards(true);
  const card = await(c.get_card(params.slug));
  await c.close_db()
  return new Response(JSON.stringify(card));
``}

// update card
export async function POST({ request, params }) {
  const c = new Cards(true);
  let card = await request.json()
  card.uuid = params.slug;
  card.front = sanitizeHtml(card.front);
  card.back = sanitizeHtml(card.back);
  await c.update_card(card);
  await c.close_db()
  return new Response(JSON.stringify({result: "OK"}));
}

