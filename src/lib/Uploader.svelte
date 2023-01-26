<script>
    import { onMount } from 'svelte';
	let files, filenames = [];
    export let form;
    export let message = "or drag and drop files here."
    export let allowed = [".png", ".jpg", ".jpeg", ".tif", ".tiff", ".csv", ".JPG", ".JPEG", ".PNG", ".TIF", ".TIFF", ".CSV"];

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

    onMount(  () => {
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
                message = message + "(" + ignored.length + " files ignored--only .png, .jpg, .tif, and .csv are supported.)"
            }
            document.getElementById('upload_file_name').value = filenames;
        };
    });

</script>

<div class="input-container" on:dragenter={highlight} 
                             on:dragleave={un_highlight}
                             on:drop={un_highlight}>
    <form method="POST"  id="upload-form"
          enctype="multipart/form-data">

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
<div class="message">{form?.message ?? 'insert uploaded images as: ![](/images/your_file.png (substituting actual file name).'}</div>

<style>

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
