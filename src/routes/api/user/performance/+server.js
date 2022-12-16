import { User } from '$lib/server/user.js';
import cookie from 'cookie';
import { Cards } from "high-flash";
const c = new Cards(true, 'data/cards.sqlite');

// study card
export async function GET({ request, params }) {
  const session = cookie.parse(request.headers.get("cookie")).session;
  const categories = await c.get_categories();
  const user = await User.findOne(
    {
        attributes: ["email", "id"],
        where: { token: session } 
    });

  // get categories

  // get studying

  // get studying and interval > 10
  const perf = await Promise.all(categories.map(async cat => { 
    const sc = await c.studying_count(user.email, cat);
    const nsc = await c.not_studying_count(user.email, cat);
    const m = await c.mastered_count(user.email, cat);
    const total = sc + nsc;
    return({
      category: cat,
      studying: sc,
      not_studying: nsc,
      mastered: m,
      total_cards: total
    })
  }))
  return new Response(JSON.stringify(perf));
}


// study card
export async function POST({ request, params }) {
  const session = cookie.parse(request.headers.get("cookie")).session;
  const card_id = params.slug;
  const card = await(c.get_card(card_id))
  const data = await request.json();

  const user = await User.findOne(
    {
        attributes: ["email"],
        where: { token: session } 
    });
  
  const scores = await c.study(user.email, card_id, data.score);
  const nc = await c.next_card(user.email, card.category)
  return new Response(JSON.stringify({score: scores, next_card: nc}));
}
