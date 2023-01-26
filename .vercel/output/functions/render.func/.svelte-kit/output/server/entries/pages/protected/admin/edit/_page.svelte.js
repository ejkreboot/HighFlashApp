import { c as create_ssr_component, d as createEventDispatcher, e as escape, f as add_attribute, v as validate_component, h as each } from "../../../../../chunks/index2.js";
import "devalue";
import { B as Breadcrumb } from "../../../../../chunks/Breadcrumb.js";
import { marked } from "marked";
const Edittable_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".hidden.svelte-1g1t992{display:none}article.svelte-1g1t992{margin:20px;padding:20px}.rendered-markdown.svelte-1g1t992{padding:15px;border-radius:7px;border-width:1px;border-color:var(--gray);border-style:solid;margin:10px;overflow-y:scroll;height:200px}h4.svelte-1g1t992{margin:0px;padding:0px 0px 0px 10px}",
  map: null
};
const Edittable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { front } = $$props;
  let { back } = $$props;
  let { uuid } = $$props;
  const NS = function(id) {
    return uuid + "_" + id;
  };
  createEventDispatcher();
  if ($$props.front === void 0 && $$bindings.front && front !== void 0)
    $$bindings.front(front);
  if ($$props.back === void 0 && $$bindings.back && back !== void 0)
    $$bindings.back(back);
  if ($$props.uuid === void 0 && $$bindings.uuid && uuid !== void 0)
    $$bindings.uuid(uuid);
  $$result.css.add(css$1);
  return `<link rel="${"stylesheet"}" href="${"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}">

<article class="${"svelte-1g1t992"}"><div class="${"hidden svelte-1g1t992"}">${escape(uuid)}</div>

    <div class="${"fc-container"}"><div><h4 class="${"svelte-1g1t992"}">front.</h4>
            <div${add_attribute("id", NS("front"), 0)}><textarea class="${"fc-edit"}" style="${"display: none;"}"${add_attribute("id", NS("front_edit"), 0)}>${escape(front, true)}</textarea>
                <div class="${"rendered-markdown svelte-1g1t992"}"${add_attribute("id", NS("front_display"), 0)}><!-- HTML_TAG_START -->${marked.parse(front)}<!-- HTML_TAG_END --></div></div></div>
        <div><h4 class="${"svelte-1g1t992"}">back.</h4>
            <div${add_attribute("id", NS("back"), 0)}><textarea class="${"fc-edit"}" style="${"display: none;"}"${add_attribute("id", NS("back_edit"), 0)}>${escape(back, true)}</textarea>
                <div class="${"rendered-markdown svelte-1g1t992"}"${add_attribute("id", NS("back_display"), 0)}><!-- HTML_TAG_START -->${marked.parse(back)}<!-- HTML_TAG_END --></div></div></div>
        <i style="${"cursor: pointer;"}" class="${"fa fa-trash"}"></i></div>
    <div style="${"clear: both;"}"></div>
</article>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "#upload-form.svelte-1o84bcc{margin:12px}.input-container.svelte-1o84bcc{position:relative;margin-top:28px;height:61px;width:100%;border:1px solid #a2afb9;border-radius:4px;transition:0.2s}.fake-btn.svelte-1o84bcc{flex-shrink:0;background-color:rgba(255, 255, 255, 0.04);border:1px solid var(--blue);border-radius:5px;margin:-30px 0px 0px 20px;font-size:12px;padding:10px;text-transform:uppercase}.file-msg.svelte-1o84bcc{font-size:12px}#upload.svelte-1o84bcc{position:absolute;right:0;bottom:0;width:100px;height:35px;padding:0px;margin:0px 10px 12px 0px;text-transform:uppercase;font-size:12px}#upload_file.svelte-1o84bcc{position:absolute;top:0;left:0;height:100px;width:100%;opacity:0}.message.svelte-1o84bcc{margin-top:5px;font-size:10px;color:var(--orange);width:800px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cardlist;
  let { message = "or drag and drop files here." } = $$props;
  let { allowed = [
    ".png",
    ".jpg",
    ".jpeg",
    ".tif",
    ".tiff",
    ".csv",
    ".JPG",
    ".JPEG",
    ".PNG",
    ".TIF",
    ".TIFF",
    ".CSV"
  ] } = $$props;
  let { form } = $$props;
  let { data } = $$props;
  let cards = [];
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  if ($$props.allowed === void 0 && $$bindings.allowed && allowed !== void 0)
    $$bindings.allowed(allowed);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  cardlist = cards;
  return `${validate_component(Breadcrumb, "Breadcrumb").$$render($$result, {}, {}, {
    default: () => {
      return `<div>Edit Cards</div>
    <div>Learning Home</div>`;
    }
  })}
  
<main class="${"container"}"><h1>Edit cards</h1>
    <div class="${"grid"}"><div><h4>category. <select name="${"category"}" id="${"category"}"></select></h4></div>
        <div style="${"margin-top:10px;"}"><div class="${"input-container svelte-1o84bcc"}"><form method="${"POST"}" id="${"upload-form"}" enctype="${"multipart/form-data"}" class="${"svelte-1o84bcc"}"><input id="${"upload_file_name"}" type="${"hidden"}" name="${"upload_file_name"}">
                <input multiple="${"true"}" id="${"upload_file"}" class="${"file svelte-1o84bcc"}" accept="${"image/*"}" type="${"file"}" name="${"upload_file"}">
                <button id="${"upload"}" class="${"svelte-1o84bcc"}">Upload</button></form>
            
            <div class="${"file-drop-area"}"><span class="${"fake-btn svelte-1o84bcc"}">Choose files</span>
                <span class="${"file-msg svelte-1o84bcc"}">${escape(message)}</span></div></div>
        <progress id="${"upload_progress"}" style="${"display: none;"}"></progress>
        <div id="${"upload_message"}" class="${"message svelte-1o84bcc"}">${escape(form?.message ?? "insert uploaded images as: ![](/images/____), where _____ is the name of your file.")}</div></div></div>

    ${each(cardlist, (card) => {
    return `${validate_component(Edittable, "Edittable").$$render(
      $$result,
      {
        uuid: card.uuid,
        front: card.front,
        back: card.back
      },
      {},
      {}
    )}`;
  })}
    <button class="${"add_button"}">New Card</button>

</main>`;
});
export {
  Page as default
};
