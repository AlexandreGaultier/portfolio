document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Project filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Theme toggle functionality
    // Supprimez ces lignes car elles sont déjà déclarées plus haut
    // const themeToggle = document.getElementById('theme-toggle');
    // const body = document.body;

    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateThemeIcon(isDarkMode);
    });

    function updateThemeIcon(isDarkMode) {
        const icon = themeToggle.querySelector('i');
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Testimonials slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    if (prevButton && nextButton) {
        nextButton.addEventListener('click', nextTestimonial);
        prevButton.addEventListener('click', prevTestimonial);
        showTestimonial(currentTestimonial);
        // Auto-advance testimonials every 10 seconds (10000 ms)
        setInterval(nextTestimonial, 10000);
    }

    // Animations
    const animatedElements = document.querySelectorAll('.fade-in');
    const sectionTitles = document.querySelectorAll('.section-title');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    sectionTitles.forEach(title => {
        observer.observe(title);
    });

    // Scroll to top functionality
    const scrollToTopButton = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const skillLevel = skillBar.dataset.level;
                const progressBar = skillBar.querySelector('.skill-progress');
                progressBar.style.width = `${skillLevel}%`;
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(skillBar => {
        skillsObserver.observe(skillBar);
    });

    // Project search functionality
    const projectSearch = document.getElementById('project-search');

    projectSearch.addEventListener('input', () => {
        const searchTerm = projectSearch.value.toLowerCase();

        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

            if (title.includes(searchTerm) || description.includes(searchTerm) || tags.some(tag => tag.includes(searchTerm))) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const skillLinks = document.querySelectorAll('.skill-link');
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        skillLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const filter = this.getAttribute('data-filter');
                
                // Scroll to portfolio section
                document.querySelector('#portfolio').scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Simulate click on the corresponding filter button
                const correspondingFilterButton = Array.from(filterButtons).find(btn => btn.getAttribute('data-filter') === filter);
                if (correspondingFilterButton) {
                    correspondingFilterButton.click();
                }
            });
        });
    });

    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;

    function handleScroll() {
        if (window.innerWidth <= 768) {  // Vérifie si on est en mode mobile
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Scroll vers le bas
                header.classList.add('nav-hidden');
            } else {
                // Scroll vers le haut
                header.classList.remove('nav-hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        } else {
            // En mode desktop, s'assure que la navbar est toujours visible
            header.classList.remove('nav-hidden');
        }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);  // Gère également le redimensionnement

    const heroImage = document.querySelector('.hero-image img');
    const container = document.querySelector('.hero-image');

    container.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        heroImage.style.transform = `
            rotateY(${x * 20}deg)
            rotateX(${y * -20}deg)
            translateZ(20px)
        `;
    });

    container.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
    });
});
