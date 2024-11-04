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

    // Modal functionality
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');

    // Données supplémentaires pour chaque projet
    const projectDetails = {
        'crypts-of-chaos': {
            description: 'Crypts of Chaos est un jeu de rôle roguelike développé en Vue.js 3, où les joueurs explorent des donjons générés de manière procédurale. Le joueur incarne un héros parmi plusieurs classes disponibles (Guerrier, Mage, Voleur...) et progresse à travers différents étages du donjon en affrontant des monstres, en évitant des pièges et en négociant avec des marchands. Le jeu propose un système de combat au tour par tour stratégique, une gestion des ressources (or, points de vie, rations) et une génération aléatoire des salles pour une rejouabilité maximale. Développé avec Vue.js 3, Vuex et Vue Router, le projet met l\'accent sur une expérience utilisateur fluide et une ambiance dark fantasy immersive, soutenue par des effets visuels et sonores soignés.',
        },
        'killer-game': {
            description: 'Killer Game est une adaptation numérique du célèbre jeu social \'Killer Party\', développée avec Vue.js 3 et TypeScript. Cette application web transforme l\'organisation traditionnelle du jeu en une expérience fluide et moderne, où chaque joueur reçoit secrètement une cible et une mission à accomplir. Le jeu propose une interface élégante et intuitive permettant aux organisateurs de créer facilement des parties, de gérer les joueurs et d\'attribuer automatiquement les missions. Les participants peuvent rejoindre une partie via un code unique et suivre leur progression en temps réel. L\'application dispose d\'une base de données de missions soigneusement équilibrées, conçues pour encourager l\'interaction sociale tout en restant accessibles et amusantes. Développé avec Vue.js 3, Pinia pour la gestion d\'état, et Vue Router pour la navigation, le projet met l\'accent sur la confidentialité des missions et l\'expérience utilisateur. L\'interface responsive s\'adapte parfaitement aux appareils mobiles, permettant aux joueurs de consulter discrètement leurs missions et de valider leurs éliminations. Le design minimaliste et l\'ambiance mystérieuse, soulignés par une identité visuelle distinctive, contribuent à l\'immersion dans ce jeu d\'élimination sociale stratégique.',
        },
        // Ajoutez d'autres projets ici
    };

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Vérifie si le clic n'est pas sur un lien
            if (!e.target.closest('.project-links')) {
                const title = card.querySelector('h3').textContent;
                const img = card.querySelector('img').src;
                const tags = card.querySelector('.project-tags').innerHTML;
                const links = card.querySelector('.project-links')?.innerHTML || '';
                
                // Identifier le projet pour obtenir la description détaillée
                const projectId = title.toLowerCase().replace(/\s+/g, '-');
                const description = projectDetails[projectId]?.description || 
                                  card.querySelector('p').textContent;

                // Remplir la modal
                modal.querySelector('.modal-title').textContent = title;
                modal.querySelector('.modal-image').src = img;
                modal.querySelector('.modal-image').alt = title;
                modal.querySelector('.modal-description').textContent = description;
                modal.querySelector('.modal-tags').innerHTML = tags;
                modal.querySelector('.modal-links').innerHTML = links;

                // Afficher la modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Fermer la modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });

    // Fermer la modal en cliquant en dehors
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Fermer avec la touche Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});
