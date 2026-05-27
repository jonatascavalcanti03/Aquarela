document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu (Hamburger)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // 2. Scroll Animations (Intersection Observer)
    const scrollElements = document.querySelectorAll('.scroll-anim');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };
    const displayScrollElement = (element) => {
        element.classList.add('show');
    };
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.1)) {
                displayScrollElement(el);
            }
        });
    }

    // 3. Parallax Effect on Hero
    const heroContent = document.getElementById('hero-content');
    
    window.addEventListener('scroll', () => {
        // Scroll anims
        handleScrollAnimation();
        
        // Parallax logic (Only apply if window is somewhat near top to save processing)
        if(window.scrollY < window.innerHeight && heroContent) {
            const scrollValue = window.scrollY;
            heroContent.style.transform = `translateY(${scrollValue * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrollValue / 700);
        }
    });
    // Trigger para elementos que já estão na tela ao carregar a página
    handleScrollAnimation();

    // 4. Inicializar Swiper (Carrossel de Depoimentos)
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.depoimentos-slider', {
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            spaceBetween: 30,
            slidesPerView: 1,
            grabCursor: true,
        });
    }

    // 5. Acessibilidade (A11y Panel)
    const a11yPanel = document.getElementById('a11y-panel');
    const a11yToggle = document.getElementById('a11y-toggle');
    const btnContrast = document.getElementById('btn-contrast');
    const btnFontPlus = document.getElementById('btn-font-plus');
    const btnFontReset = document.getElementById('btn-font-reset');

    if (a11yToggle) {
        a11yToggle.addEventListener('click', () => {
            a11yPanel.classList.toggle('open');
        });

        // Fechar se clicar fora do painel
        document.addEventListener('click', (e) => {
            if (!a11yPanel.contains(e.target)) {
                a11yPanel.classList.remove('open');
            }
        });
    }

    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            // Salvando preferência no localstorage
            const isContrast = document.body.classList.contains('high-contrast');
            localStorage.setItem('aquarela-contrast', isContrast);
        });
    }

    if (btnFontPlus) {
        btnFontPlus.addEventListener('click', () => {
            document.body.classList.add('large-text');
            localStorage.setItem('aquarela-font', 'large');
        });
    }

    if (btnFontReset) {
        btnFontReset.addEventListener('click', () => {
            document.body.classList.remove('large-text');
            document.body.classList.remove('high-contrast');
            localStorage.removeItem('aquarela-font');
            localStorage.removeItem('aquarela-contrast');
        });
    }

    // Checar LocalStorage no carregamento
    if (localStorage.getItem('aquarela-contrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
    if (localStorage.getItem('aquarela-font') === 'large') {
        document.body.classList.add('large-text');
    }

    // 6. Modal da Equipe de Especialistas
    const modal = document.getElementById('modal-educador');
    const closeBtn = document.querySelector('.close-btn');
    const educadores = document.querySelectorAll('.educador');

    const modalName = document.getElementById('modal-name');
    const modalRole = document.getElementById('modal-role');
    const modalDesc = document.getElementById('modal-desc');
    const modalAvatar = document.querySelector('.modal-avatar');

    if(modal && educadores.length > 0) {
        educadores.forEach(card => {
            card.addEventListener('click', () => {
                const name = card.getAttribute('data-name');
                const role = card.getAttribute('data-role');
                const desc = card.getAttribute('data-desc');
                const avatar = card.querySelector('.avatar').innerText;

                modalName.innerText = name;
                modalRole.innerText = role;
                modalDesc.innerText = desc;
                modalAvatar.innerText = avatar;

                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Stop background scroll
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; 
        };

        closeBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
});
