/* ==========================================================================
   İrem Gök Portfolio - JavaScript (script.js)
   CV View & Download Handler, Navigation Scroll, Particles, and Canvas Cleaner
   ========================================================================== */

// 1. CV View & Auto Download Function (Safe Dual-Action Handler)
function handleCvSafeAction(event) {
    // Doğal link akışı ile sekmede açılmasına izin ver
    // 300ms sonra arka planda temiz bir indirme bağlantısı tetikle
    setTimeout(() => {
        const a = document.createElement('a');
        a.href = 'assets/cv/IREM_GOK_CV.pdf';
        a.download = 'IREM_GOK_CV.pdf';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }, 300);
}

// Utility function to escape HTML special characters to prevent XSS
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

document.addEventListener('DOMContentLoaded', () => {

    // 3. Dynamic Navbar Section Observer (IntersectionObserver)
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links .nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${activeId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));

    // 4. Smooth scroll navigation link click handler
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. Sparkles Particle Effect inside Character Card
    const sparklesContainer = document.getElementById('sparkles-container');
    
    function spawnSparkle() {
        if (!sparklesContainer) return;
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        
        const size = Math.random() * 8 + 4;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.backgroundColor = '#ff55aa';
        sparkle.style.boxShadow = '0 0 6px #ff007f';
        
        const containerWidth = sparklesContainer.offsetWidth || 300;
        const containerHeight = sparklesContainer.offsetHeight || 400;
        
        sparkle.style.left = `${Math.random() * (containerWidth - 40) + 20}px`;
        sparkle.style.top = `${Math.random() * (containerHeight - 60) + 20}px`;
        sparkle.style.pointerEvents = 'none';
        sparkle.style.borderRadius = '2px';
        sparkle.style.opacity = '0';
        sparkle.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        sparklesContainer.appendChild(sparkle);

        setTimeout(() => {
            sparkle.style.opacity = '0.9';
            sparkle.style.transform = 'scale(1.2)';
        }, 50);

        setTimeout(() => {
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(0.5)';
            setTimeout(() => sparkle.remove(), 600);
        }, 1200);
    }

    if (sparklesContainer) {
        setInterval(spawnSparkle, 700);
    }

    // 6. Canvas API Pixel Transparent Cleaner (Removes black/dark backgrounds programmatically)
    function processImageForTransparency(img) {
        if (img.dataset.canvasProcessed === 'true' || img.style.display === 'none') return;
        img.dataset.canvasProcessed = 'true';

        try {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            // Threshold: R < 35, G < 35, B < 35 will be processed as black background
            const threshold = 35;
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i+1];
                const b = data[i+2];

                if (r < threshold && g < threshold && b < threshold) {
                    data[i+3] = 0; // Alpha channel -> Transparent
                }
            }

            ctx.putImageData(imgData, 0, 0);
            img.src = canvas.toDataURL();
        } catch (error) {
            console.warn("Canvas API transparent cleaner bypassed (handled via CSS mix-blend-mode):", error);
        }
    }

    const blendImages = document.querySelectorAll('img.blend-img, img.transparent-img');
    blendImages.forEach(img => {
        if (img.complete && img.naturalWidth !== 0) {
            processImageForTransparency(img);
        } else {
            img.addEventListener('load', () => processImageForTransparency(img));
        }
    });
    // Securely handle contact form submission (XSS sanitized)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const messageInput = document.getElementById('form-message');

            if (nameInput && emailInput && messageInput) {
                const nameVal = nameInput.value.trim();
                const emailVal = emailInput.value.trim();
                const messageVal = messageInput.value.trim();

                if (!nameVal || !emailVal || !messageVal) {
                    alert("Please fill in all fields securely.");
                    return;
                }

                const sanitizedName = escapeHTML(nameVal);
                alert(`Thank you for your message, ${sanitizedName}! (Message sent simulation successful)`);
                contactForm.reset();
            }
        });
    }

});