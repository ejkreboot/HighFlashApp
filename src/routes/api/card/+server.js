import { User } from '$lib/server/user.js';
import { Cards } from "high-flash";
import cookie from 'cookie';


// get next card for studying
export async function GET({ request, params, url }) {
  const c = new Cards();
  const session = cookie.parse(request.headers.get("cookie")).session;
  const category = url.searchParams.get('category');
  const user = await User.findOne(
    {
        attributes: ["email"],
        where: { token: session } 
    });

  const card = await c.next_card(user.email, category);
  await c.close_db()
  return new Response(JSON.stringify(card));
}
