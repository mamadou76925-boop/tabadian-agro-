const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const WA="221787574117";
const hd=$("#top"),bg=$(".burger"),mn=$(".menu");
if(bg&&mn){
  bg.onclick=()=>bg.setAttribute("aria-expanded",mn.classList.toggle("ouvert"));
  $$(".menu a").forEach(a=>a.addEventListener("click",()=>{mn.classList.remove("ouvert");bg.setAttribute("aria-expanded","false")}));
}
// Photo absente : on retire le bloc proprement, sans texte de remplacement visible
$$("img[data-remplacable]").forEach(img=>img.addEventListener("error",()=>{
  const bloc=img.closest(".portrait")||img;const parent=bloc.parentElement;
  bloc.remove();if(parent)parent.classList.add("sans-photo")
}));
const lb=$(".lb"),vs=$$(".mosaique button");
if(lb&&vs.length){
  const im=lb.querySelector("img");let k=0;
  const af=i=>{k=(i+vs.length)%vs.length;const g=vs[k].querySelector("img");im.src=g.src;im.alt=g.alt};
  const fm=()=>lb.classList.remove("actif");
  vs.forEach((b,i)=>b.onclick=()=>{af(i);lb.classList.add("actif")});
  lb.querySelector(".x").onclick=fm;lb.querySelector(".p").onclick=()=>af(k-1);lb.querySelector(".s").onclick=()=>af(k+1);
  lb.onclick=e=>{if(e.target===lb)fm()};
  addEventListener("keydown",e=>{if(!lb.classList.contains("actif"))return;if(e.key==="Escape")fm();if(e.key==="ArrowLeft")af(k-1);if(e.key==="ArrowRight")af(k+1)});
}
const fc=$("#form-cmd");
if(fc){
  const rc=()=>{$("#recap").textContent=`Commande : ${$("#qte").value||0} ${$("#unite").value} · ${$("#produit").value} · ${$("#mode").value}`};
  const p=new URLSearchParams(location.search).get("produit");
  if(p&&[...$("#produit").options].some(o=>o.value===p))$("#produit").value=p;
  $$("[data-produit]").forEach(a=>a.addEventListener("click",()=>{$("#produit").value=a.dataset.produit;rc()}));
  ["produit","qte","unite","mode"].forEach(i=>$("#"+i).addEventListener("input",rc));rc();
  fc.addEventListener("submit",e=>{
    e.preventDefault();let ok=true;
    const r={nom:v=>v.trim().length>=2||"Entrez votre nom (2 lettres minimum).",tel:v=>/^[+\d\s]{8,16}$/.test(v.trim())||"Entrez un numéro valide (ex. 77 123 45 67)."};
    Object.keys(r).forEach(n=>{const x=r[n]($("#"+n).value);$(`[data-e="${n}"]`).textContent=x===true?"":x;if(x!==true)ok=false});
    if(!ok)return;
    if(!(+$("#qte").value>0)){$("#qte").focus();return}
    const t=`Bonjour, je suis ${$("#nom").value}. Je souhaite commander : ${$("#qte").value} ${$("#unite").value} de ${$("#produit").value.toLowerCase()} (${$("#mode").value.toLowerCase()}). ${$("#msg").value} Tél : ${$("#tel").value}`;
    open(`https://wa.me/${WA}?text=`+encodeURIComponent(t),"_blank","noopener");
  });
}
const fk=$("#form-contact");
if(fk){
  fk.addEventListener("submit",e=>{
    e.preventDefault();let ok=true;
    const r={nom:v=>v.trim().length>=2||"Entrez votre nom (2 lettres minimum).",telephone:v=>/^[+\d\s]{8,16}$/.test(v.trim())||"Entrez un numéro valide (ex. 77 123 45 67).",message:v=>v.trim().length>=10||"Écrivez un message (10 caractères minimum)."};
    Object.keys(r).forEach(n=>{const x=r[n](fk.elements[n].value);fk.querySelector(`[data-erreur="${n}"]`).textContent=x===true?"":x;if(x!==true)ok=false});
    if(!ok)return;
    const t=`Bonjour, je suis ${fk.nom.value}. ${fk.message.value} (Tél : ${fk.telephone.value})`;
    $("#lien-wa-envoi").href=`https://wa.me/${WA}?text=`+encodeURIComponent(t);
    $(".succes").classList.add("visible");
    fk.reset();
  });
}
