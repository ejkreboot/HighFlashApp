import { c as create_ssr_component, e as escape, f as add_attribute, v as validate_component, h as each } from "../../../../chunks/index2.js";
import { B as Breadcrumb } from "../../../../chunks/Breadcrumb.js";
const Category_svelte_svelte_type_style_lang = "";
const css = {
  code: `@import url('https://fonts.googleapis.com/css2?family=Martian+Mono:wght@200;400;700;800&display=swap');@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;800&display=swap');.item.svelte-14yrony.svelte-14yrony{width:800px;display:flex;padding:10px}.number.svelte-14yrony.svelte-14yrony{width:80px;height:75px;padding-top:7px;padding-right:0px;margin-right:20px;font-family:"Martian Mono";font-size:40px;font-weight:700;text-align:center;background-color:var(--orange);color:white;border-radius:50%}.text-box.svelte-14yrony.svelte-14yrony{margin-top:auto;margin-bottom:auto}.text.svelte-14yrony.svelte-14yrony{font-family:"Montserrat";color:var(--gray);font-size:18px;font-weight:100;text-transform:uppercase}.text.svelte-14yrony .bold.svelte-14yrony{font-family:"Montserrat";color:var(--orange);font-size:25px;font-weight:800;text-transform:lowercase}`,
  map: null
};
const Category = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { number } = $$props;
  let { category } = $$props;
  let { studying } = $$props;
  let { mastered } = $$props;
  let { total } = $$props;
  let { root } = $$props;
  if (total == 0) {
    mastered = 0;
  } else {
    mastered = Math.round(100 * (mastered / total));
  }
  if (number < 10) {
    number = "0" + number;
  }
  if ($$props.number === void 0 && $$bindings.number && number !== void 0)
    $$bindings.number(number);
  if ($$props.category === void 0 && $$bindings.category && category !== void 0)
    $$bindings.category(category);
  if ($$props.studying === void 0 && $$bindings.studying && studying !== void 0)
    $$bindings.studying(studying);
  if ($$props.mastered === void 0 && $$bindings.mastered && mastered !== void 0)
    $$bindings.mastered(mastered);
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  if ($$props.root === void 0 && $$bindings.root && root !== void 0)
    $$bindings.root(root);
  $$result.css.add(css);
  return `<div class="${"item svelte-14yrony"}"><div class="${"number svelte-14yrony"}">${escape(number)}</div>
        <div class="${"text-box svelte-14yrony"}"><div class="${"text svelte-14yrony"}"><span class="${"bold svelte-14yrony"}"><a${add_attribute("href", root + category, 0)}>${escape(category)}</a></span>
                <span>(${escape(studying)} of ${escape(total)} active, ${escape(mastered)}% mastered)</span></div></div>
</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categories = [];
  return `${validate_component(Breadcrumb, "Breadcrumb").$$render($$result, {}, {}, {
    default: () => {
      return `<div>Learning Home</div>`;
    }
  })}
  
<main class="${"container"}"><h1>welcome to the learning center.</h1>

    <p>Our personalized learning platfrom uses a variation on the <a href="${"https://super-memory.com/english/ol/sm2.htm"}">Super Memo SM2 algorithm</a>
        to maximize retention via spaced repetition based on your past performance. Spaced repetition is an evidence based learning methodology<sup>1,2,3</sup> that 
        improves retention over simple bulk learning. While our system is designed to allow you to review the material in a single session for as 
        long as you wish (emphasizing material that you are having the most difficulty recalling), learning follows the law of diminishing returns
        over the course of a single session. Therefore, it is recommended to revisit this material multiple times over the course of days and weeks to optimize retention.</p>
    <p>Select the flash card set you wish to review from the following options.
    </p>
    ${each(categories, (cat, i) => {
    return `${validate_component(Category, "Category").$$render(
      $$result,
      {
        root: "/protected/study/",
        number: i + 1,
        category: cat.category,
        total: cat.total_cards,
        studying: cat.studying,
        mastered: cat.mastered
      },
      {},
      {}
    )}`;
  })}

    <br>
    <br>
    <b>References:</b>
    <small><br>
        <br>
        <ol><li>Augustin M. (2014). How to learn effectively in medical school: test yourself, learn actively, and repeat in intervals. The Yale journal of biology and medicine, 87(2), 207–212. </li>
            <li>Hopkins, R.F., Lyle, K.B., Hieb, J.L. &amp; Ralston, P.A.S. (2015) Spaced Retrieval Practice Increases College Students’ Short- and Long-Term Retention of Mathematics Knowledge, Educational Psychology Review, 28(4), pp. 853-873. </li>
            <li>Voice, A., &amp; Stirton, A. 2020 Jan 15. Spaced Repetition: towards more effective learning in STEM. New Directions in the Teaching of Physical Sciences. [Online] 0:15 </li></ol></small></main>`;
});
export {
  Page as default
};
