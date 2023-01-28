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
  const options = {
    status: 201,
    stausText: "Card updated."
  }  
  return new Response({result: "sucess"}, options);
}

export async function DELETE({ params }) {
  const c = new Cards(true);
  const count = await(c.delete_card(params.slug));

  let options, body;
  if(count) {
    options = {
      status: 201,
      stausText: ""
    }  
    body = ""
  } else {
    options = {
      status: 404,
      stausText: "Card not found"
    }  
    body = ""
  }
  await c.close_db()
  return new Response(body, options);
}