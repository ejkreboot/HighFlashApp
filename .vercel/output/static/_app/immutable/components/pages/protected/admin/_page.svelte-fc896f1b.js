import{S as _,i as b,s as h,q as m,r as n,b as f,u as v,B as y,h as p}from"../../../../chunks/index-0d543ad8.js";function c(l){let a,s=l[0].email+"",t,u,o=l[0].group+"",r,d;return{c(){a=m("This is a private administrative page. You are welcome here, but only because you have logged in with your email address: "),t=m(s),u=m(`, 
and you are a member of the `),r=m(o),d=m(" group.")},l(e){a=n(e,"This is a private administrative page. You are welcome here, but only because you have logged in with your email address: "),t=n(e,s),u=n(e,`, 
and you are a member of the `),r=n(e,o),d=n(e," group.")},m(e,i){f(e,a,i),f(e,t,i),f(e,u,i),f(e,r,i),f(e,d,i)},p(e,[i]){i&1&&s!==(s=e[0].email+"")&&v(t,s),i&1&&o!==(o=e[0].group+"")&&v(r,o)},i:y,o:y,d(e){e&&p(a),e&&p(t),e&&p(u),e&&p(r),e&&p(d)}}}function g(l,a,s){let{data:t}=a;return l.$$set=u=>{"data"in u&&s(0,t=u.data)},[t]}class q extends _{constructor(a){super(),b(this,a,g,c,h,{data:0})}}export{q as default};
