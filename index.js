import{a as w,S as L,i as l}from"./assets/vendor-tnUJPedx.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const q="47416764-2d3f1aece90e621ecf55ea406",S="https://pixabay.com/api/";async function m(r,t=1,i=15){const s={key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:i};return(await w.get(S,{params:s})).data}const p=document.querySelector(".gallery");let y;function g(r){const t=r.map(({webformatURL:i,largeImageURL:s,tags:e,likes:o,views:n,comments:h,downloads:b})=>`
      <a href="${s}" class="gallery-item">
        <img src="${i}" alt="${e}" />
        <div class="info">
          <p>Likes: ${o}</p>
          <p>Views: ${n}</p>
          <p>Comments: ${h}</p>
          <p>Downloads: ${b}</p>
        </div>
      </a>
    `).join("");p.innerHTML+=t,y?y.refresh():y=new L(".gallery-item",{captionsData:"alt",captionDelay:250})}function v(){p.innerHTML=""}function c(r){const t=document.querySelector(".load-more");r?t.style.display="block":t.style.display="none"}let u="",a=1,d=15;const P=document.querySelector(".form"),f=document.querySelector(".loader"),$=document.querySelector(".load-more");P.addEventListener("submit",async r=>{if(r.preventDefault(),u=r.target.elements.query.value.trim(),!u){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}a=1,v(),c(!1),f.style.display="block";try{const t=await m(u,a,d);if(t.hits.length===0){l.info({message:"No images found"});return}g(t.hits),t.totalHits>a*d&&c(!0)}catch{l.error({message:"Error fetching images. Please try again."})}finally{f.style.display="none"}});$.addEventListener("click",async()=>{a++,c(!1),f.style.display="block";try{const r=await m(u,a,d);g(r.hits),d*a>=r.totalHits?(c(!1),l.info({message:"we're sorry, but you've reached the end of search results."})):(c(!0),f.style.display="none");const{height:t}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch{l.error({message:"Error fetching images. Please try again."})}});
//# sourceMappingURL=index.js.map
