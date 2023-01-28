import { User } from '$lib/server/user.js';

export async function GET({ request, params, url }) {
    console.log("GET request at logout endpoint received with params:");
    const email = url.searchParams.get('user_email');

    const headers = new Headers();
    headers.append( "Access-Control-Allow-Origin", "https://www.highflowpeds.com");
    headers.append("Access-Control-Allow-Methods", "OPTIONS, POST, GET")

    const options = {
        headers: headers
    }
    
    await User.update(
        { token: '' },
        { where: { email: email } }
    )
    const response = new Response(JSON.stringify({result: "OK"}), options);
    return(response);
}
