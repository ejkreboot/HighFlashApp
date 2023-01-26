import { c as create_ssr_component } from "../../chunks/index2.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1rf021j_START -->${$$result.title = `<title>High Flash</title>`, ""}<!-- HEAD_svelte-1rf021j_END -->`, ""}
${data.mode != "embed" ? `<nav class="${"container-fluid"}"><ul><li><img alt="${"Logo"}" src="${"/HFP_300_41.png"}"></li></ul>
    <ul>${!data.email ? `<li><a href="${"/public/auth/login"}">Login</a></li>
                <li><a href="${"/public/auth/register"}">Register</a></li>` : ``}
        ${data.email ? `${data.group == "admin" ? `<li><a href="${"/protected/admin/edit"}">Edit Cards</a></li>` : ``}
                <li><a href="${"/protected/study"}">Flash Cards</a></li>
                <li>Handouts</li>
                <li>Podcasts</li>
                <li><a href="${"/protected/logout"}">Logout</a></li>
                <form id="${"logout"}" style="${"display: none"}" action="${"/protected/logout"}" method="${"POST"}"></form>` : ``}</ul></nav>` : `${data.group == "admin" ? `<div>  <small><a href="${"/protected/admin/edit"}">Edit Cards</a></small></div>` : ``}`}

${slots.default ? slots.default({}) : ``}

${data.mode != "embed" ? `` : ``}`;
});
export {
  Layout as default
};
