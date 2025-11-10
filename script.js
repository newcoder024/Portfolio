// Import fancyapps library
// import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";

// fade in on scroll
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id; // id van section
        const linkItem = document.querySelector(`a[href="#${id}"]`); // link in header

        console.log(entry);
        if (entry.isIntersecting) { // als section in beeld is
          // document.querySelectorAll("nav li").forEach((li) => { // basis = linkunactive
          //   li.classList.remove("link-active");
          //   li.classList.add("link-unactive");
          // })
          
          // if (linkItem){ // als er een linkItem is
          //   linkItem.parentElement.classList.add("link-active");
          //   linkItem.parentElement.classList.remove("link-unactive");
          // }

          // Using a library instead of js, took too much power and was glitching

        entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
      });
    });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});

// custom muis
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  let x = e.clientX;
  let y = e.clientY;
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
});

// verander cursor op hover en klik
document.addEventListener("mousedown", (e) => cursor.classList.add("click"));
document.addEventListener("mouseup", (e) => cursor.classList.remove("click"));

// verander cursor op hover
const hoverElements = document.querySelectorAll('a, button, li');
hoverElements.forEach( el =>{
  el.addEventListener("mouseover", (e) => cursor.classList.add("hover"));
  el.addEventListener("mouseleave", (e) => cursor.classList.remove("hover"));

})


/* open sidebar */
function openSidebar() {
  document.getElementById("sidebar").classList.add("open");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
}

document.addEventListener("click", function (e) {
  if (e.target.matches(".sidebar a")) {
    closeSidebar();
  }
});


// TRANSLATION FUNCTION EN-NL
async function setLanguage(lang) {
  const res = await fetch(`lang/${lang}.json`);
  const translations = await res.json();
  localStorage.setItem('lang', lang);

  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (translations[key]) el.innerHTML = translations[key];

  });

  // update language buttons
  const buttons = document.querySelectorAll('.translate button');
  buttons.forEach(btn => {
    if (btn.getAttribute('onclick').includes(lang)) {
      btn.style.display = 'none';     // verberg de actieve taal
    } else {
      btn.style.display = 'inline-block'; // toon de andere
    }
    
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'en';
  setLanguage(savedLang);
});