(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{401:function(e,t,a){"use strict";var r=a(1),n=a(6),l=a(0),o=a.n(l),c=a(399),s=a.n(c),i=a(396),m=a(395),u=a(397),f=a(49),h=a.n(f);function g(e){var t=e.to,a=e.href,l=e.label,c=Object(n.a)(e,["to","href","label"]),s=Object(u.a)(t);return o.a.createElement(i.a,Object(r.a)({className:"footer__link-item"},a?{target:"_blank",rel:"noopener noreferrer",href:a}:{to:s},c),l)}var E=function(e){var t=e.url,a=e.alt;return o.a.createElement("img",{className:"footer__logo",alt:a,src:t})};t.a=function(){var e=Object(m.a)().siteConfig,t=(void 0===e?{}:e).themeConfig,a=(void 0===t?{}:t).footer,r=a||{},n=r.copyright,l=r.links,c=void 0===l?[]:l,i=r.logo,f=void 0===i?{}:i,d=Object(u.a)(f.src);return a?o.a.createElement("footer",{className:s()("footer",{"footer--dark":"dark"===a.style})},o.a.createElement("div",{className:"container"},c&&c.length>0&&o.a.createElement("div",{className:"row footer__links"},c.map((function(e,t){return o.a.createElement("div",{key:t,className:"col footer__col"},null!=e.title?o.a.createElement("h4",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?o.a.createElement("ul",{className:"footer__items"},e.items.map((function(e,t){return"GitHub Stars"===e.label?o.a.createElement("li",{key:e.href||e.to,className:"footer__item"},o.a.createElement("iframe",{src:"https://ghbtns.com/github-btn.html?user=mikro-orm&repo=mikro-orm&type=star&count=true",style:{marginTop:10},frameBorder:0,scrolling:0,width:100,height:30,title:"GitHub Stars",key:t})):"GitHub Sponsors"===e.label?o.a.createElement("li",{key:e.href||e.to,className:"footer__item"},o.a.createElement("iframe",{src:"https://ghbtns.com/github-btn.html?user=B4nan&type=sponsor",frameBorder:0,scrolling:0,width:130,height:30,title:"Sponsor B4nan"})):e.html?o.a.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e.html}}):o.a.createElement("li",{key:e.href||e.to,className:"footer__item"},o.a.createElement(g,e))}))):null)}))),(f||n)&&o.a.createElement("div",{className:"text--center"},f&&f.src&&o.a.createElement("div",{className:"margin-bottom--sm"},f.href?o.a.createElement("a",{href:f.href,target:"_blank",rel:"noopener noreferrer",className:h.a.footerLogoLink},o.a.createElement(E,{alt:f.alt,url:d})):o.a.createElement(E,{alt:f.alt,url:d})),n,"Icons made by ",o.a.createElement("a",{href:"https://www.flaticon.com/authors/surang",title:"surang"},"surang")," and ",o.a.createElement("a",{href:"https://www.flaticon.com/authors/skyclick",title:"Skyclick"},"Skyclick"),"."))):null}},58:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),l=a(400),o=a(396);t.default=function(e){var t=e.tags,a={};Object.keys(t).forEach((function(e){var t=function(e){return e[0].toUpperCase()}(e);a[t]=a[t]||[],a[t].push(e)}));var r=Object.entries(a).sort((function(e,t){var a=e[0],r=t[0];return a===r?0:a>r?1:-1})).map((function(e){var a=e[0],r=e[1];return n.a.createElement("div",{key:a},n.a.createElement("h3",null,a),r.map((function(e){return n.a.createElement(o.a,{className:"padding-right--md",href:t[e].permalink,key:e},t[e].name," (",t[e].count,")")})),n.a.createElement("hr",null))})).filter((function(e){return null!=e}));return n.a.createElement(l.a,{title:"Tags",description:"Blog Tags"},n.a.createElement("div",{className:"container margin-vert--lg"},n.a.createElement("div",{className:"row"},n.a.createElement("main",{className:"col col--8 col--offset-2"},n.a.createElement("h1",null,"Tags"),n.a.createElement("div",{className:"margin-vert--lg"},r)))))}}}]);