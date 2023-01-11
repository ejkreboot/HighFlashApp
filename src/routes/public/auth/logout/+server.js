import { User } from '$lib/server/user.js';

export async function GET({ request, params, url }) {
    console.log("GET request at logout endpoint received with params:");
    console.log(params)
    const email = url.searchParams.get('user_email');
    const headers = new Headers();
    headers.append( "Access-Control-Allow-Origin", "https://highflowpeds.com");
    const options = {
        headers: headers
    }
    await User.update(
        { token: '' },
        { where: { email: email } }
    )
    const response = new Response(JSON.stringify({result: "OK"}), options);
    console.log("RESPONSE (server.js line 17):" + JSON.stringify(response))
    return(response);
}
