if(!self.define){let e,i={};const s=(s,d)=>(s=new URL(s+".js",d).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(d,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let c={};const n=e=>s(e,t),o={module:{uri:t},exports:c,require:n};i[t]=Promise.all(d.map((e=>o[e]||n(e)))).then((e=>(r(...e),c)))}}define(["./workbox-ad8011fb"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"../dist/app/app.d.ts",revision:"61b8ef9bdf94765b6212596dddc9c8f7"},{url:"../dist/app/index.d.ts",revision:"ff4fdeee6ac7e1ebdbefc68559826e66"},{url:"../dist/index.d.ts",revision:"0884b76b9b8bd3d2776e1840cd54d79b"},{url:"../dist/painter/index.d.ts",revision:"93c0e07aa6471ae6cf24104509ddc6d7"},{url:"../dist/painter/painter.d.ts",revision:"59e25661a188fb6b91f55837a51c2caf"},{url:"../dist/tool/file-saver.d.ts",revision:"b8e7c71ea5d951176932cd77415c2cec"},{url:"../dist/tool/filename.d.ts",revision:"d0a61915cbfe0c84211bffb67d08abfa"},{url:"../dist/view/input/index.d.ts",revision:"b481c8a7d1646d65794cc83ac61f3a4e"},{url:"../dist/view/input/input-view.d.ts",revision:"96f77b4cc6b68e801cc0b7029c2fe55e"},{url:"./scr/app.617e296db4e27ba451f4.js",revision:null},{url:"./scr/libs.f1ae2557e9e416ad858c.js",revision:null},{url:"./scr/libs.f1ae2557e9e416ad858c.js.LICENSE.txt",revision:"b114cc85da504a772f040e3f40f8e46a"},{url:"./scr/runtime.e8321639bd7cad693306.js",revision:null},{url:"favicon.ico",revision:"9a976aa1a79bce53684a8e4d70234719"},{url:"index.html",revision:"68ce4cb2ddd771682299f72ffa59f8b0"},{url:"manifest.json",revision:"bcff90bb45342cac5187e07b8c71063e"},{url:"robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"}],{})}));