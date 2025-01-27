
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
    smooth: true, // Enable smooth scrolling
    duration: 1.2, // Duration of the scroll
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    direction: 'vertical', // Vertical scrolling
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.img',
    scrub: true
  }
})
.to('.img', {
  stagger: .2,
  y: -700,
  scrub: true
})
// Add a scroll reveal effect
window.addEventListener('scroll', function() {
    var elements = document.querySelectorAll('.fade-in, .slide-in');
    elements.forEach(function(element) {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add a typing effect to the h1
var h1 = document.querySelector('h1');
var text = h1.textContent;
h1.textContent = '';
var i = 0;
function typeWriter() {
    if (i <= text.length) {
        h1.innerHTML = text.substring(0, i) + '<span class="blinking-underscore">_</span>';
        i++;
        setTimeout(typeWriter, 150);
    } else {
        // Keep the underscore blinking after typing is complete
        h1.innerHTML = text + '<span class="blinking-underscore">_</span>';
    }
}
typeWriter();

let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX + window.scrollX;
    cursorY = e.clientY + window.scrollY;
});



function updateCursor() {
    const cursor = document.getElementById('cursor');
    cursor.style.left = `${cursorX - cursor.offsetWidth / 2}px`;
    cursor.style.top = `${cursorY - cursor.offsetHeight / 2}px`;
    requestAnimationFrame(updateCursor);
}

requestAnimationFrame(updateCursor);

// Optional: Add hover effect on links
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        const cursor = document.getElementById('cursor');
        const rect = link.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        link.style.setProperty('--x', `${offsetX}px`);
        link.style.setProperty('--y', `${offsetY}px`);

        cursor.style.animation = 'cursorShrink 0.15s forwards'; // Apply shrink animation
    });

    link.addEventListener('mouseleave', () => {
        const cursor = document.getElementById('cursor');
        cursor.style.animation = 'cursorGrow 0.3s forwards'; // Apply grow animation
    });
});

// ScrollTrigger.create({
//     trigger: ".landing-page",    // The element to pin
//     start: "top top",            // When the top of .landing-page hits the top of the viewport
//     end: "+500",               // How long (in px) you want it pinned
//     pin: true,                   // Actually pin it in place
//     markers: true,            // For debugging
//   });

//   ScrollTrigger.create({
//     trigger: ".divider",    // The element to pin
//     start: "top top",            // When the top of .landing-page hits the top of the viewport
//     end: "+=800",               // How long (in px) you want it pinned
//     pin: true,           // Actually pin it in place
//     markers: true,            // For debugging
//   });
