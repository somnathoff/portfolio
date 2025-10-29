// ===== TYPING ANIMATION =====
const typed = new Typed('.typedText', {
    strings: ['SOMNATH','Turning problems into tech solutions'],
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
    loop: true
});

// ===== MOUSE CURSOR EMOJI =====
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor-emoji');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
    }
});

document.addEventListener('mouseleave', () => {
    const cursor = document.getElementById('cursor-emoji');
    if (cursor) {
        cursor.style.opacity = '0';
    }
});

document.addEventListener('mouseenter', () => {
    const cursor = document.getElementById('cursor-emoji');
    if (cursor) {
        cursor.style.opacity = '1';
    }
});

// ===== MOBILE MENU TOGGLE =====
function toggleMenu() {
    const navMenu = document.getElementById('myNavMenu');
    const menuIcon = document.querySelector('.nav-menu-btn i');
    
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuIcon.classList.remove('uil-times');
        menuIcon.classList.add('uil-bars');
        document.body.style.overflow = 'auto';
    } else {
        navMenu.classList.add('active');
        menuIcon.classList.remove('uil-bars');
        menuIcon.classList.add('uil-times');
        document.body.style.overflow = 'hidden';
    }
}

// ===== CLOSE MOBILE MENU WHEN CLICKING OUTSIDE =====
document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('myNavMenu');
    const menuBtn = document.querySelector('.nav-menu-btn');
    
    if (navMenu && menuBtn && 
        !navMenu.contains(e.target) && 
        !menuBtn.contains(e.target) && 
        navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active-link');
                });
                activeLink.classList.add('active-link');
            }
        }
    });
});

// ===== SKILLS TOGGLE FUNCTIONALITY =====
function setupSkillsToggle() {
    const toggleBtns = document.querySelectorAll('[data-toggle-btn]');
    const skillsList = document.querySelector('.skills-list');
    const toolsList = document.querySelector('.tools-list');
    const toggleBox = document.querySelector('[data-toggle-box]');

    if (!toggleBox || toggleBtns.length === 0 || !skillsList || !toolsList) {
        console.warn('Skills toggle elements not found');
        return;
    }

    skillsList.style.display = 'flex';
    toolsList.style.display = 'none';
    skillsList.classList.add('active');
    toolsList.classList.remove('active');
    toggleBtns[0].classList.add('active');

    moveToggleBackground(toggleBox, 0);

    toggleBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            toggleBtns.forEach(toggleBtn => {
                toggleBtn.classList.remove('active');
            });
            
            btn.classList.add('active');
            
            const buttonText = btn.textContent.toLowerCase().trim();
            
            if (buttonText.includes('skills')) {
                skillsList.style.display = 'flex';
                toolsList.style.display = 'none';
                skillsList.classList.add('active');
                toolsList.classList.remove('active');
                
                moveToggleBackground(toggleBox, 0);
            } else if (buttonText.includes('tools')) {
                skillsList.style.display = 'none';
                toolsList.style.display = 'flex';
                skillsList.classList.remove('active');
                toolsList.classList.add('active');
                
                moveToggleBackground(toggleBox, 1);
            }
        });
    });
}

function moveToggleBackground(toggleBox, buttonIndex) {
    const toggleBtns = toggleBox.querySelectorAll('[data-toggle-btn]');
    if (toggleBtns.length === 0) return;
    
    const buttonWidth = toggleBtns[0].offsetWidth;
    const translateX = buttonIndex * buttonWidth;
    
    const styleId = 'toggle-background-style';
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = `
        .skills-toggle::before {
            transform: translateX(${translateX}px) !important;
            width: ${buttonWidth}px !important;
        }
    `;
}

// ===== TOOLTIP FUNCTIONALITY =====
function setupTooltips() {
    const skillsCards = document.querySelectorAll('.skills-card');
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    skillsCards.forEach((card) => {
        const tooltip = card.querySelector('.tooltip');
        
        if (!tooltip) return;
        
        if (isTouchDevice) {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                skillsCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('tooltip-active');
                    }
                });
                
                card.classList.toggle('tooltip-active');
            });
        } else {
            card.addEventListener('mouseenter', () => {
                skillsCards.forEach(otherCard => {
                    otherCard.classList.remove('tooltip-active');
                });
                
                card.classList.add('tooltip-active');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('tooltip-active');
            });
        }
    });
    
    if (isTouchDevice) {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.skills-card')) {
                skillsCards.forEach(card => {
                    card.classList.remove('tooltip-active');
                });
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            skillsCards.forEach(card => {
                card.classList.remove('tooltip-active');
            });
        }
    });
}

// ===== DOWNLOAD BUTTON FUNCTIONALITY =====
function setupDownloadButton() {
    const downloadBtn = document.getElementById('downloadCvBtn');
    
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        downloadBtn.classList.add('downloading');
        
        const originalHref = downloadBtn.href;
        
        setTimeout(() => {
            downloadBtn.classList.remove('downloading');
            downloadBtn.classList.add('success');
            
            setTimeout(() => {
                window.location.href = originalHref;
                
                setTimeout(() => {
                    downloadBtn.classList.remove('success');
                }, 2000);
            }, 1000);
        }, 1500);
    });
}

// ===== CERTIFICATIONS SLIDER =====
function setupCertificationsSlider() {
    const track = document.getElementById('certificationsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!track) return;
    
    const certifications = [
        {
            title: "23rd ISTE Adhiyamaan College of Engineering",
            image: "https://iili.io/KPSKu6J.jpg"
        },
        {
            title: "ASTHRA 2K24 KSR College of Engineering",
            image: "https://iili.io/KPS2cu9.jpg"
        },
        {
            title: "Business Plan Competition Mahendra Institute of Technology",
            image: "https://iili.io/KPSCKV1.jpg"
        },
        {
            title: "State Level Coding Hackathon’25 Velammal College of Engineering and Technology",
            image: "https://iili.io/KPSxmXV.jpg"
        },
        {
            title: "Diagnosis for Diabetic Retinopathy using Quick Convolutional Diagnosis",
            image: "https://iili.io/KP8yLJ9.jpg"
        },
        {
            title: "Mastering Figma Beginner to Expert UI/UX Design GUVI",
            image: "https://iili.io/KPSYcgV.jpg"
        },
        {
            title: "LOYONOVATE 2K25 Loyola College of Arts & Science",
            image: "https://iili.io/KPS0LMu.jpg"
        },
        {
            title: "Internship on Java",
            image: "https://iili.io/KPShe2e.jpg"
        }
    ];
    
    function buildSlides() {
        track.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        certifications.forEach((cert, index) => {
            const slide = document.createElement('div');
            slide.className = 'certification-slide';
            slide.innerHTML = `
                <div class="certification-card">
                    <div class="certification-image">
                        <img src="${cert.image}" alt="${cert.title}" loading="lazy">
                        <div class="image-overlay">
                            <i class="uil uil-award"></i>
                        </div>
                    </div>
                    <div class="certification-content">
                        <div class="certification-header">
                            <h3 class="certification-title">${cert.title}</h3>
                        </div>
                    </div>
                </div>
            `;
            track.appendChild(slide);
            
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    buildSlides();
    
    const totalSlides = certifications.length;
    if (totalSlides === 0) return;
    
    let currentSlide = 0;
    let autoSlideInterval;
    const autoSlideDelay = 5000;
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetAutoSlide();
    }
    
    function updateSlider() {
        const translateX = -(currentSlide * 100);
        track.style.transform = `translateX(${translateX}%)`;
        
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        if (prevBtn) prevBtn.disabled = false;
        if (nextBtn) nextBtn.disabled = false;
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
        resetAutoSlide();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
        resetAutoSlide();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, autoSlideDelay);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    const sliderContainer = track.closest('.certifications-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, { passive: true });
    
    function handleSwipe() {
        const minSwipeDistance = 50;
        
        if (touchEndX < touchStartX - minSwipeDistance) {
            nextSlide();
        }
        
        if (touchEndX > touchStartX + minSwipeDistance) {
            prevSlide();
        }
    }
    
    updateSlider();
    startAutoSlide();
}

// ===== SCROLL REVEAL ANIMATIONS =====
function setupScrollReveal() {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 2000,
            reset: false,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        sr.reveal('.featured-text-card', { delay: 100 });
        sr.reveal('.featured-name', { delay: 200 });
        sr.reveal('.featured-text-info', { delay: 300 });
        sr.reveal('.featured-text-btn', { delay: 400 });
        sr.reveal('.social_icons', { delay: 500 });
        sr.reveal('.featured-image', { delay: 600 });
        
        sr.reveal('.about-img', { delay: 100 });
        sr.reveal('.about-info', { delay: 300 });
        
        sr.reveal('.skills-content', { delay: 100 });
        sr.reveal('.skills-box', { delay: 300 });
        
        sr.reveal('.timeline-item', { interval: 200 });
        
        sr.reveal('.certifications-slider', { delay: 100 });
        
        sr.reveal('.cards_item', { interval: 200, origin: 'bottom' });
        
        sr.reveal('.contact-info', { delay: 100 });
        sr.reveal('.form-control', { delay: 300 });
    }
}

// ===== FORM SUBMISSION HANDLER =====
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const resultDiv = document.getElementById('result');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... <i class="uil uil-spinner uil-spin"></i>';
            }
            
            const formData = new FormData(this);
            
            setTimeout(() => {
                if (resultDiv) {
                    resultDiv.textContent = 'Message sent successfully!';
                    resultDiv.className = 'form-result success';
                    resultDiv.style.display = 'block';
                }
                
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message <i class="uil uil-message"></i>';
                }
                
                contactForm.reset();
                
                setTimeout(() => {
                    if (resultDiv) {
                        resultDiv.style.display = 'none';
                    }
                }, 5000);
            }, 2000);
        });
    }
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                const navMenu = document.getElementById('myNavMenu');
                if (navMenu && navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    });
}

// ===== STICKY NAVIGATION =====
function setupStickyNavigation() {
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.featured-text, .about-info, .skills-card, .timeline-item, .cards_item');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== INITIALIZE ALL FUNCTIONALITIES =====
document.addEventListener('DOMContentLoaded', function() {
    setupSkillsToggle();
    setupTooltips();
    setupDownloadButton();
    setupCertificationsSlider();
    setupScrollReveal();
    setupContactForm();
    setupSmoothScrolling();
    setupStickyNavigation();
    setupIntersectionObserver();
    
    console.log('Portfolio JavaScript loaded successfully!');
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

window.addEventListener('scroll', debounce(() => {
    // Scroll handling
}, 10));

window.addEventListener('resize', throttle(() => {
    // Resize handling
}, 250));