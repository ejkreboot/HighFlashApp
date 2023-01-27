<script>
    export let data;
</script>

<svelte:head>
<title>High Flash</title>
</svelte:head>
<nav id="navbar_container" class="container-fluid">
    <nav id="navbar" class="container-fluid">
        <ul>
        <li><img alt="Logo" src="/HFP_white_300_50.png" width="180"/></li>
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
                <li><a href="https://highflowpeds.com/topics">TOPICS</a></li>
        {/if}
    </ul>
    </nav>
</nav>
<div id="main_container" class="container-fluid">
    <slot />
</div>

<!--
<center><small>Copyright 2022 Eric J. Kort. All rights reserved.</small></center>
-->
