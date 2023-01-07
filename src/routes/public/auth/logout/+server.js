export async function POST({ request, params }) {
    console.log("POST request at logout endpoint received.")
    return new Response(JSON.stringify({result: "OK"}));
}
