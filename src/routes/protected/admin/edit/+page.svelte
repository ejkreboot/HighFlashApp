<script>
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';
    import Edittable from '$lib/Edittable.svelte';
    import Svelecte from 'svelecte';

    let files, filenames = [];
    export let message = "or drag and drop files here."
    export let allowed = [".png", ".jpg", ".jpeg", ".tif", ".tiff", ".csv", ".JPG", ".JPEG", ".PNG", ".TIF", ".TIFF", ".CSV"];

    export let form;
    export let data; 

    let cards = [];
    $: cardlist = cards;

    let categories = data.categories;
    let selected = null;

    function newCategory(c) {
        categories.push(c.detail.value);
    }

    async function fetch_cards () {
        let cat = selected || categories[0];
        const url = '/api/category/' + cat;
        const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        cards = await response.json();
        return;
    }

    async function add_card (event) {
        const url = '/api/card';
        let card = {
            front: "question",
            back: "answer",
            category: selected
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(card)
        });
        card = await response.json(); // add uuid
        cards = [...cards, card];
    }

    async function update_card (event) {
        const category = selected;
        const url = '/api/card/' + event.detail.uuid;
        debugger;
        const response = await fetch(url, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    front: event.detail.front,
                    back: event.detail.back,
                    category: category
                })
        })
        //let res = await response.json();        
        //console.log(res)
    }

    async function remove_card (event) {
        // const category = document.getElementById("category").value;
        const url = '/api/card/' + event.detail.uuid;
        const response = await fetch(url, { 
                method: 'DELETE',
        })
        cards = cards.filter((i) => (i.uuid != event.detail.uuid));
    }

    function show_progress() {
        const progress = document.getElementById("upload_progress");
        const upload_message = document.getElementById("upload_message");
        upload_message.style.display="none";
        progress.style.display="block";
    }

    function hide_progress() {
        const progress = document.getElementById("upload_progress");
        const upload_message = document.getElementById("upload_message");
        upload_message.style.display="block";
        progress.style.display="none";
    }

    function update_message() {
        message = "UPLOADING..."
    }

    function highlight(e) {
        e.target.parentElement.parentElement.style.backgroundColor = "#f3f3f3";
    }

    function un_highlight(e) {
        e.target.parentElement.parentElement.style.backgroundColor = "white";
    }
    
    function get_ext(f) {
        const ext = f.replace(/(.*)(\.\w{2,4})/, "$2")
        return(ext)
    }

    function filter_files(filelist) {
        return(filelist.filter(f => { return(allowed.indexOf(get_ext(f)) > -1 )}));
    }

    function unfilter_files(filelist) {
        return(filelist.filter(f => { return(!(allowed.indexOf(get_ext(f)) > -1 ))}));
    }

    onMount(() => {        
        fetch_cards();
        selected = categories[0];
        document.getElementById('upload_file').onchange = function () {
            filenames = [];
            for(const file of files) {
                filenames.push(file.name)
            }
            const ignored = unfilter_files(filenames);
            const allowed = filter_files(filenames);
            if(allowed.length > 1) {
                message = allowed.length + " files selected."
            } else {
                message = allowed.length ? allowed[0] : "";
            }
            if(ignored.length > 0) {
                message = message + "(" + ignored.length + " files ignored--only .png, .jpg, .csv, and .tif are supported.)"
            }
            document.getElementById('upload_file_name').value = filenames;
        };
    });

</script>
  
<main class="container">
    <h1>Edit cards</h1>
    <div class = "grid">
        <div>
        <h4 id="category-label">category.</h4>
            <Svelecte id="category" 
                            options={categories.map(e => ({label: e, value:e, $created: true}))} 
                            creatable = true
                            on:createoption={newCategory}
                            bind:value={selected}
                            on:change="{fetch_cards}">
            </Svelecte>
        </div>
        <div style="margin-top:10px;">

            <div class="input-container" on:dragenter={highlight} on:dragexit={un_highlight}
                                        on:drop={un_highlight} 
                                        >
            <form on:submit="{update_message}" 
                method="POST"  
                id="upload-form"
                use:enhance={({ form, data, cancel }) => {
                    show_progress();
                    return async ({ result }) => {
                      hide_progress();
                      message = "Done";
                    };}}
                enctype="multipart/form-data"
                >

                <input id="upload_file_name" type="hidden" name="upload_file_name">
                <input multiple=true 
                    id="upload_file" 
                    bind:files 
                    class = "file" 
                    accept="image/*"
                    type="file" 
                    name="upload_file">
                <button id="upload">Upload</button>
                
            </form>
            <!-- credit to prasanjit https://codepen.io/prasanjit/pen/NxjZMO-->
            <div class="file-drop-area">
                <span class="fake-btn">Choose files</span>
                <span class="file-msg">{ message }</span>
            </div>
        </div>
        <progress id="upload_progress" style="display: none;"></progress>
        <div id="upload_message" class="message">{form?.message ?? 'insert uploaded images as: ![](/images/____), where _____ is the name of your file.'}</div>
     </div>
    </div>

    {#each cardlist as card}
    <Edittable on:remove={ remove_card } on:update={ update_card } uuid={card.uuid} front={card.front} back={card.back}/>
    {/each}
    <button class="add_button" on:click={ add_card }>New Card</button>

</main>
<style>
    #category-label {
        margin-bottom: 15px;
    }

    #upload-form {
        margin: 12px;
    }

    .input-container {
        position: relative;
        margin-top: 28px;
        height: 61px;
        width: 100%;
        border: 1px solid #a2afb9;
        border-radius: 4px;
        transition: 0.2s;
    }

    .fake-btn {
        flex-shrink: 0;
        background-color: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--blue);
        border-radius: 5px;
        margin: -30px 0px 0px 20px;
        font-size: 12px;
        padding: 10px;
        text-transform: uppercase;
    }

    .file-msg {
        font-size: 12px;
    }

    #upload {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100px;
        height: 35px;
        padding: 0px;
        margin: 0px 10px 12px 0px;
        text-transform: uppercase;
        font-size: 12px;
    }

    #upload_file {
        position: absolute;
        top: 0;
        left: 0;
        height: 100px;
        width: 100%;
        opacity: 0;
    }

    .message {
        margin-top: 5px;
        font-size: 10px;
        color: var(--orange);
        width: 800px;
    }

</style>