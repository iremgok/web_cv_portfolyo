/* ==========================================================================
   İrem Gök Portfolio - JavaScript (script.js)
   Interactive scrolling, particle generator, and contact form handling
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- PART 1: PARTICLE SYSTEM (Leaves & Sparkles) ---
    const leavesContainer = document.getElementById('leaves-container');
    const sparklesContainer = document.getElementById('sparkles-container');

    // Spawn a leaf particle
    function spawnLeaf() {
        if (!leavesContainer) return;
        
        const leaf = document.createElement('div');
        leaf.className = 'particle leaf-particle';
        
        // Random starting horizontal position inside the card (width ~320px)
        const startX = Math.random() * 280 + 10;
        leaf.style.left = `${startX}px`;
        leaf.style.top = `-10px`;
        
        // Random scale (0.5 to 1.3)
        const scale = 0.5 + Math.random() * 0.8;
        leaf.style.transform = `scale(${scale})`;
        
        // Random rotation speed and sway offset
        const duration = 5 + Math.random() * 5; // 5 to 10 seconds
        const delay = Math.random() * 2;
        
        leaf.style.animation = `float-leaf ${duration}s linear ${delay}s infinite`;
        
        leavesContainer.appendChild(leaf);
        
        // Remove from DOM when animation ends to prevent memory leak
        setTimeout(() => {
            leaf.remove();
        }, (duration + delay) * 1000);
    }

    // Spawn a sparkle star particle
    function spawnSparkle() {
        if (!sparklesContainer) return;
        
        const sparkle = document.createElement('div');
        sparkrule_class = Math.random() > 0.5 ? 'particle star-particle' : 'particle star-particle';
        sparkle.className = 'particle star-particle';
        
        // Random position around the character card (x: 20-300px, y: 50-430px)
        const x = Math.random() * 280 + 20;
        const y = Math.random() * 380 + 40;
        
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        
        // Random scale
        const scale = 0.4 + Math.random() * 0.8;
        sparkle.style.transform = `scale(${scale})`;
        
        // Random animation duration
        const duration = 1.5 + Math.random() * 2; // 1.5 to 3.5 seconds
        sparkle.style.animationDuration = `${duration}s`;
        
        sparklesContainer.appendChild(sparkle);
        
        // Remove after animation completes
        setTimeout(() => {
            sparkle.remove();
        }, duration * 1000);
    }

    // Start particle spawning loops
    if (leavesContainer && sparklesContainer) {
        // Initial batch of sparkles
        for (let i = 0; i < 6; i++) {
            setTimeout(spawnSparkle, Math.random() * 2000);
        }
        
        // Recurring spawns
        setInterval(spawnLeaf, 1200);   // Spawn a leaf every 1.2 seconds
        setInterval(spawnSparkle, 700);  // Spawn a sparkle every 700ms
    }


    // --- PART 2: DYNAMIC NAVIGATION HIGHLIGHTING (Intersection Observer) ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Adjust margins to trigger when section occupies middle/top of viewport
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                // Remove active class from all items
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${activeId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));


    // --- PART 3: CONTACT FORM SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    const successBanner = document.getElementById('success-banner');

    if (contactForm && successBanner) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop page reload
            
            // Get inputs (could send to API here)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            console.log('Message Received:', { name, email, message });

            // Animate submit button feedback
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Restore button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show success banner with standard jQuery-like fade-in / slide-down simulation
                successBanner.style.display = 'block';
                successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Reset form inputs
                contactForm.reset();

                // Auto-hide success banner after 6 seconds
                setTimeout(() => {
                    successBanner.style.display = 'none';
                }, 6000);

            }, 1200);
        });
    }

});
