/* ==========================================================================
   İrem Gök Portfolio - JavaScript (script.js)
   CV View & Download Handler, Navigation Scroll, Particles, and Canvas Cleaner
   ========================================================================== */

// 1. CV View & Auto Download Function (Blob & Object URL with Safe Backup Routing)
function handleCvDownload(event) {
    if (event) event.preventDefault();
    
    // URL-encoded primary path and secure fallback path
    const primaryPath = 'assets/cv/IREM_GOK%27S_CV.pdf';
    const fallbackPath = 'assets/cv/cv.pdf';
    const fileName = 'Irem_Gok_CV.pdf';

    // A) Attempt to open the primary PDF in a new tab immediately (Synchronously)
    const newTab = window.open(primaryPath, '_blank');

    // B) Simultaneously attempt to download the primary PDF file via Blob Fetch
    fetch(primaryPath)
        .then(response => {
            if (!response.ok) throw new Error("Primary CV file not found");
            return response.blob();
        })
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            window.URL.revokeObjectURL(blobUrl);
        })
        .catch(err => {
            console.warn("Primary CV path failed, attempting fallback path...", err);
            
            // Redirect the already opened tab if possible, or open fallback
            if (newTab) {
                try {
                    newTab.location.href = fallbackPath;
                } catch (e) {
                    window.open(fallbackPath, '_blank');
                }
            } else {
                window.open(fallbackPath, '_blank');
            }

            // Attempt to download the fallback PDF file
            fetch(fallbackPath)
                .then(response => {
                    if (!response.ok) throw new Error("Fallback CV file not found");
                    return response.blob();
                })
                .then(blob => {
                    const blobUrl = window.URL.createObjectURL(blob);
                    const downloadLink = document.createElement('a');
                    downloadLink.href = blobUrl;
                    downloadLink.download = fileName;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    window.URL.revokeObjectURL(blobUrl);
                })
                .catch(fallbackErr => {
                    console.error("All CV download attempts failed:", fallbackErr);
                    // Last resort direct download link fallback
                    const downloadLink = document.createElement('a');
                    downloadLink.href = fallbackPath;
                    downloadLink.download = fileName;
                    downloadLink.target = '_blank';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                });
        });
}

document.addEventListener('DOMContentLoaded', () => {

    // 2. Bind CV download buttons using a single loop in script.js
    const cvButtons = document.querySelectorAll('.cv-btn-nav, .cv-action-btn-large');
    cvButtons.forEach(btn => {
        btn.addEventListener('click', handleCvDownload);
    });

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
        // Skip processing if already done or hidden fallback logo
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
            console.warn("Canvas API transparent background cleaner failed (possibly CORS or file:// protocol):", error);
        }
    }

    const blendImages = document.querySelectorAll('img.blend-img');
    blendImages.forEach(img => {
        if (img.complete) {
            processImageForTransparency(img);
        } else {
            img.addEventListener('load', () => processImageForTransparency(img));
        }
    });

});