document.addEventListener('DOMContentLoaded', () => {
    handleHeaderScroll();
    setActiveNav();
    initBurgerMenu();
    initSmoothScroll();
    initBookingForm();
    initMenuFilters();
});

window.addEventListener('scroll', handleHeaderScroll);
window.addEventListener('hashchange', setActiveNav);

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    if (window.scrollY > 50) {
        header.style.background = '#ffffff';
        header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.9)';
        header.style.boxShadow = 'none';
    }
}

function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;
    const navLinks = document.querySelectorAll('.nav-list a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');

        if (!href) return;

        if (href.startsWith('#') && currentPage === 'index.html') {
            if (href === currentHash && currentHash !== '') {
                link.classList.add('active');
            }
        } else {
            const [linkPath] = href.split('#');
            const normalizedLinkPath = linkPath === '' ? 'index.html' : linkPath;
            if (normalizedLinkPath === currentPage) {
                link.classList.add('active');
            }
        }
    });
}

function initBurgerMenu() {
    const burger = document.getElementById('burger');
    const nav = document.querySelector('.nav-list');

    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, '', href);
                setActiveNav();
            }
        });
    });
}

function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    const bookingMessage = document.getElementById('bookingMessage');

    if (!bookingForm || !bookingMessage) return;

    bookingForm.addEventListener('submit', event => {
        event.preventDefault();
        bookingMessage.textContent = 'Дякуємо! Ваше бронювання прийнято. Ми зв’яжемося з вами найближчим часом.';
        bookingMessage.classList.add('success');
        bookingForm.reset();
    });
}

function initMenuFilters() {
    const categoryCards = document.querySelectorAll('.category-card');
    const menuCards = document.querySelectorAll('.menu-card');

    if (!categoryCards.length || !menuCards.length) return;

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const alreadyActive = card.classList.contains('active');

            categoryCards.forEach(item => item.classList.remove('active'));

            if (alreadyActive) {
                menuCards.forEach(menuCard => menuCard.classList.remove('hide'));
                return;
            }

            card.classList.add('active');
            menuCards.forEach(menuCard => {
                if (category === 'all' || menuCard.dataset.category === category) {
                    menuCard.classList.remove('hide');
                } else {
                    menuCard.classList.add('hide');
                }
            });
        });
    });
}
