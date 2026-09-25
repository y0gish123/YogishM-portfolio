/**
 * Portfolio Interactive Script
 * Assignment 1 - Web Development Practice
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Check saved theme in localStorage
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        if (theme === 'light') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // 3. Header Scroll Shadow
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Scroll Active Link Highlight (IntersectionObserver)
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // 5. Contact Form Validation & Interactive Feedback
    const contactForm = document.getElementById('contact-form');
    const formAlert = document.getElementById('form-alert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;

            const nameInput = document.getElementById('user-name');
            const emailInput = document.getElementById('user-email');
            const subjectInput = document.getElementById('user-subject');
            const messageInput = document.getElementById('user-message');

            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const subjectError = document.getElementById('subject-error');
            const messageError = document.getElementById('message-error');

            // Reset errors
            [nameInput, emailInput, subjectInput, messageInput].forEach(input => input.classList.remove('invalid'));
            [nameError, emailError, subjectError, messageError].forEach(err => err.classList.remove('visible'));

            // Name Validation
            if (!nameInput.value.trim()) {
                nameInput.classList.add('invalid');
                nameError.classList.add('visible');
                isValid = false;
            }

            // Email Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('invalid');
                emailError.classList.add('visible');
                isValid = false;
            }

            // Subject Validation
            if (!subjectInput.value.trim()) {
                subjectInput.classList.add('invalid');
                subjectError.classList.add('visible');
                isValid = false;
            }

            // Message Validation
            if (!messageInput.value.trim()) {
                messageInput.classList.add('invalid');
                messageError.classList.add('visible');
                isValid = false;
            }

            if (isValid) {
                // Show success alert & reset form
                contactForm.style.display = 'none';
                formAlert.style.display = 'flex';
                
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formAlert.style.display = 'none';
                }, 5000);
            }
        });
    }

    // 6. Animate Progress Bars on Scroll
    const skillsSection = document.getElementById('skills');
    const progressFills = document.querySelectorAll('.progress-bar-fill');

    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressFills.forEach(fill => {
                        const targetWidth = fill.style.width;
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = targetWidth;
                        }, 100);
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillsObserver.observe(skillsSection);
    }
});
