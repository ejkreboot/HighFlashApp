<script>
    export let data;
</script>

<svelte:head>
<title>High Flash</title>
</svelte:head>
<nav id="navbar" class="container-fluid">
    <ul>
        <li><img alt="Logo" src="/HFP_white_300_50.png" width="190"/></li>
    </ul>
    <ul>
        {#if !data.email}
                <li><a href="https://highflowpeds.com">LOGIN</a></li>
                <li><a href="https://highflowpeds.com">SIGN UP!</a></li>
        {/if}
        {#if data.email}
            {#if data.group == "admin"}
                <li><a href="/protected/admin/edit">EDIT</a></li>
            {/if}
                <li><a href="https://highflowpeds.com/topics">HOME</a></li>
                <li><a href="/protected/logout"
                    on:click={() => document.getElementById("logout").submit()}>LOGOUT</a></li>
                <form id="logout" style="display: none" 
                        action="/protected/logout" 
                        method="POST">
                </form>
        {/if}
    </ul>
</nav>
<slot />

<!--
<center><small>Copyright 2022 Eric J. Kort. All rights reserved.</small></center>
-->
