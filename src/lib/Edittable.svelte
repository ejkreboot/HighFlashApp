<script>
    import { createEventDispatcher } from "svelte";
    import { marked } from "marked";

    export let front;
    export let back;
    export let uuid;

    function format(t) {
        console.log("Formatting: ", t);
        return(marked.parse(t));
    }
    const NS = function (id) {
        return uuid + "_" + id;
    };

    const dispatch = createEventDispatcher();

    function update() {
        console.log("Updating card with UUID " + uuid)
        dispatch("update", {
            uuid: uuid,
            front: front,
            back: back,
        });
    }

    function remove() {
        console.log("Removing card with UUID " + uuid)
        dispatch("remove", {
            uuid: uuid
        });
    }

    function enable_edit(e) {
        const id = e.target.parentNode.id.replace("_display", "");
        const edit_id = id + "_edit";
        const display_id = id + "_display";
        const textarea = document.getElementById(edit_id);
        const d = document.getElementById(display_id);
        textarea.style.display = "block";
        d.style.display = "none";
    }

    function disable_edit(e) {
        const id = e.target.parentNode.id.replace("_display", "");
        let id_front, id_back, edit_id_front, edit_id_back;

        if (id.match("front")) {
            id_front = id;
            id_back = id.replace("front", "back");
            edit_id_front = id_front + "_edit";
            edit_id_back = id_back + "_edit";
        } else {
            id_back = id;
            id_front = id.replace("back", "front");
            edit_id_front = id_front + "_edit";
            edit_id_back = id_back + "_edit";
        }
        const textarea_front = document.getElementById(edit_id_front);
        const textarea_back = document.getElementById(edit_id_back);
        const div_back = document.getElementById(id_back + "_display");
        const div_front = document.getElementById(id_front + "_display");
        if (textarea_front && textarea_front.style.display === "block") {
            front = textarea_front.value;
            textarea_front.style.display = "none";
            div_front.style.display = "block";
            update();
        }
        if (textarea_back && textarea_back.style.display === "block") {
            back = textarea_back.value;
            textarea_back.style.display = "none";
            div_back.style.display = "block";
            update();
        }
    }

    function classify(s) {
        return s.replace("<p>", "<p class='rendered-markdown'>");
    }
</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<article>
    <div class="hidden">{uuid}</div>

    <div class="fc-container">
        <div>
            <h4>front.</h4>
            <div id={NS("front")}>
                <textarea
                    class="fc-edit"
                    style="display: none;"
                    id={NS("front_edit")}>{front}</textarea
                >
                <div
                    class="rendered-markdown"
                    id={NS("front_display")}
                    on:keydown={null}
                    on:click={disable_edit}
                    on:dblclick={enable_edit}
                >
                    {@html format(front)}
                </div>
            </div>
        </div>
        <div>
            <h4>back.</h4>
            <div id={NS("back")}>
                <textarea
                    class="fc-edit"
                    style="display: none;"
                    id={NS("back_edit")}>{back}</textarea
                >
                <div
                    class="rendered-markdown"
                    id={NS("back_display")}
                    on:keydown={null}
                    on:click={disable_edit}
                    on:dblclick={enable_edit}
                >
                    {@html format(back)}
                </div>
            </div>
        </div>
        <i style="cursor: pointer;" class="fa fa-trash" on:keydown={ remove } on:click={ remove }></i>
    </div>
    <div style="clear: both;" />
</article>

<style>
    .hidden {
        display: none;
    }
    article {
  margin: 20px;
  padding: 20px;
  
}

.rendered-markdown {
  padding: 15px;
  border-radius: 7px;
  border-width: 1px;
  border-color: var(--gray);
  border-style: solid;
  margin: 10px;
  overflow-y: scroll;
  height: 200px;
}

h4 {
  margin: 0px;
  padding: 0px 0px 0px 10px;
  
}
</style>
