!function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function c(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t){return 0===Object.keys(t).length}function s(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function l(t,e,n){t.$$.on_destroy.push(s(e,n))}function u(t,e,n,o){if(t){const r=f(t,e,n,o);return t[0](r)}}function f(t,n,o,r){return t[1]&&r?e(o.ctx.slice(),t[1](r(n))):o.ctx}function d(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}function p(t,e,n,o,r,c){if(r){const a=f(e,n,o,c);t.p(a,r)}}function h(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}function $(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}new Set;let m=!1;function g(t,e,n,o){for(;t<e;){const r=t+(e-t>>1);n(r)<=o?t=r+1:e=r}return t}function _(t,e){if(m){for(!function(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if("HEAD"===t.nodeName){const t=[];for(let n=0;n<e.length;n++){const o=e[n];void 0!==o.claim_order&&t.push(o)}e=t}const n=new Int32Array(e.length+1),o=new Int32Array(e.length);n[0]=-1;let r=0;for(let t=0;t<e.length;t++){const c=e[t].claim_order,a=(r>0&&e[n[r]].claim_order<=c?r+1:g(1,r,(t=>e[n[t]].claim_order),c))-1;o[t]=n[a]+1;const i=a+1;n[i]=t,r=Math.max(i,r)}const c=[],a=[];let i=e.length-1;for(let t=n[r]+1;0!=t;t=o[t-1]){for(c.push(e[t-1]);i>=t;i--)a.push(e[i]);i--}for(;i>=0;i--)a.push(e[i]);c.reverse(),a.sort(((t,e)=>t.claim_order-e.claim_order));for(let e=0,n=0;e<a.length;e++){for(;n<c.length&&a[e].claim_order>=c[n].claim_order;)n++;const o=n<c.length?c[n]:null;t.insertBefore(a[e],o)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);null!==t.actual_end_child&&void 0===t.actual_end_child.claim_order;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?void 0===e.claim_order&&e.parentNode===t||t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else e.parentNode===t&&null===e.nextSibling||t.appendChild(e)}function y(t,e,n){m&&!n?_(t,e):e.parentNode===t&&e.nextSibling==n||t.insertBefore(e,n||null)}function b(t){t.parentNode.removeChild(t)}function v(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function w(){return x(" ")}function E(){return x("")}function k(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function N(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function j(t){return Array.from(t.childNodes)}function A(t){void 0===t.claim_info&&(t.claim_info={last_index:0,total_claimed:0})}function S(t,e,n,o,r=!1){A(t);const c=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const c=t[o];if(e(c)){const e=n(c);return void 0===e?t.splice(o,1):t[o]=e,r||(t.claim_info.last_index=o),c}}for(let o=t.claim_info.last_index-1;o>=0;o--){const c=t[o];if(e(c)){const e=n(c);return void 0===e?t.splice(o,1):t[o]=e,r?void 0===e&&t.claim_info.last_index--:t.claim_info.last_index=o,c}}return o()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function L(t,e,n,o){return S(t,(t=>t.nodeName===e),(t=>{const e=[];for(let o=0;o<t.attributes.length;o++){const r=t.attributes[o];n[r.name]||e.push(r.name)}e.forEach((e=>t.removeAttribute(e)))}),(()=>o(e)))}function C(t,e,n){return L(t,e,n,v)}function O(t,e){return S(t,(t=>3===t.nodeType),(t=>{const n=""+e;if(t.data.startsWith(n)){if(t.data.length!==n.length)return t.splitText(n.length)}else t.data=n}),(()=>x(e)),!0)}function M(t){return O(t," ")}function R(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function T(t,e=document.body){return Array.from(e.querySelectorAll(t))}new Map;let D;function H(t){D=t}function q(){if(!D)throw new Error("Function called outside component initialization");return D}function B(t,e){return q().$$.context.set(t,e),e}function I(t){return q().$$.context.get(t)}const P=[],F=[],K=[],z=[],U=Promise.resolve();let W=!1;function G(){W||(W=!0,U.then(X))}function J(t){K.push(t)}const Q=new Set;let V=0;function X(){const t=D;do{for(;V<P.length;){const t=P[V];V++,H(t),Y(t.$$)}for(H(null),P.length=0,V=0;F.length;)F.pop()();for(let t=0;t<K.length;t+=1){const e=K[t];Q.has(e)||(Q.add(e),e())}K.length=0}while(P.length);for(;z.length;)z.pop()();W=!1,Q.clear(),H(t)}function Y(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(J)}}const Z=new Set;let tt;function et(){tt={r:0,c:[],p:tt}}function nt(){tt.r||r(tt.c),tt=tt.p}function ot(t,e){t&&t.i&&(Z.delete(t),t.i(e))}function rt(t,e,n,o){if(t&&t.o){if(Z.has(t))return;Z.add(t),tt.c.push((()=>{Z.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function ct(t){return"object"==typeof t&&null!==t?t:{}}new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]);let at;function it(t){t&&t.c()}function st(t,e){t&&t.l(e)}function lt(t,e,o,a){const{fragment:i,on_mount:s,on_destroy:l,after_update:u}=t.$$;i&&i.m(e,o),a||J((()=>{const e=s.map(n).filter(c);l?l.push(...e):r(e),t.$$.on_mount=[]})),u.forEach(J)}function ut(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ft(e,n,c,a,i,s,l,u=[-1]){const f=D;H(e);const d=e.$$={fragment:null,ctx:null,props:s,update:t,not_equal:i,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(f?f.$$.context:[])),callbacks:o(),dirty:u,skip_bound:!1,root:n.target||f.$$.root};l&&l(d.root);let p=!1;if(d.ctx=c?c(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return d.ctx&&i(d.ctx[t],d.ctx[t]=r)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](r),p&&function(t,e){-1===t.$$.dirty[0]&&(P.push(t),G(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(e,t)),n})):[],d.update(),p=!0,r(d.before_update),d.fragment=!!a&&a(d.ctx),n.target){if(n.hydrate){m=!0;const t=j(n.target);d.fragment&&d.fragment.l(t),t.forEach(b)}else d.fragment&&d.fragment.c();n.intro&&ot(e.$$.fragment),lt(e,n.target,n.anchor,n.customElement),m=!1,X()}H(f)}"function"==typeof HTMLElement&&(at=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:t}=this.$$;this.$$.on_disconnect=t.map(n).filter(c);for(const t in this.$$.slotted)this.appendChild(this.$$.slotted[t])}attributeChangedCallback(t,e,n){this[t]=n}disconnectedCallback(){r(this.$$.on_disconnect)}$destroy(){ut(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){this.$$set&&!i(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}});class dt{$destroy(){ut(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){this.$$set&&!i(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const pt=[];function ht(e,n=t){let o;const r=new Set;function c(t){if(a(e,t)&&(e=t,o)){const t=!pt.length;for(const t of r)t[1](),pt.push(t,e);if(t){for(let t=0;t<pt.length;t+=2)pt[t][0](pt[t+1]);pt.length=0}}}return{set:c,update:function(t){c(t(e))},subscribe:function(a,i=t){const s=[a,i];return r.add(s),1===r.size&&(o=n(c)||t),a(e),()=>{r.delete(s),0===r.size&&(o(),o=null)}}}}function $t(e,n,o){const a=!Array.isArray(e),i=a?[e]:e,l=n.length<2;return u=e=>{let o=!1;const u=[];let f=0,d=t;const p=()=>{if(f)return;d();const o=n(a?u[0]:u,e);l?e(o):d=c(o)?o:t},h=i.map(((t,e)=>s(t,(t=>{u[e]=t,f&=~(1<<e),o&&p()}),(()=>{f|=1<<e}))));return o=!0,p(),function(){r(h),d()}},{subscribe:ht(o,u).subscribe};var u}const mt={},gt={};function _t(t){return{...t.location,state:t.history.state,key:t.history.state&&t.history.state.key||"initial"}}const yt=function(t,e){const n=[];let o=_t(t);return{get location(){return o},listen(e){n.push(e);const r=()=>{o=_t(t),e({location:o,action:"POP"})};return t.addEventListener("popstate",r),()=>{t.removeEventListener("popstate",r);const o=n.indexOf(e);n.splice(o,1)}},navigate(e,{state:r,replace:c=!1}={}){r={...r,key:Date.now()+""};try{c?t.history.replaceState(r,null,e):t.history.pushState(r,null,e)}catch(n){t.location[c?"replace":"assign"](e)}o=_t(t),n.forEach((t=>t({location:o,action:"PUSH"})))}}}(Boolean("undefined"!=typeof window&&window.document&&window.document.createElement)?window:function(t="/"){let e=0;const n=[{pathname:t,search:""}],o=[];return{get location(){return n[e]},addEventListener(t,e){},removeEventListener(t,e){},history:{get entries(){return n},get index(){return e},get state(){return o[e]},pushState(t,r,c){const[a,i=""]=c.split("?");e++,n.push({pathname:a,search:i}),o.push(t)},replaceState(t,r,c){const[a,i=""]=c.split("?");n[e]={pathname:a,search:i},o[e]=t}}}}()),{navigate:bt}=yt,vt=/^:(.+)/;function xt(t){return"*"===t[0]}function wt(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function Et(t){return t.replace(/(^\/+|\/+$)/g,"")}function kt(t,e){return{route:t,score:t.default?0:wt(t.path).reduce(((t,e)=>(t+=4,!function(t){return""===t}(e)?!function(t){return vt.test(t)}(e)?xt(e)?t-=5:t+=3:t+=2:t+=1,t)),0),index:e}}function Nt(t,e){let n,o;const[r]=e.split("?"),c=wt(r),a=""===c[0],i=function(t){return t.map(kt).sort(((t,e)=>t.score<e.score?1:t.score>e.score?-1:t.index-e.index))}(t);for(let t=0,r=i.length;t<r;t++){const r=i[t].route;let s=!1;if(r.default){o={route:r,params:{},uri:e};continue}const l=wt(r.path),u={},f=Math.max(c.length,l.length);let d=0;for(;d<f;d++){const t=l[d],e=c[d];if(void 0!==t&&xt(t)){u["*"===t?"*":t.slice(1)]=c.slice(d).map(decodeURIComponent).join("/");break}if(void 0===e){s=!0;break}let n=vt.exec(t);if(n&&!a){const t=decodeURIComponent(e);u[n[1]]=t}else if(t!==e){s=!0;break}}if(!s){n={route:r,params:u,uri:"/"+c.slice(0,d).join("/")};break}}return n||o||null}function jt(t,e){return`${Et("/"===e?t:`${Et(t)}/${Et(e)}`)}/`}function At(t){let e;const n=t[9].default,o=u(n,t,t[8],null);return{c(){o&&o.c()},l(t){o&&o.l(t)},m(t,n){o&&o.m(t,n),e=!0},p(t,[r]){o&&o.p&&(!e||256&r)&&p(o,n,t,t[8],e?d(n,t[8],r,null):h(t[8]),null)},i(t){e||(ot(o,t),e=!0)},o(t){rt(o,t),e=!1},d(t){o&&o.d(t)}}}function St(t,e,n){let o,r,c,{$$slots:a={},$$scope:i}=e,{basepath:s="/"}=e,{url:u=null}=e;const f=I(mt),d=I(gt),p=ht([]);l(t,p,(t=>n(6,r=t)));const h=ht(null);let $=!1;const m=f||ht(u?{pathname:u}:yt.location);l(t,m,(t=>n(5,o=t)));const g=d?d.routerBase:ht({path:s,uri:s});l(t,g,(t=>n(7,c=t)));const _=$t([g,h],(([t,e])=>{if(null===e)return t;const{path:n}=t,{route:o,uri:r}=e;return{path:o.default?n:o.path.replace(/\*.*$/,""),uri:r}}));var y;return f||(y=()=>yt.listen((t=>{m.set(t.location)})),q().$$.on_mount.push(y),B(mt,m)),B(gt,{activeRoute:h,base:g,routerBase:_,registerRoute:function(t){const{path:e}=c;let{path:n}=t;if(t._path=n,t.path=jt(e,n),"undefined"==typeof window){if($)return;const e=function(t,e){return Nt([t],e)}(t,o.pathname);e&&(h.set(e),$=!0)}else p.update((e=>(e.push(t),e)))},unregisterRoute:function(t){p.update((e=>{const n=e.indexOf(t);return e.splice(n,1),e}))}}),t.$$set=t=>{"basepath"in t&&n(3,s=t.basepath),"url"in t&&n(4,u=t.url),"$$scope"in t&&n(8,i=t.$$scope)},t.$$.update=()=>{if(128&t.$$.dirty){const{path:t}=c;p.update((e=>(e.forEach((e=>e.path=jt(t,e._path))),e)))}if(96&t.$$.dirty){const t=Nt(r,o.pathname);h.set(t)}},[p,m,g,s,u,o,r,c,i,a]}var Lt=class extends dt{constructor(t){super(),ft(this,t,St,At,a,{basepath:3,url:4})}};const Ct=t=>({params:4&t,location:16&t}),Ot=t=>({params:t[2],location:t[4]});function Mt(t){let e,n,o,r;const c=[Tt,Rt],a=[];function i(t,e){return null!==t[0]?0:1}return e=i(t),n=a[e]=c[e](t),{c(){n.c(),o=E()},l(t){n.l(t),o=E()},m(t,n){a[e].m(t,n),y(t,o,n),r=!0},p(t,r){let s=e;e=i(t),e===s?a[e].p(t,r):(et(),rt(a[s],1,1,(()=>{a[s]=null})),nt(),n=a[e],n?n.p(t,r):(n=a[e]=c[e](t),n.c()),ot(n,1),n.m(o.parentNode,o))},i(t){r||(ot(n),r=!0)},o(t){rt(n),r=!1},d(t){a[e].d(t),t&&b(o)}}}function Rt(t){let e;const n=t[10].default,o=u(n,t,t[9],Ot);return{c(){o&&o.c()},l(t){o&&o.l(t)},m(t,n){o&&o.m(t,n),e=!0},p(t,r){o&&o.p&&(!e||532&r)&&p(o,n,t,t[9],e?d(n,t[9],r,Ct):h(t[9]),Ot)},i(t){e||(ot(o,t),e=!0)},o(t){rt(o,t),e=!1},d(t){o&&o.d(t)}}}function Tt(t){let n,o,r;const c=[{location:t[4]},t[2],t[3]];var a=t[0];function i(t){let n={};for(let t=0;t<c.length;t+=1)n=e(n,c[t]);return{props:n}}return a&&(n=new a(i())),{c(){n&&it(n.$$.fragment),o=E()},l(t){n&&st(n.$$.fragment,t),o=E()},m(t,e){n&&lt(n,t,e),y(t,o,e),r=!0},p(t,e){const r=28&e?function(t,e){const n={},o={},r={$$scope:1};let c=t.length;for(;c--;){const a=t[c],i=e[c];if(i){for(const t in a)t in i||(o[t]=1);for(const t in i)r[t]||(n[t]=i[t],r[t]=1);t[c]=i}else for(const t in a)r[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(c,[16&e&&{location:t[4]},4&e&&ct(t[2]),8&e&&ct(t[3])]):{};if(a!==(a=t[0])){if(n){et();const t=n;rt(t.$$.fragment,1,0,(()=>{ut(t,1)})),nt()}a?(n=new a(i()),it(n.$$.fragment),ot(n.$$.fragment,1),lt(n,o.parentNode,o)):n=null}else a&&n.$set(r)},i(t){r||(n&&ot(n.$$.fragment,t),r=!0)},o(t){n&&rt(n.$$.fragment,t),r=!1},d(t){t&&b(o),n&&ut(n,t)}}}function Dt(t){let e,n,o=null!==t[1]&&t[1].route===t[7]&&Mt(t);return{c(){o&&o.c(),e=E()},l(t){o&&o.l(t),e=E()},m(t,r){o&&o.m(t,r),y(t,e,r),n=!0},p(t,[n]){null!==t[1]&&t[1].route===t[7]?o?(o.p(t,n),2&n&&ot(o,1)):(o=Mt(t),o.c(),ot(o,1),o.m(e.parentNode,e)):o&&(et(),rt(o,1,1,(()=>{o=null})),nt())},i(t){n||(ot(o),n=!0)},o(t){rt(o),n=!1},d(t){o&&o.d(t),t&&b(e)}}}function Ht(t,n,o){let r,c,{$$slots:a={},$$scope:i}=n,{path:s=""}=n,{component:u=null}=n;const{registerRoute:f,unregisterRoute:d,activeRoute:p}=I(gt);l(t,p,(t=>o(1,r=t)));const h=I(mt);l(t,h,(t=>o(4,c=t)));const m={path:s,default:""===s};let g={},_={};var y;return f(m),"undefined"!=typeof window&&(y=()=>{d(m)},q().$$.on_destroy.push(y)),t.$$set=t=>{o(13,n=e(e({},n),$(t))),"path"in t&&o(8,s=t.path),"component"in t&&o(0,u=t.component),"$$scope"in t&&o(9,i=t.$$scope)},t.$$.update=()=>{2&t.$$.dirty&&r&&r.route===m&&o(2,g=r.params);{const{path:t,component:e,...r}=n;o(3,_=r)}},n=$(n),[u,r,g,_,c,p,h,m,s,i,a]}var qt=class extends dt{constructor(t){super(),ft(this,t,Ht,Dt,a,{path:8,component:0})}};function Bt(t){function e(t){const e=function(t,e){for(;e&&e.tagName!==t;)e=e.parentNode;return e}("A",t.target);e&&""===e.target&&function(t){const e=location.host;return t.host==e||0===t.href.indexOf(`https://${e}`)||0===t.href.indexOf(`http://${e}`)}(e)&&function(t){return!t.defaultPrevented&&0===t.button&&!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}(t)&&!e.hasAttribute("noroute")&&(t.preventDefault(),bt(e.pathname+e.search,{replace:e.hasAttribute("replace")}))}return t.addEventListener("click",e),{destroy(){t.removeEventListener("click",e)}}}function It(e){let n,o,r,c,a=e[0].title+"";return document.title=n=e[1].name+" : "+e[0].title,{c(){o=w(),r=v("h2"),c=x(a)},l(t){T('[data-svelte="svelte-xmf5kr"]',document.head).forEach(b),o=M(t),r=C(t,"H2",{});var e=j(r);c=O(e,a),e.forEach(b)},m(t,e){y(t,o,e),y(t,r,e),_(r,c)},p(t,[e]){3&e&&n!==(n=t[1].name+" : "+t[0].title)&&(document.title=n),1&e&&a!==(a=t[0].title+"")&&R(c,a)},i:t,o:t,d(t){t&&b(o),t&&b(r)}}}function Pt(t,e,n){let{page:o={}}=e,{project:r={}}=e;return t.$$set=t=>{"page"in t&&n(0,o=t.page),"project"in t&&n(1,r=t.project)},[o,r]}var Ft=class extends dt{constructor(t){super(),ft(this,t,Pt,It,a,{page:0,project:1})}};function Kt(e){let n,o,r,c=e[0].generate+"";return document.title=n=e[1].name,{c(){o=w(),r=x(c)},l(t){T('[data-svelte="svelte-ybycci"]',document.head).forEach(b),o=M(t),r=O(t,c)},m(t,e){y(t,o,e),y(t,r,e)},p(t,[e]){2&e&&n!==(n=t[1].name)&&(document.title=n),1&e&&c!==(c=t[0].generate+"")&&R(r,c)},i:t,o:t,d(t){t&&b(o),t&&b(r)}}}function zt(t,e,n){let{page:o={}}=e,{project:r={}}=e;return t.$$set=t=>{"page"in t&&n(0,o=t.page),"project"in t&&n(1,r=t.project)},[o,r]}var Ut=class extends dt{constructor(t){super(),ft(this,t,zt,Kt,a,{page:0,project:1})}};function Wt(e){let n,o;return{c(){n=v("footer"),this.h()},l(t){n=C(t,"FOOTER",{class:!0}),j(n).forEach(b),this.h()},h(){N(n,"class",o="page-footer "+e[0])},m(t,e){y(t,n,e)},p(t,[e]){1&e&&o!==(o="page-footer "+t[0])&&N(n,"class",o)},i:t,o:t,d(t){t&&b(n)}}}function Gt(t,e,n){let{className:o=""}=e;return t.$$set=t=>{"className"in t&&n(0,o=t.className)},[o]}var Jt=class extends dt{constructor(t){super(),ft(this,t,Gt,Wt,a,{className:0})}};function Qt(e){let n,o,r,a,i,s,l,u,f,d;return{c(){n=v("header"),o=v("a"),r=x("Main"),a=w(),i=v("a"),s=x("Fake"),this.h()},l(t){n=C(t,"HEADER",{class:!0});var e=j(n);o=C(e,"A",{class:!0,href:!0});var c=j(o);r=O(c,"Main"),c.forEach(b),a=M(e),i=C(e,"A",{class:!0,href:!0});var l=j(i);s=O(l,"Fake"),l.forEach(b),e.forEach(b),this.h()},h(){N(o,"class","page-header__Link"),N(o,"href","/"),N(i,"class","page-header__Link"),N(i,"href","/fake"),N(n,"class",l="page-header "+e[0])},m(e,l){var p;y(e,n,l),_(n,o),_(o,r),_(n,a),_(n,i),_(i,s),f||(p=u=Bt.call(null,n),d=p&&c(p.destroy)?p.destroy:t,f=!0)},p(t,[e]){1&e&&l!==(l="page-header "+t[0])&&N(n,"class",l)},i:t,o:t,d(t){t&&b(n),f=!1,d()}}}function Vt(t,e,n){let{className:o=""}=e;return t.$$set=t=>{"className"in t&&n(0,o=t.className)},[o]}var Xt=class extends dt{constructor(t){super(),ft(this,t,Vt,Qt,a,{className:0})}};const Yt=["input","textarea"],Zt=t=>document.activeElement.tagName.toLowerCase()===t,te=t=>{"e"!==t.key.toLowerCase()||Yt.some(Zt)||(document.querySelectorAll("h1, h2, h3, p, b, a, button, label, legend, blockquote, cite").forEach((t=>{t.spellcheck=!1})),document.body.contentEditable="true"!==document.body.contentEditable)};function ee(t){let e,n;return e=new Ut({props:{page:t[1]["/"],project:t[0]}}),{c(){it(e.$$.fragment)},l(t){st(e.$$.fragment,t)},m(t,o){lt(e,t,o),n=!0},p(t,n){const o={};2&n&&(o.page=t[1]["/"]),1&n&&(o.project=t[0]),e.$set(o)},i(t){n||(ot(e.$$.fragment,t),n=!0)},o(t){rt(e.$$.fragment,t),n=!1},d(t){ut(e,t)}}}function ne(t){let e,n;return e=new Ft({props:{page:t[1]["/404.html"],project:t[0]}}),{c(){it(e.$$.fragment)},l(t){st(e.$$.fragment,t)},m(t,o){lt(e,t,o),n=!0},p(t,n){const o={};2&n&&(o.page=t[1]["/404.html"]),1&n&&(o.project=t[0]),e.$set(o)},i(t){n||(ot(e.$$.fragment,t),n=!0)},o(t){rt(e.$$.fragment,t),n=!1},d(t){ut(e,t)}}}function oe(t){let e,n,o,r,c,a,i,s,l,u,f,d,p=t[0].name+"";return e=new Xt({props:{className:"page__header"}}),i=new qt({props:{path:"/",$$slots:{default:[ee]},$$scope:{ctx:t}}}),l=new qt({props:{path:"*",$$slots:{default:[ne]},$$scope:{ctx:t}}}),f=new Jt({props:{className:"page__footer"}}),{c(){it(e.$$.fragment),n=w(),o=v("main"),r=v("h1"),c=x(p),a=w(),it(i.$$.fragment),s=w(),it(l.$$.fragment),u=w(),it(f.$$.fragment),this.h()},l(t){st(e.$$.fragment,t),n=M(t),o=C(t,"MAIN",{class:!0});var d=j(o);r=C(d,"H1",{class:!0});var h=j(r);c=O(h,p),h.forEach(b),a=M(d),st(i.$$.fragment,d),s=M(d),st(l.$$.fragment,d),d.forEach(b),u=M(t),st(f.$$.fragment,t),this.h()},h(){N(r,"class","visually-hidden"),N(o,"class","page__main")},m(t,p){lt(e,t,p),y(t,n,p),y(t,o,p),_(o,r),_(r,c),_(o,a),lt(i,o,null),_(o,s),lt(l,o,null),y(t,u,p),lt(f,t,p),d=!0},p(t,e){(!d||1&e)&&p!==(p=t[0].name+"")&&R(c,p);const n={};35&e&&(n.$$scope={dirty:e,ctx:t}),i.$set(n);const o={};35&e&&(o.$$scope={dirty:e,ctx:t}),l.$set(o)},i(t){d||(ot(e.$$.fragment,t),ot(i.$$.fragment,t),ot(l.$$.fragment,t),ot(f.$$.fragment,t),d=!0)},o(t){rt(e.$$.fragment,t),rt(i.$$.fragment,t),rt(l.$$.fragment,t),rt(f.$$.fragment,t),d=!1},d(t){ut(e,t),t&&b(n),t&&b(o),ut(i),ut(l),t&&b(u),ut(f,t)}}}function re(t){let e,n,o,r;return e=new Lt({props:{url:t[2],$$slots:{default:[oe]},$$scope:{ctx:t}}}),{c(){it(e.$$.fragment)},l(t){st(e.$$.fragment,t)},m(c,a){lt(e,c,a),n=!0,o||(r=k(window,"keydown",t[3]),o=!0)},p(t,[n]){const o={};4&n&&(o.url=t[2]),35&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(ot(e.$$.fragment,t),n=!0)},o(t){rt(e.$$.fragment,t),n=!1},d(t){ut(e,t),o=!1,r()}}}function ce(t,e,n){let{isDev:o=!1}=e,{project:r={}}=e,{pages:c={}}=e,{url:a=""}=e;return t.$$set=t=>{"isDev"in t&&n(4,o=t.isDev),"project"in t&&n(0,r=t.project),"pages"in t&&n(1,c=t.pages),"url"in t&&n(2,a=t.url)},[r,c,a,t=>{o&&te(t)},o]}new class extends dt{constructor(t){super(),ft(this,t,ce,re,a,{isDev:4,project:0,pages:1,url:2})}}({hydrate:!0,props:window.props,target:document.body})}();