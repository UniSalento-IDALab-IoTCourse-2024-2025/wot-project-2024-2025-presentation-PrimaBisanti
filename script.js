document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const mainHeader = document.getElementById('mainHeader');
    const scrollThreshold = 70;
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            mainHeader.classList.add('scrolled');
            document.body.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
            document.body.classList.remove('scrolled');
        }
    });

    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.dataset.slideIndex = i;
            dotsContainer.appendChild(dot);

            dot.addEventListener('click', () => {
                currentSlide = i;
                showSlide(currentSlide);
            });
        }
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });

        if (slides[index]) {
            slides[index].style.display = 'block';
            slides[index].classList.add('active');
        }

        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

   function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    if (slides.length > 0) {
        createDots();
        showSlide(currentSlide);
    }

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburgerMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerMenu.querySelector('i').classList.remove('fa-times');
                hamburgerMenu.querySelector('i').classList.add('fa-bars');
            });
        });
    }
});