<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { marked } from "marked";
  import Breadcrumb from '$lib/Breadcrumb.svelte';
  let card = {front: "", back: "", n: 0, interval: 0, efactor: 1.3}
  card.score = {};

  $: front = card.front;
  $: back = card.back;
  $: score = card.score;

  async function get_card() {
      const url = '/api/card/?category=' + $page.params.slug;
      const response = await fetch(url, {
              method: 'GET',
          })
      const card = await response.json();
      set_color(card.score);
      return card;
  }

  async function study_card(score) {
    const url = "/api/card/" + card.uuid + "/study";
    const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({"score" : score})
        })
    const res = await response.json();
    card = res.next_card;
    reset_card();
    set_color(card.score);
    return;
  }

  function set_color(score) {
    document.getElementsByClassName("card-title")[0].classList.remove("red-text");
    document.getElementsByClassName("card-title")[0].classList.remove("yellow-text");
    document.getElementsByClassName("card-title")[0].classList.remove("green-text");
    document.getElementsByClassName("card-title")[0].classList.remove("gray-text");
    if(score.interval == 0) {
      document.getElementsByClassName("card-title")[0].classList.add("gray-text");
    } else if(score.interval < 2) {
      document.getElementsByClassName("card-title")[0].classList.add("red-text");
    } else if(score.interval < 10) {
      document.getElementsByClassName("card-title")[0].classList.add("yellow-text");
    } else {
      document.getElementsByClassName("card-title")[0].classList.add("green-text");
    }
  }

  async function get_card_score(uuid) {
    const url = "/api/card/" + uuid + "/score";
    const response = await fetch(url, {
            method: 'GET'
        })
    const res = await response.json();
    return(res);
  }

  function reset_card() {
    document.getElementById("card").classList.remove("card-flipped");
    document.getElementById("left-shadowbox").classList.add("left-shadow");
    document.getElementById("right-shadowbox").classList.add("right-shadow");
    document.getElementById("middle-shadowbox").classList.remove("middle-shadow");
  }


  onMount(() => {
      get_card().then(e => { card = e; return e });
      document.getElementById("container").onclick = function () {
        document.getElementById("card").classList.toggle("card-flipped");
        document.getElementById("left-shadowbox").classList.toggle("left-shadow");
        document.getElementById("right-shadowbox").classList.toggle("right-shadow");
        document.getElementById("middle-shadowbox").classList.toggle("middle-shadow");
      };
  })

</script>
<Breadcrumb>
  <div>Neurology</div>
  <div>Flash Cards</div>
  <div>Learning Home</div>
</Breadcrumb>

<main class="container">

<header class="container">
    <hgroup>
      <h1>{$page.params.slug}</h1>
      <h2>click the card to flip, click the buttons to indicate how well you know the material.</h2>
    </hgroup>
</header>
<div id="container" class="fc-container">
  <div id="card" class="card drop-shadow">
    <div id="front" class="card-front">
      <div id="right-shadowbox" class="shadow right-shadow"> </div>
      <div id="left-shadowbox" class="shadow left-shadow"> </div>
      <div id="middle-shadowbox" class="shadow"> </div>
      <div id="score" class="card-score">{ JSON.stringify(score) }</div>
      <div class="card-content">
        <h4 class="card-title">question.</h4><br>
        {@html marked.parse(front)}
      </div>
    </div>
    <div id="back" class="card-back">
      <div class="card-content">
        <h4>answer.</h4><br>
        {@html marked.parse(back)}
      </div>
    </div>
  </div>
</div>
<div class="button-container">
  <button class="red" on:click={function(){study_card(1)}}>nope.</button>
  <button class="yellow" on:click={function(){study_card(3)}}>sorta.</button>
  <button class="green" on:click={function(){study_card(5)}}>got it.</button>
</div>
<div class = "sveltefix container-fluid card-flipped middle-shadow middle-shadow off red-text yellow-text green-text">
    
</div>
</main>

<style>


/* if programmtically swapped classes are not present initially, they 
   will be excluded from build. Need a place to put them to start. */
.sveltefix {
  display: none;
}

.fc-container {
  position: relative;
  margin: auto;
  height: 500px;
  width: 700px;
  margin-top: 50px;
  perspective: 1000px;
  box-shadow: 5 0px 10px rgba(0, 0, 0, 0.5);
}

.card-score {
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 12px;
}

.container * {
  transition: transform 500ms cubic-bezier(0.28, 0.935, 0.82, 0.95);
}

.shadow {
  transition: transform 750ms cubic-bezier(0.28, 0.935, 0.82, 0.95);
}

.card {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  perspective: 500px;
  transform: rotateY(2deg) rotateZ(0.5deg) rotateX(2deg);
  transition: transform 500ms cubic-bezier(0.28, 0.935, 0.82, 0.95);
  transform-style: preserve-3d;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  padding: 20px;
}

.card-content {
  overflow-y: auto;
  height: 100%;
}

.card-front {
  background-color: white;
}


.card-back {
  background-color: rgb(243, 243, 243);
  transform: rotateX(180deg);
}

.card-flipped {
  transform: rotateY(-1deg) rotatez(-0.5deg) rotateX(181deg);
  box-shadow: 2px -2px 6px 1px rgba(0, 0, 0, 0.4) !important;

}

.drop-shadow {
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.4);
}

.shadow {
  z-index: -1;
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 0px;
  margin: 0px;
  background-color: rgba(0, 0, 0, 0.2);
  content: "";
  width: 50%;
  height: 25%;
  border-radius: 20%;
  transform: rotate(0deg);
  transform: translate(50%, 50%) rotate(5deg);
}

.right-shadow {
  box-shadow: 10px 4px 10px 0px rgba(0, 0, 0, 0.2);
  transform: translate(98%, 298%) rotate(5deg);
}

.left-shadow {
  box-shadow: -10px -7px 10px 0px rgba(0, 0, 0, 0.2);
  transform: translate(2%, 5%) rotate(3deg);
}

.middle-shadow {
  content: "";
  position: absolute;
  width: 70%;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 40%;
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
  transform: translate(20%, 0%) rotate(0deg);
}

.middle-shadow-off {
  transform: translate(50%, 100%) rotate(0deg);
}

.button-container {
  display: flex;
  margin: auto;
  width: 400px;
  margin-top: 30px;
}

.button-container button {
   margin-right: 10px;
   padding: 5px;
   border-width: 0px;
}


</style>
