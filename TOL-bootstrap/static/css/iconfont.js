(function(window){var svgSprite='<svg><symbol id="icon-location" viewBox="0 0 1024 1024"><path d="M569.6 697.6s-32 57.6-57.6 57.6c-32 0-57.6-57.6-57.6-57.6-153.6-211.2-166.4-243.2-166.4-236.8-32-51.2-57.6-115.2-57.6-185.6C230.4 108.8 358.4 0 512 0s281.6 108.8 281.6 275.2c0 70.4-19.2 128-57.6 179.2 0 0-12.8 32-166.4 243.2zM512 108.8c-89.6 0-160 70.4-160 153.6 0 83.2 70.4 153.6 160 153.6s160-70.4 160-153.6c0-83.2-70.4-153.6-160-153.6z" fill="#ff9623" ></path><path d="M6.4 947.2l115.2-358.4c6.4-19.2 32-32 57.6-32h102.4c25.6 38.4 64 83.2 121.6 160H230.4l6.4-51.2h-25.6l-6.4 51.2h-57.6l-19.2 44.8h70.4l-19.2 108.8H102.4l-19.2 44.8h89.6l-6.4 64h44.8l6.4-64h595.2l6.4 64h44.8l-6.4-64h89.6l-19.2-44.8h-76.8l-19.2-108.8h64l-19.2-44.8h-57.6l-6.4-51.2h-25.6l6.4 51.2H620.8c57.6-83.2 96-121.6 121.6-160h102.4c25.6 0 51.2 6.4 57.6 32l115.2 358.4c12.8 44.8-6.4 76.8-44.8 76.8H51.2c-32 0-57.6-38.4-44.8-76.8M512 838.4c38.4 0 76.8-70.4 76.8-70.4h211.2l6.4 108.8H217.6l6.4-108.8h211.2s38.4 70.4 76.8 70.4z" fill="#009999" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)