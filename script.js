// script.js

// Navbar background on scroll
window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 50);
  });
  
  // Parallax mousemove for subtle depth
  document.addEventListener('mousemove', e => {
    const layers = [
      document.getElementById('cloud1'),
      document.getElementById('cloud2'),
      document.getElementById('cloud3')
    ];
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    layers[0].style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    layers[1].style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    layers[2].style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });
  