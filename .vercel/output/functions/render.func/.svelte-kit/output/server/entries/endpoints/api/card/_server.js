import { U as User } from "../../../../chunks/user.js";
import { Cards } from "high-flash";
import cookie from "cookie";
async function GET({ request, params, url }) {
  const c = new Cards();
  const session = cookie.parse(request.headers.get("cookie")).session;
  const category = url.searchParams.get("category");
  const user = await User.findOne(
    {
      attributes: ["email"],
      where: { token: session }
    }
  );
  const card = await c.next_card(user.email, category);
  await c.close_db();
  return new Response(JSON.stringify(card));
}
async function POST({ request, params, url }) {
  const c = new Cards();
  let card = await request.json();
  card = await c.add_card(card.front, card.back, card.category);
  await c.close_db();
  const options = {
    status: 201,
    headers: {
      "Content-type": "application/json",
      "Content-Language": "en"
    }
  };
  const body = card;
  const res = new Response(JSON.stringify(body), options);
  return res;
}
export {
  GET,
  POST
};
