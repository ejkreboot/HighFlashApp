import { c as create_ssr_component, e as escape } from "../../../../chunks/index2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `This is a private administrative page. You are welcome here, but only because you have logged in with your email address: ${escape(data.email)}, 
and you are a member of the ${escape(data.group)} group.`;
});
export {
  Page as default
};
