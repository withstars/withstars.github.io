// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const categoryBtns = document.querySelectorAll('.category-btn');
const articleCards = document.querySelectorAll('.article-card');
const loadMoreBtn = document.querySelector('.load-more .btn');
const newsletterForm = document.querySelector('.newsletter-form');
const contactForm = document.querySelector('.contact-form form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Article Category Filter
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        articleCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Load More Articles (Demo functionality)
loadMoreBtn.addEventListener('click', () => {
    // Show loading state
    loadMoreBtn.classList.add('loading');
    loadMoreBtn.textContent = '加载中...';

    // Simulate loading delay
    setTimeout(() => {
        // Create new article cards
        const newArticles = [
            {
                category: 'ai',
                categoryText: 'AI前沿',
                date: '2024-01-20',
                title: 'AI在医疗健康领域的创新应用',
                excerpt: '探索人工智能如何革新医疗诊断、药物研发和个性化治疗方案...',
                icon: 'fa-heartbeat'
            },
            {
                category: 'design',
                categoryText: '产品设计',
                date: '2024-01-18',
                title: '移动端设计的最佳实践',
                excerpt: '从用户体验角度出发，打造流畅直观的移动应用界面设计...',
                icon: 'fa-mobile-alt'
            },
            {
                category: 'aigc',
                categoryText: 'AIGC',
                date: '2024-01-16',
                title: 'AI绘画工具使用指南',
                excerpt: '详解主流AI绘画工具的使用技巧和创作方法，释放创意潜力...',
                icon: 'fa-paint-brush'
            }
        ];

        const articlesGrid = document.getElementById('articlesGrid');

        newArticles.forEach((article, index) => {
            const articleCard = document.createElement('article');
            articleCard.className = `article-card fade-in ${article.category}`;
            articleCard.setAttribute('data-category', article.category);
            articleCard.style.animationDelay = `${index * 0.1}s`;

            articleCard.innerHTML = `
                <div class="article-image">
                    <div class="article-placeholder">
                        <i class="fas ${article.icon}"></i>
                    </div>
                </div>
                <div class="article-content">
                    <div class="article-meta">
                        <span class="article-category">${article.categoryText}</span>
                        <span class="article-date">${article.date}</span>
                    </div>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <a href="#" class="article-link">阅读全文 <i class="fas fa-arrow-right"></i></a>
                </div>
            `;

            articlesGrid.appendChild(articleCard);
        });

        // Update button state
        loadMoreBtn.classList.remove('loading');
        loadMoreBtn.textContent = '没有更多文章了';
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.6';
        loadMoreBtn.style.cursor = 'not-allowed';

        // Re-attach category filter event listeners for new articles
        const currentActiveCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
        if (currentActiveCategory !== 'all') {
            const newCards = articlesGrid.querySelectorAll('.article-card:nth-last-child(-n+3)');
            newCards.forEach(card => {
                if (card.getAttribute('data-category') !== currentActiveCategory) {
                    card.style.display = 'none';
                }
            });
        }
    }, 1500);
});

// Newsletter Form Submission
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector('button');

    // Validate email
    if (!emailInput.value.trim()) {
        showError(emailInput, '请输入邮箱地址');
        return;
    }

    if (!isValidEmail(emailInput.value)) {
        showError(emailInput, '请输入有效的邮箱地址');
        return;
    }

    // Show loading state
    submitBtn.textContent = '订阅中...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Show success message
        showSuccessMessage('订阅成功！感谢您的关注。');
        emailInput.value = '';
        submitBtn.textContent = '订阅';
        submitBtn.disabled = false;
    }, 2000);
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector('textarea');
    const submitBtn = contactForm.querySelector('button');

    // Validate form fields
    let isValid = true;

    if (!nameInput.value.trim()) {
        showError(nameInput, '请输入您的姓名');
        isValid = false;
    }

    if (!emailInput.value.trim()) {
        showError(emailInput, '请输入您的邮箱');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, '请输入有效的邮箱地址');
        isValid = false;
    }

    if (!messageInput.value.trim()) {
        showError(messageInput, '请输入留言内容');
        isValid = false;
    }

    if (!isValid) return;

    // Show loading state
    submitBtn.textContent = '发送中...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Show success message
        showSuccessMessage('留言发送成功！我会尽快回复您。');

        // Reset form
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';

        submitBtn.textContent = '发送留言';
        submitBtn.disabled = false;
    }, 2000);
});

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    // Remove any existing error
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add error styling
    input.style.borderColor = 'var(--error-color)';

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'var(--error-color)';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;

    input.parentElement.appendChild(errorDiv);

    // Remove error on input
    input.addEventListener('input', () => {
        input.style.borderColor = '';
        const error = input.parentElement.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    });
}

function showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
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

// Observe elements for animation
document.querySelectorAll('.skill-item, .article-card, .contact-item').forEach(el => {
    observer.observe(el);
});

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

// Page loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.animation = 'fadeIn 0.5s ease forwards';

    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(fadeInStyle);
});

// Add hover effects to social links
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(360deg)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dark mode toggle (bonus feature)
const createDarkModeToggle = () => {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 999;
        transition: var(--transition);
    `;

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = toggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    document.body.appendChild(toggle);
};

// Initialize dark mode toggle
createDarkModeToggle();

// Add dark mode styles
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    .dark-mode {
        background-color: #0f172a;
        color: #e2e8f0;
    }

    .dark-mode .navbar {
        background: rgba(15, 23, 42, 0.95);
    }

    .dark-mode .hero {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    }

    .dark-mode .about,
    .dark-mode .contact {
        background: #1e293b;
    }

    .dark-mode .articles {
        background: #0f172a;
    }

    .dark-mode .article-card,
    .dark-mode .skill-item,
    .dark-mode .contact-form {
        background: #1e293b;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }

    .dark-mode .footer {
        background: #020617;
    }
`;
document.head.appendChild(darkModeStyles);