import { Cards } from "high-flash";
const c = new Cards(true, 'data/cards.sqlite');
import sanitizeHtml from "sanitize-html";

// get card
export async function GET({ params }) {
  const card = await(c.get_card(params.slug));
  return new Response(JSON.stringify(card));
}

// update card
export async function POST({ request, params }) {
  let card = await request.json()
  card.uuid = params.slug;
  card.front = sanitizeHtml(card.front);
  card.back = sanitizeHtml(card.back);
  c.update_card(card);
  return new Response(JSON.stringify({result: "OK"}));
}
