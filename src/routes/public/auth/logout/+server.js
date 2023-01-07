export async function GET({ request, params }) {
    console.log("GET request at logout endpoint received.")
    return new Response(JSON.stringify({result: "OK"}));
}
