// Navigation scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for Reveal Animations
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.onclick = () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    };
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Contact Form Submission (Mock)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = 'Envoi en cours...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerText = 'Merci ! Message envoyé.';
            submitBtn.style.background = '#00ffcc';
            submitBtn.style.color = '#080a12';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
            }, 3000);
        }, 1500);
    });
}

// Add smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Accounting for sticky header
                behavior: 'smooth'
            });
        }
    });
});
// Tab System for Exp-Edu and Skills-Certs
function initTabs(toggleId) {
    const toggleGroup = document.getElementById(toggleId);
    if (!toggleGroup) return;

    const buttons = toggleGroup.querySelectorAll('.toggle-btn');
    buttons.forEach(btn => {
        btn.onclick = () => {
            // Update buttons
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content
            const target = btn.getAttribute('data-target');
            const parent = toggleGroup.closest('.container');
            const tabs = parent.querySelectorAll('.tab-content');
            
            tabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === target) {
                    tab.classList.add('active');
                }
            });
        };
    });
}

initTabs('exp-edu-toggle');
initTabs('skills-certs-toggle');

// Skills Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const skillItems = document.querySelectorAll('.skill-item');

filterButtons.forEach(btn => {
    btn.onclick = () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        skillItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 500);
            }
        });
    };
});
