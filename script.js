const stories = [
 {id:1,category:"Anime & Entertainment",title:"How to write an anime character analysis that goes beyond the plot",excerpt:"A practical framework for exploring motivation, growth, symbolism and the choices that make a character memorable.",symbol:"✧",art:"",read:"A strong character analysis does more than retell events. Start with the character's central goal, then identify the fear or belief that makes that goal difficult. Track how important decisions challenge that belief. Finally, connect recurring visual details, relationships and turning points to the story's larger themes. Use specific scenes as evidence, separate interpretation from fact, and acknowledge when more than one reading is possible."},
 {id:2,category:"Movies & Streaming",title:"A simple checklist for choosing your next movie night",excerpt:"Match the mood, runtime and viewing setup before you spend half the evening scrolling.",symbol:"▶",art:"pink-art",read:"First, agree on the mood: light, tense, thoughtful or adventurous. Set a runtime limit and choose two or three genres everyone can accept. Check the film's rating and content notes if that matters to your group. Use official streaming-service search pages to confirm availability in your region, because catalogs change by country and over time. Keep a backup choice ready."},
 {id:3,category:"Technology & AI",title:"Five practical ways to use AI without handing over your judgment",excerpt:"Use AI for brainstorming, outlining and repetitive tasks while keeping human review in the loop.",symbol:"AI",art:"blue-art",read:"AI can help generate first drafts, explain unfamiliar concepts, organize notes, brainstorm alternatives and write small pieces of code. Treat outputs as suggestions rather than guaranteed facts. Verify important claims with reliable sources, avoid entering private information into tools you do not trust, and test generated code before using it. The best workflow combines machine speed with human context and responsibility."},
 {id:4,category:"Trending Stories",title:"Why small internet communities can shape big trends",excerpt:"From niche forums to short-form video, ideas often spread through tight-knit communities first.",symbol:"↗",art:"orange-art",read:"A trend can begin when a small community gives an idea a shared meaning, format or inside joke. Creators adapt it, platforms make it easier to discover, and audiences remix it for new contexts. Popularity does not automatically make a claim true, however. When covering a trend, look for the earliest credible source you can find, distinguish confirmed facts from speculation, and avoid presenting rumors as news."},
 {id:5,category:"Downloads & Resources",title:"How to check whether a software download is trustworthy",excerpt:"A safer download routine starts with the publisher, the official source and a few basic checks.",symbol:"↓",art:"green-art",read:"Prefer the developer's official website or a reputable app store. Check the publisher name, supported operating system, release notes and whether the download is digitally signed when applicable. Avoid installers that bundle unrelated software or demand unnecessary permissions. Keep security software active and never disable protections just to run an unfamiliar file. For open-source projects, check the project's official repository and release page."},
 {id:6,category:"Technology & AI",title:"A beginner-friendly way to plan your first personal website",excerpt:"Decide what visitors need to do, sketch the page sections, then build and test a small version.",symbol:"⌘",art:"blue-art",read:"Begin with one goal: explain a service, show a portfolio or publish articles. List the sections needed to support that goal and sketch their order before coding. Build semantic HTML first, add responsive CSS, then use JavaScript only where it improves the experience. Test keyboard navigation, contrast, mobile layouts and loading performance. Publish a small useful version, gather feedback and improve it steadily."},
 {id:7,category:"Anime & Entertainment",title:"Where to find legal anime streaming options",excerpt:"A quick guide to checking official services and regional availability before watching.",symbol:"✦",art:"",read:"Anime availability differs by country and changes as licensing agreements expire or renew. Start with licensed streaming platforms operating in your region, then search the show's official distributor or publisher pages for current viewing options. Check subtitles, dubbing and age ratings before choosing. Avoid unofficial mirrors that may carry malware, misleading download buttons or unauthorized copies."},
 {id:8,category:"Movies & Streaming",title:"What makes a useful spoiler-free review?",excerpt:"Help readers decide whether a film fits their taste without giving away its best surprises.",symbol:"✎",art:"pink-art",read:"A useful spoiler-free review gives readers enough context to decide if a film suits them. Briefly describe the premise without revealing major turns, then discuss acting, pacing, visuals, sound and tone. Explain who may enjoy it and why, while being clear about your own preferences. Avoid plot details that change how a first-time viewer experiences the story."},
 {id:9,category:"Downloads & Resources",title:"A quick guide to backing up important files",excerpt:"Combine a second copy, a separate location and occasional restore tests for more reliable backups.",symbol:"↗",art:"green-art",read:"Keep more than one copy of important files, with at least one copy separate from your main device. Cloud storage can help, while an external drive provides another option. Turn on multifactor authentication for accounts that support it, and review sharing permissions. A backup is only useful if it can be restored, so test recovery occasionally and keep sensitive files protected."}
];
const grid=document.getElementById("storyGrid");
const searchInput=document.getElementById("searchInput");
const categoryFilter=document.getElementById("categoryFilter");
const emptyState=document.getElementById("emptyState");
const dialog=document.getElementById("articleDialog");
const dialogContent=document.getElementById("dialogContent");
let showAll=false;
function renderStories(){
 const query=searchInput.value.trim().toLowerCase();
 const category=categoryFilter.value;
 const filtered=stories.filter(s=>(category==="All"||s.category===category)&&(`${s.title} ${s.excerpt} ${s.category}`).toLowerCase().includes(query));
 const visible=showAll?filtered:filtered.slice(0,6);
 grid.innerHTML=visible.map(s=>`<article class="story-card"><div class="story-art ${s.art}"><span class="art-symbol">${s.symbol}</span></div><div class="story-body"><div class="story-meta"><span class="tag">${s.category}</span> · 4 min read</div><h3>${s.title}</h3><p>${s.excerpt}</p><button class="read-link" data-read="${s.id}">Read article <span>↗</span></button></div></article>`).join("");
 emptyState.hidden=filtered.length>0;
 document.getElementById("showAllBtn").hidden=filtered.length<=6;
 document.getElementById("showAllBtn").textContent=showAll?"Show fewer stories":"Show all stories";
 grid.querySelectorAll("[data-read]").forEach(btn=>btn.addEventListener("click",()=>openArticle(Number(btn.dataset.read))));
}
function openArticle(id){
 const s=stories.find(x=>x.id===id);if(!s)return;
 dialogContent.innerHTML=`<div class="dialog-category">${s.category} · 4 min read</div><h2>${s.title}</h2><p><strong>${s.excerpt}</strong></p><p>${s.read}</p><p><em>Editorial note: This is starter content. Expand, fact-check and edit each article before publishing it as a finished post.</em></p>`;
 if(typeof dialog.showModal==="function")dialog.showModal();else alert(s.title+"\n\n"+s.read);
}
searchInput.addEventListener("input",renderStories);
categoryFilter.addEventListener("change",renderStories);
document.getElementById("showAllBtn").addEventListener("click",()=>{showAll=!showAll;renderStories()});
document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{categoryFilter.value=btn.dataset.filter;showAll=true;renderStories();document.getElementById("latest").scrollIntoView({behavior:"smooth"})}));
document.getElementById("dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
const menuToggle=document.getElementById("menuToggle"),nav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open))});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false")}));
document.getElementById("year").textContent=new Date().getFullYear();
renderStories();
