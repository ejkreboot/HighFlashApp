import { U as User } from "../../../../../../chunks/user.js";
import cookie from "cookie";
import { Cards } from "high-flash";
async function GET({ request, params }) {
  const c = new Cards(true);
  const session = cookie.parse(request.headers.get("cookie")).session;
  const card_id = params.slug;
  const user = await User.findOne(
    {
      attributes: ["email"],
      where: { token: session }
    }
  );
  const scores = await c.get_score(user.email, card_id);
  await c.close_db();
  return new Response(JSON.stringify(scores));
}
export {
  GET
};
