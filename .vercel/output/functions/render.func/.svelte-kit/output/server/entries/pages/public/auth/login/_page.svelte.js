import { c as create_ssr_component, f as add_attribute, e as escape } from "../../../../../chunks/index2.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: 'article.svelte-4j15fz div.svelte-4j15fz:nth-of-type(2){background-image:url("/gate.png");background-position:center;background-size:cover}article.svelte-4j15fz.svelte-4j15fz{padding:30px}.message.svelte-4j15fz.svelte-4j15fz{height:30px;font-size:14px;color:red}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$result.css.add(css);
  return `<div class="${"container"}"><article class="${"grid svelte-4j15fz"}"><div class="${"svelte-4j15fz"}"><hgroup><h1>Sign in</h1>
      <h2>a personalized experience awaits.</h2></hgroup>
    <form method="${"POST"}"><input type="${"text"}" name="${"email"}" placeholder="${"you@email.com"}" aria-label="${"Login"}"${add_attribute("value", form?.email ?? "", 0)} required>
      <input type="${"password"}" name="${"password"}" placeholder="${"password"}" aria-label="${"Password"}" autocomplete="${"current-password"}" required>
      <button type="${"submit"}" class="${"contrast"}">Login</button>
      <div class="${"message svelte-4j15fz"}">${escape(form?.message ?? "")}</div></form>
    <div class="${"svelte-4j15fz"}"><small>Forgot password? <a href="${"/public/auth/forgot"}">Click here.</a></small></div></div>
  <div class="${"svelte-4j15fz"}"></div></article></div>
<form method="${"POST"}" action="${"/login"}"></form>`;
});
export {
  Page as default
};
