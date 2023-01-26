import { c as create_ssr_component, e as escape, b as subscribe, v as validate_component } from "../../../../../chunks/index2.js";
import { p as page } from "../../../../../chunks/stores.js";
import { marked } from "marked";
import { B as Breadcrumb } from "../../../../../chunks/Breadcrumb.js";
const Circle_svelte_svelte_type_style_lang = "";
const Circle2_svelte_svelte_type_style_lang = "";
const Circle3_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".wrapper.svelte-7wj78d{width:var(--size);height:var(--size);display:flex;justify-content:center;align-items:center;line-height:0;box-sizing:border-box}.inner.svelte-7wj78d{transform:scale(calc(var(--floatSize) / 52))}.ball-container.svelte-7wj78d{animation:svelte-7wj78d-ballTwo var(--duration) infinite;width:44px;height:44px;flex-shrink:0;position:relative}.single-ball.svelte-7wj78d{width:44px;height:44px;position:absolute}.ball.svelte-7wj78d{width:20px;height:20px;border-radius:50%;position:absolute;animation:svelte-7wj78d-ballOne var(--duration) infinite ease}.pause-animation.svelte-7wj78d{animation-play-state:paused}.ball-top-left.svelte-7wj78d{background-color:var(--ballTopLeftColor);top:0;left:0}.ball-top-right.svelte-7wj78d{background-color:var(--ballTopRightColor);top:0;left:24px}.ball-bottom-left.svelte-7wj78d{background-color:var(--ballBottomLeftColor);top:24px;left:0}.ball-bottom-right.svelte-7wj78d{background-color:var(--ballBottomRightColor);top:24px;left:24px}@keyframes svelte-7wj78d-ballOne{0%{position:absolute}50%{top:12px;left:12px;position:absolute;opacity:0.5}100%{position:absolute}}@keyframes svelte-7wj78d-ballTwo{0%{transform:rotate(0deg) scale(1)}50%{transform:rotate(360deg) scale(1.3)}100%{transform:rotate(720deg) scale(1)}}",
  map: null
};
const Circle3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = "60" } = $$props;
  let { unit = "px" } = $$props;
  let { pause = false } = $$props;
  let { ballTopLeft = "#FF3E00" } = $$props;
  let { ballTopRight = "#F8B334" } = $$props;
  let { ballBottomLeft = "#40B3FF" } = $$props;
  let { ballBottomRight = "#676778" } = $$props;
  let { duration = "1.5s" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.unit === void 0 && $$bindings.unit && unit !== void 0)
    $$bindings.unit(unit);
  if ($$props.pause === void 0 && $$bindings.pause && pause !== void 0)
    $$bindings.pause(pause);
  if ($$props.ballTopLeft === void 0 && $$bindings.ballTopLeft && ballTopLeft !== void 0)
    $$bindings.ballTopLeft(ballTopLeft);
  if ($$props.ballTopRight === void 0 && $$bindings.ballTopRight && ballTopRight !== void 0)
    $$bindings.ballTopRight(ballTopRight);
  if ($$props.ballBottomLeft === void 0 && $$bindings.ballBottomLeft && ballBottomLeft !== void 0)
    $$bindings.ballBottomLeft(ballBottomLeft);
  if ($$props.ballBottomRight === void 0 && $$bindings.ballBottomRight && ballBottomRight !== void 0)
    $$bindings.ballBottomRight(ballBottomRight);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  $$result.css.add(css$1);
  return `<div class="${"wrapper svelte-7wj78d"}" style="${"--size: " + escape(size, true) + escape(unit, true) + "; --floatSize: " + escape(size, true) + "; --ballTopLeftColor: " + escape(ballTopLeft, true) + "; --ballTopRightColor: " + escape(ballTopRight, true) + "; --ballBottomLeftColor: " + escape(ballBottomLeft, true) + "; --ballBottomRightColor: " + escape(ballBottomRight, true) + "; --duration: " + escape(duration, true) + ";"}"><div class="${"inner svelte-7wj78d"}"><div class="${["ball-container svelte-7wj78d", pause ? "pause-animation" : ""].join(" ").trim()}"><div class="${"single-ball svelte-7wj78d"}"><div class="${["ball ball-top-left svelte-7wj78d", pause ? "pause-animation" : ""].join(" ").trim()}"> </div></div>
			<div class="${"contener_mixte"}"><div class="${["ball ball-top-right svelte-7wj78d", pause ? "pause-animation" : ""].join(" ").trim()}"> </div></div>
			<div class="${"contener_mixte"}"><div class="${["ball ball-bottom-left svelte-7wj78d", pause ? "pause-animation" : ""].join(" ").trim()}"> </div></div>
			<div class="${"contener_mixte"}"><div class="${["ball ball-bottom-right svelte-7wj78d", pause ? "pause-animation" : ""].join(" ").trim()}"> </div></div></div></div>
</div>`;
});
const DoubleBounce_svelte_svelte_type_style_lang = "";
const GoogleSpin_svelte_svelte_type_style_lang = "";
const ScaleOut_svelte_svelte_type_style_lang = "";
const SpinLine_svelte_svelte_type_style_lang = "";
const Stretch_svelte_svelte_type_style_lang = "";
const BarLoader_svelte_svelte_type_style_lang = "";
const Jumper_svelte_svelte_type_style_lang = "";
const RingLoader_svelte_svelte_type_style_lang = "";
const SyncLoader_svelte_svelte_type_style_lang = "";
const Rainbow_svelte_svelte_type_style_lang = "";
const Firework_svelte_svelte_type_style_lang = "";
const Pulse_svelte_svelte_type_style_lang = "";
const Jellyfish_svelte_svelte_type_style_lang = "";
const Chasing_svelte_svelte_type_style_lang = "";
const Square_svelte_svelte_type_style_lang = "";
const Shadow_svelte_svelte_type_style_lang = "";
const Moon_svelte_svelte_type_style_lang = "";
const Plane_svelte_svelte_type_style_lang = "";
const Diamonds_svelte_svelte_type_style_lang = "";
const Clock_svelte_svelte_type_style_lang = "";
const Wave_svelte_svelte_type_style_lang = "";
const Puff_svelte_svelte_type_style_lang = "";
const ArrowDown_svelte_svelte_type_style_lang = "";
const ArrowUp_svelte_svelte_type_style_lang = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.sveltefix.svelte-vp94pd.svelte-vp94pd{display:none}.fc-container.svelte-vp94pd.svelte-vp94pd{position:relative;margin:auto;height:500px;width:700px;margin-top:50px;perspective:1000px;box-shadow:5 0px 10px rgba(0, 0, 0, 0.5)}.container.svelte-vp94pd .svelte-vp94pd{transition:transform 500ms cubic-bezier(0.28, 0.935, 0.82, 0.95)}.shadow.svelte-vp94pd.svelte-vp94pd{transition:transform 750ms cubic-bezier(0.28, 0.935, 0.82, 0.95)}.card.svelte-vp94pd.svelte-vp94pd{position:absolute;top:0px;left:0px;height:100%;width:100%;perspective:500px;transform:rotateY(2deg) rotateZ(0.5deg) rotateX(2deg);transition:transform 500ms cubic-bezier(0.28, 0.935, 0.82, 0.95);transform-style:preserve-3d}.card-front.svelte-vp94pd.svelte-vp94pd,.card-back.svelte-vp94pd.svelte-vp94pd{position:absolute;width:100%;height:100%;backface-visibility:hidden;padding:20px}.card-content.svelte-vp94pd.svelte-vp94pd{overflow-y:auto;height:100%}.card-front.svelte-vp94pd.svelte-vp94pd{background-color:rgb(249, 249, 249)}.card-back.svelte-vp94pd.svelte-vp94pd{background-color:rgb(243, 243, 243);transform:rotateX(180deg)}.card-flipped.svelte-vp94pd.svelte-vp94pd{transform:rotateY(-1deg) rotatez(-0.5deg) rotateX(181deg);box-shadow:2px -2px 6px 1px rgba(0, 0, 0, 0.4) !important}.drop-shadow.svelte-vp94pd.svelte-vp94pd{box-shadow:2px 2px 6px 1px rgba(0, 0, 0, 0.4)}.shadow.svelte-vp94pd.svelte-vp94pd{z-index:-1;position:absolute;top:0px;left:0px;padding:0px;margin:0px;background-color:rgba(0, 0, 0, 0.2);content:"";width:50%;height:25%;border-radius:20%;transform:rotate(0deg);transform:translate(50%, 50%) rotate(5deg)}.right-shadow.svelte-vp94pd.svelte-vp94pd{box-shadow:10px 4px 10px 0px rgba(0, 0, 0, 0.2);transform:translate(98%, 298%) rotate(5deg)}.left-shadow.svelte-vp94pd.svelte-vp94pd{box-shadow:-10px -7px 10px 0px rgba(0, 0, 0, 0.2);transform:translate(2%, 5%) rotate(3deg)}.middle-shadow.svelte-vp94pd.svelte-vp94pd{content:"";position:absolute;width:70%;z-index:-1;background-color:rgba(0, 0, 0, 0.2);border-radius:40%;box-shadow:0px 0px 10px 10px rgba(0, 0, 0, 0.2);transform:translate(20%, 0%) rotate(0deg)}.middle-shadow-off.svelte-vp94pd.svelte-vp94pd{transform:translate(50%, 100%) rotate(0deg)}.button-container.svelte-vp94pd.svelte-vp94pd{display:flex;margin:auto;width:400px;margin-top:30px}.button-container.svelte-vp94pd button.svelte-vp94pd{margin-right:10px;padding:5px;border-width:0px}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let front;
  let back;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let card = {
    front: "",
    back: "",
    n: 0,
    interval: 0,
    efactor: 1.3
  };
  card.score = {};
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  front = card.front;
  back = card.back;
  $$unsubscribe_page();
  return `${data.mode != "embed" ? `${validate_component(Breadcrumb, "Breadcrumb").$$render($$result, {}, {}, {
    default: () => {
      return `<div>Neurology</div>
    <div>Flash Cards</div>
    <div>Learning Home</div>`;
    }
  })}` : ``}

<main class="${"container svelte-vp94pd"}"><header class="${"container svelte-vp94pd"}"><hgroup class="${"svelte-vp94pd"}"><h1 class="${"svelte-vp94pd"}">${escape($page.params.slug)}</h1>
      <h2 class="${"svelte-vp94pd"}">click the card to flip, click the buttons to indicate how well you know the material.</h2></hgroup></header>
<div id="${"container"}" class="${"fc-container svelte-vp94pd"}">${front == "" ? `<center class="${"svelte-vp94pd"}"><div style="${"margin-top: 200px; padding-left: 50%;"}" class="${"svelte-vp94pd"}">${validate_component(Circle3, "Circle3").$$render($$result, { duration: "3s" }, {}, {})}</div></center>` : `<div id="${"card"}" class="${"card drop-shadow svelte-vp94pd"}"><div id="${"front"}" class="${"card-front svelte-vp94pd"}"><div id="${"right-shadowbox"}" class="${"shadow right-shadow svelte-vp94pd"}"></div>
        <div id="${"left-shadowbox"}" class="${"shadow left-shadow svelte-vp94pd"}"></div>
        <div id="${"middle-shadowbox"}" class="${"shadow svelte-vp94pd"}"></div>
        <div class="${"card-content svelte-vp94pd"}"><h4 class="${"card-title svelte-vp94pd"}">question.</h4><br class="${"svelte-vp94pd"}">
          <!-- HTML_TAG_START -->${marked.parse(front)}<!-- HTML_TAG_END --></div></div>
      <div id="${"back"}" class="${"card-back svelte-vp94pd"}"><div class="${"card-content svelte-vp94pd"}"><h4 class="${"svelte-vp94pd"}">answer.</h4><br class="${"svelte-vp94pd"}">
          <!-- HTML_TAG_START -->${marked.parse(back)}<!-- HTML_TAG_END --></div></div></div>`}</div>
  ${front != "" ? `<div class="${"button-container svelte-vp94pd"}"><button class="${"red svelte-vp94pd"}">nope.</button>
    <button class="${"yellow svelte-vp94pd"}">sorta.</button>
    <button class="${"green svelte-vp94pd"}">got it.</button></div>` : ``}


<div class="${"card-title card-back button-container sveltefix card container-fluid card-content card-flipped middle-shadow middle-shadow-off red-text yellow-text green-text svelte-vp94pd"}"><ul class="${"svelte-vp94pd"}"><li class="${"svelte-vp94pd"}">.</li></ul>
    <ol class="${"svelte-vp94pd"}"><li class="${"svelte-vp94pd"}">.</li></ol>
    <p class="${"svelte-vp94pd"}">.</p></div>
</main>`;
});
export {
  Page as default
};
