import { User } from '$lib/server/user.js';
import cookie from 'cookie';
import { Cards } from "high-flash";
const c = new Cards(true, 'data/cards.sqlite');

// study card
export async function GET({ request, params }) {
  const session = cookie.parse(request.headers.get("cookie")).session;
  const card_id = params.slug;

  const user = await User.findOne(
    {
        attributes: ["email"],
        where: { token: session } 
    });
  
  const scores = await c.get_score(user.email, card_id);
  return new Response(JSON.stringify(scores));
}