import { User } from '$lib/server/user.js';

export async function GET({ request, params, url }) {
    console.log("GET request at logout endpoint received with params:");
    console.log(params)
    const email = url.searchParams.get('user_email');
    const options = {
        headers: {
            "Access-Control-Allow-Origin": "https://highflowpeds.com"
        }
    }
    await User.update(
        { token: '' },
        { where: { email: email } }
    )
    return new Response(JSON.stringify({result: "OK"}), options);
}
