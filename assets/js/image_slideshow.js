// js/slideshow.js
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevArrow = document.querySelector('.prev-arrow');
  const nextArrow = document.querySelector('.next-arrow');
  const slidesContainer = document.querySelector('.slides');
  let currentIndex = 0;
  let autoSlideInterval;
  const slideCount = slides.length;
  
  function showSlide(index) {
    if (index >= slideCount) index = 0;
    else if (index < 0) index = slideCount - 1;
    
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
  }
  
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);
  }
  
  function nextSlide() {
    showSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    showSlide(currentIndex - 1);
  }
  
  nextArrow.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });
  
  prevArrow.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      resetAutoSlide();
    });
  });
  
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  
  startAutoSlide();
  
  slidesContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });
  
  slidesContainer.addEventListener('mouseleave', () => {
    startAutoSlide();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoSlide();
    }
  });
});
