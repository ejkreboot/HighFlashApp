import { U as User } from "../../../../../chunks/user.js";
import cookie from "cookie";
import { Cards } from "high-flash";
async function GET({ request, params }) {
  const c2 = new Cards();
  const session = cookie.parse(request.headers.get("cookie")).session;
  const categories = await c2.get_categories();
  const user = await User.findOne(
    {
      attributes: ["email", "id"],
      where: { token: session }
    }
  );
  const perf = await Promise.all(categories.map(async (cat) => {
    await c2.start_studying(user.email, cat);
    const sc = await c2.studying_count(user.email, cat);
    const nsc = await c2.not_studying_count(user.email, cat);
    const m = await c2.mastered_count(user.email, cat);
    const total = sc + nsc;
    return {
      category: cat,
      studying: sc,
      not_studying: nsc,
      mastered: m,
      total_cards: total
    };
  }));
  await c2.close_db();
  return new Response(JSON.stringify(perf));
}
async function POST({ request, params }) {
  const session = cookie.parse(request.headers.get("cookie")).session;
  const card_id = params.slug;
  const card = await c.get_card(card_id);
  const data = await request.json();
  const user = await User.findOne(
    {
      attributes: ["email"],
      where: { token: session }
    }
  );
  const scores = await c.study(user.email, card_id, data.score);
  const nc = await c.next_card(user.email, card.category);
  return new Response(JSON.stringify({ score: scores, next_card: nc }));
}
export {
  GET,
  POST
};
