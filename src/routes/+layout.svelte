<script>
    export let data;
</script>

<svelte:head>
<title>High Flash</title>
</svelte:head>
<nav class="container-fluid">
    <ul>
        <li><img alt="Logo" src="/HFP_300_41.png"/></li>
    </ul>
    <ul>
        {#if !data.email}
            <li><a href="/public/auth/login">Login</a></li>
            <li><a href="/public/auth/register">Register</a></li>
        {/if}
        
        {#if data.email}
            {#if data.group == "admin"}
            <li><a href="/protected/admin/edit">Edit Cards</a></li>
            {/if}
            <li><a href="/protected/study">Flash Cards</a></li>
            <li>Handouts</li>
            <li>Podcasts</li>
            <li><a href="/protected/logout"
                 on:click={() => document.getElementById("logout").submit()}>Logout</a></li>
            <form id="logout" style="display: none" 
                      action="/protected/logout" 
                      method="POST">
                </form>
            
        {/if}
    </ul>
</nav>

<slot />

<center><small>Copyright 2022 Eric J. Kort. All rights reserved.</small></center>
