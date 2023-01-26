import { U as User } from "../../../../../../chunks/user.js";
import cookie from "cookie";
import { Cards } from "high-flash";
async function POST({ request, params }) {
  const c = new Cards(true);
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
  console.log("Scording card: ", JSON.stringify(card));
  console.log("For user: ", JSON.stringify(user));
  const scores = await c.study(user.email, card_id, data.score);
  const nc = await c.next_card(user.email, card.category, card_id);
  await c.close_db();
  return new Response(JSON.stringify({ score: scores, next_card: nc }));
}
export {
  POST
};
