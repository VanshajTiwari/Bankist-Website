'use strict';

const head=document.querySelector(".header");
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const jumpto=document.querySelector("#section--1");
const loader=document.querySelector("#preloader");
window.addEventListener('load',function(){
  document.querySelector("body").style.overflow="hidden";
  console.log("hello");
  setTimeout(function(){loader.style.display="none";document.querySelector("body").style.overflow="scroll";},3000);
})
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(element => {
  element.addEventListener('click',openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const mssg=document.createElement("div");
mssg.innerHTML="<p>This is container created to display Cookie</p><br><button class='btn btn--close-cookie'>Confirm</button>";
mssg.classList.add("cookie-message");
head.append(mssg);
const btnCloseCookie=document.querySelector('.btn--close-cookie');
//console.log(btnCloseCookie);
btnCloseCookie.addEventListener('click',function(){mssg.remove();});

///pratice

mssg.style.height=Number.parseInt(getComputedStyle(mssg).height)+50+"px";
const logoinfo=document.querySelector(".nav__logo");

//
//Smooth Scrolling


//work
const scrollingTo=document.querySelector(".btn--scroll-to");
scrollingTo.addEventListener('click',function(){
  console.log("clicked");
  
 // console.log(jumpto);
  //console.log(jumpto.getBoundingClientRect());

  //Method1 to Scroll
 // window.scrollTo(jumpto.left+window.pageXOffset,jumpto.top+window.pageYOffset,"smooth");
/* 


  Method2 to Scroll
window.scrollTo({
  left:window.pageXOffset+jumpto.left,
  top:window.pageYOffset+jumpto.top,
  behavior:"smooth"
}
 )*/
 //Method 3 To Scroll
 jumpto.scrollIntoView({behavior:'smooth'});
});
//page Navigation
//Method1
/*
document.querySelectorAll(".nav__link").forEach(function(ele){
ele.addEventListener('click',function(e){
  e.preventDefault();
  const gref=this.getAttribute("href");
 // console.log(gref);
  const scrollinTo=document.querySelector(gref).getBoundingClientRect();
 // console.log(scrollinTo);
  window.scrollTo({
    left:window.pageXOffset+scrollinTo.left,
    top:window.pageYOffset+scrollinTo.top,
    behavior:'smooth'
  })
})
});
*/
document.querySelector(".nav__links").addEventListener('click',(e)=>{
  e.preventDefault();
 // console.log(e.target);

  if(e.target.classList.contains('nav__link')){
    const veri=e.target.getAttribute('href');
   // console.log(veri);
        document.querySelector(veri).scrollIntoView({behavior:'smooth'});
  }
})
// console.log(btnCloseCookie.closest('body').style.backgroundColor='black');

const tabs=document.querySelectorAll('.operations__tab');
const tabContainer=document.querySelector('.operations__tab-container');
const tabscontent=document.querySelectorAll('.operations__content');

//tabs.forEach(ele=>ele.addEventListener('click',()=>console.log('Tab')));
tabContainer.addEventListener('click',function(e){
  const vari= e.target.closest('.operations__tab');
 // console.log(vari);
  if(!vari)return;
  tabs.forEach(echbtn=>echbtn.classList.remove('operations__tab--active'));
  vari.classList.add('operations__tab--active');
  tabscontent.forEach(ele=>ele.classList.remove('operations__content--active'));
  const valu=vari.getAttribute('data-tab');
 const content=document.querySelector(`.operations__content--${valu}`);
 content.classList.add('operations__content--active');
// console.log(content);
})
function hander(e,opacity){
  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    const siblings=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');
    siblings.forEach(el=>{
      if(el!==link) el.style.opacity=opacity;
    });
    logo.style.opacity=opacity;
  }
}
const navVar=document.querySelector(".nav");
navVar.addEventListener('mouseover',function(e){
 // console.log(e.target);
  hander(e,0.5);
})
navVar.addEventListener('mouseout',function(e){
  hander(e,1);
})
//sticky Navigation;
//                                     METHOD 1
// const scrollVar=jumpto.getBoundingClientRect();
// window.addEventListener('scroll',function(e){
//   if(scrollVar.top<window.scrollY){
//     console.log("here");
//     navVar.classList.add('sticky');
//   }
//   else{
//     navVar.classList.remove('sticky');
//   }
// });
//                                    METHOD 2(MOre Efficient Method)
const ObsCall=function(entries,observerHeader){
      entries.forEach(ele=>{
       if(!ele.isIntersecting){
          navVar.classList.add('sticky');
          
        }
        else
        navVar.classList.remove('sticky');
      })
}
const ObsOps={
  root:null,
  threshold:0
}
const observerHeader=new IntersectionObserver(ObsCall,ObsOps);
observerHeader.observe(head);
//                                                            Reveal On  Scroll
///
const reveealCall=function(entries,reobserv){
        entries.forEach(elem=>{
        
           if(!elem.isIntersecting){return}

               elem.target.classList.remove('section--hidden');
           
           
        })
};
const options={
  root:null,
  threshold:0.1
};
const reobserv=new IntersectionObserver(reveealCall,options);
const sectionssss=document.querySelectorAll('.section');
console.log(sectionssss);
sectionssss.forEach(ele=>{
  ele.classList.add('section--hidden');
  reobserv.observe(ele);
})


//                  LAZY LOADING
//const imgLoader=new IntersectionObserver();
const caller=function(entries,imagese){
    entries.forEach(elem=>{
      if(elem.isIntersecting){
        elem.target.src=elem.target.getAttribute("data-src");
        elem.target.addEventListener('load',()=>{ elem.target.classList.remove('lazy-img')})}
      })
      }
const imgLoader=new IntersectionObserver(caller,{root:null,threshold:0.1});
const imagese=document.querySelectorAll("img[data-src]");
imagese.forEach(ele=>{imgLoader.observe(ele);})


//Sliders
const rightbtn=document.querySelector('.slider__btn--right');
const leftbtn=document.querySelector('.slider__btn--left');
const slidesParent=document.querySelector(".slider");
const slides=document.querySelectorAll('.slide');
let moverslide=0;

//console.log(slides[0].style.transform='translateX()');
for(let i=0;i<3;i++){
  let xdist=100;
 // console.log(xdist*i+"px");
// slides[i].style.fontSize="10000px";
  slidesParent.style.overflow="hidden";
  slides[i].style.transform="translateX("+xdist*i+"rem) ";
  
}
rightbtn.addEventListener('click',function(){
  moverslide++;
  for(let i=0;i<slides.length;i++){
    slides[i].style.transform="translateX("+((i-moverslide)*100)%(slides.length*100)+"%)";
   
    if(moverslide===slides.length)
      moverslide=0;
  }
  });
  leftbtn.addEventListener('click',function(){
    moverslide--;
    for(let i=0;i<slides.length;i++){
      slides[i].style.transform="translateX("+((i-moverslide)*100)%(slides.length*100)+"%)";

      if(moverslide===(-1)*slides.length)
        moverslide=0;
    }
    });

