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
            title:"Innovation Council Ambassador",
            image:"https://iili.io/KiE3f3X.jpg"
        },
        {
            title: "23rd ISTE ",
            image: "https://iili.io/KPSKu6J.jpg"
        },
        {
            title: "ASTHRA 2K24",
            image: "https://iili.io/KPS2cu9.jpg"
        },
        {
            title: "Business Plan",
            image: "https://iili.io/KPSCKV1.jpg"
        },
        {
            title: "State Level Coding Hackathon",
            image: "https://iili.io/KPSxmXV.jpg"
        },
        {
            title: "ICAMT 2024",
            image: "https://iili.io/KP8yLJ9.jpg"
        },
        {
            title: "Expert UI/UX",
            image: "https://iili.io/KPSYcgV.jpg"
        },
        {
            title: "LOYONOVATE 2K25",
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
    const autoSlideDelay = 9000;
    
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
        
        sr.reveal('.contact-info', { delay: 100 });
        sr.reveal('.form-control', { delay: 300 });
    }
}

// ===== FORM SUBMISSION HANDLER =====
function setupContactForm() {
    const contactForm = document.querySelector('.form-control');
    const submitBtn = document.querySelector('.form-button .btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... <i class="uil uil-spinner uil-spin"></i>';
            }
            
            const formData = new FormData(this);
            
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message <i class="uil uil-message"></i>';
                }
                
                contactForm.reset();
                
                alert('Message sent successfully!');
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

    const animateElements = document.querySelectorAll('.featured-text, .about-info, .skills-card, .timeline-item, .certification-card');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== CHAT BOT FUNCTIONALITY =====
function setupChatBot() {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatBody = document.getElementById('chatBody');
    const chatStatus = document.getElementById('chatStatus');

    if (!chatMessages || !chatInput || !sendBtn) return;

    // Create audio element for message sound
    const messageSound = new Audio('images/sent.mp3');
    messageSound.preload = 'auto';
    
    // Chat responses database
    const responses = {
        intro: {
            text: `Hello there! 👋<br><br>I'm <strong>Somnath</strong>, a Computer Science Engineering student passionate about technology and innovation.<br><br>I love building solutions that solve real-world problems!<br><br>Type <strong>'help'</strong> to see what you can ask me about.`,
            delay: 1500
        },
        help: {
            text: `Here's what you can ask me:<br><br>
                📚 <strong>'education'</strong> - My educational background<br>
                💻 <strong>'skills'</strong> - My technical skills<br>
                🚀 <strong>'projects'</strong> - My recent projects<br>
                🏆 <strong>'certifications'</strong> - My achievements<br>
                📧 <strong>'contact'</strong> - Ways to reach me<br>
                📄 <strong>'resume'</strong> - Download my resume<br>
                ℹ️ <strong>'about'</strong> - About this portfolio<br>
                🗑️ <strong>'clear'</strong> - Clear chat history`,
            delay: 1500
        },
        education: {
            text: `🎓 <strong>My Education</strong><br><br>
                <strong>Bachelor of Engineering - Computer Science</strong><br>
                Mahendra Institute of Technology (2023 - 2027)<br><br>
                <strong>School Education</strong><br>
                Kendriya Vidyalaya Sangathan (2011 - 2023)<br><br>
                My journey has been about learning, growing, and turning ideas into reality! 🌟`,
            delay: 2000
        },
        skills: {
            text: `💻 <strong>My Skills</strong><br><br>
                <strong>Web Development:</strong> HTML, CSS, JavaScript, Bootstrap, Django<br>
                <strong>Programming:</strong> Python, Java<br>
                <strong>Data Science:</strong> NumPy, Pandas, Matplotlib, Seaborn<br>
                <strong>Machine Learning:</strong> Scikit-learn, PyTorch, TensorFlow<br>
                <strong>Databases:</strong> MySQL, PostgreSQL, MongoDB<br>
                <strong>Tools:</strong> Git, Docker, Figma<br><br>
                I'm always learning and exploring new technologies! 🚀`,
            delay: 2000
        },
        projects: {
            text: `🚀 <strong>Featured Projects</strong><br><br>Check out some of my work:`,
            delay: 1500,
            extra: [
                {
                    type: 'project',
                    title: 'AI-Powered Web App',
                    description: 'Built a full-stack web application with machine learning integration',
                    tags: ['Python', 'Django', 'TensorFlow', 'PostgreSQL']
                },
                {
                    type: 'project',
                    title: 'Data Analytics Dashboard',
                    description: 'Interactive dashboard for visualizing complex datasets',
                    tags: ['JavaScript', 'D3.js', 'MongoDB', 'React']
                },
                {
                    type: 'project',
                    title: 'Mobile Application',
                    description: 'Cross-platform mobile app with real-time features',
                    tags: ['React Native', 'Firebase', 'Node.js']
                }
            ]
        },
        certifications: {
            text: `🏆 <strong>My Certifications</strong><br><br>
                ✅ Innovation Council Ambassador<br>
                ✅ ISTE 23rd Conference Participant<br>
                ✅ ASTHRA 2K24 Winner<br>
                ✅ State Level Coding Hackathon<br>
                ✅ ICAMT 2024 Participant<br>
                ✅ Expert UI/UX Designer<br>
                ✅ Java Internship Certificate<br><br>
                View all certifications in the certifications section! 📜`,
            delay: 2000
        },
        contact: {
            text: `📧 <strong>Let's Connect!</strong><br><br>Feel free to reach out:`,
            delay: 1500,
            extra: [
                {
                    type: 'contact',
                    items: [
                        { icon: 'uil-envelope', text: 'somnathpoff@gmail.com', link: 'mailto:somnathpoff@gmail.com' },
                        { icon: 'uil-linkedin', text: 'LinkedIn Profile', link: 'https://www.linkedin.com/in/somnath-p-2630092a1' },
                        { icon: 'uil-github', text: 'GitHub: SOMU3103', link: 'https://github.com/SOMU3103' },
                        { icon: 'uil-instagram', text: 'Instagram: s.o.m.u3103', link: 'https://www.instagram.com/s.o.m.u3103' }
                    ]
                }
            ]
        },
        resume: {
            text: `📄 <strong>My Resume</strong><br><br>Click the link below to download my resume:<br><br><a href="resume/SOMNATH.docx" download>📥 Download Resume</a><br><br>Or visit the About section for more details!`,
            delay: 1500
        },
        about: {
            text: `ℹ️ <strong>About This Portfolio</strong><br><br>
                This interactive chat portfolio is built with:<br>
                ✨ HTML, CSS, JavaScript<br>
                🎨 Custom WhatsApp-inspired UI<br>
                🚀 Smooth animations & interactions<br><br>
                Designed and developed by <strong>Somnath</strong> with ❤️`,
            delay: 2000
        },
        default: {
            text: `I didn't quite catch that! 😅<br><br>Try typing <strong>'help'</strong> to see what I can help you with.`,
            delay: 1500
        }
    };

    // Initialize chat with intro message
    setTimeout(() => {
        addBotMessage(responses.intro.text);
    }, 1000);

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addUserMessage(message);
        chatInput.value = '';

        // Play message sound
        playMessageSound();

        // Show typing indicator
        showTyping();

        // Get response
        const key = message.toLowerCase().trim();
        const response = responses[key] || responses.default;

        setTimeout(() => {
            hideTyping();
            addBotMessage(response.text);

            // Play message sound for bot response
            playMessageSound();

            // Add extra content if available
            if (response.extra) {
                setTimeout(() => {
                    response.extra.forEach((item, index) => {
                        setTimeout(() => {
                            if (item.type === 'project') {
                                addProjectCard(item);
                            } else if (item.type === 'contact') {
                                addContactList(item.items);
                            }
                            // Play sound for each extra message
                            playMessageSound();
                        }, index * 300);
                    });
                }, 500);
            }

            // Handle clear command
            if (key === 'clear') {
                setTimeout(() => {
                    clearChat();
                }, 500);
            }
        }, response.delay);
    }

    // Play message sound
    function playMessageSound() {
        try {
            messageSound.currentTime = 0;
            messageSound.play().catch(e => {
                console.log('Audio play failed:', e);
            });
        } catch (error) {
            console.log('Sound error:', error);
        }
    }

    // Add user message
    function addUserMessage(text) {
        const li = document.createElement('li');
        li.className = 'chat-message sent';
        li.innerHTML = `
            <div class="message-bubble sent">
                <div class="message-text">${text}</div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        `;
        chatMessages.appendChild(li);
        scrollToBottom();
    }

    // Add bot message
    function addBotMessage(text) {
        const li = document.createElement('li');
        li.className = 'chat-message received';
        li.innerHTML = `
            <div class="message-bubble received">
                <div class="message-text">${text}</div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        `;
        chatMessages.appendChild(li);
        scrollToBottom();
    }

    // Add project card
    function addProjectCard(project) {
        const li = document.createElement('li');
        li.className = 'chat-message received';
        const tagsHTML = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        li.innerHTML = `
            <div class="message-bubble received">
                <div class="project-card">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <div class="project-tags">${tagsHTML}</div>
                </div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        `;
        chatMessages.appendChild(li);
        scrollToBottom();
    }

    // Add contact list
    function addContactList(items) {
        const li = document.createElement('li');
        li.className = 'chat-message received';
        const contactHTML = items.map(item => `
            <div class="contact-item">
                <i class="uil ${item.icon}"></i>
                <a href="${item.link}" target="_blank">${item.text}</a>
            </div>
        `).join('');
        li.innerHTML = `
            <div class="message-bubble received">
                <div class="contact-list">${contactHTML}</div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        `;
        chatMessages.appendChild(li);
        scrollToBottom();
    }

    // Show typing indicator
    function showTyping() {
        chatStatus.textContent = 'typing...';
        const li = document.createElement('li');
        li.className = 'chat-message received';
        li.id = 'typingIndicator';
        li.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatMessages.appendChild(li);
        scrollToBottom();
    }

    // Hide typing indicator
    function hideTyping() {
        chatStatus.textContent = 'online';
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Clear chat
    function clearChat() {
        chatMessages.innerHTML = '';
        setTimeout(() => {
            addBotMessage(responses.intro.text);
        }, 500);
    }

    // Get current time
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }

    // Scroll to bottom
    function scrollToBottom() {
        setTimeout(() => {
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 100);
    }

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Profile picture click effect
    const chatDP = document.getElementById('chatDP');
    if (chatDP) {
        chatDP.addEventListener('click', () => {
            addBotMessage(`👋 That's me! Feel free to ask anything about my work and experience.`);
            playMessageSound();
        });
    }
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
    setupChatBot();
    
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