export async function GET({ request, params }) {
    console.log("GET request at logout endpoint received.")
    const options = {
        headers: {
            "Access-Control-Allow-Origin": "https://highflowpeds.com"
        }
    }
    return new Response(JSON.stringify({result: "OK"}), options);
}
