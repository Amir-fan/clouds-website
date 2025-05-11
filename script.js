document.addEventListener('DOMContentLoaded', function() {
    // Page loading animation
    document.body.classList.add('page-loaded');
    
    // Cloud Cursor Follower
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        cursorFollower.style.opacity = '1';
        cursorFollower.style.left = x + 'px';
        cursorFollower.style.top = y + 'px';
        
        // Add cloud puff effect on click
        document.addEventListener('click', function(event) {
            createCloudPuff(event.clientX, event.clientY);
        });
    });
    
    // Add page loading styles
    const pageLoadStyle = document.createElement('style');
    pageLoadStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.8s ease;
        }
        
        body.page-loaded {
            opacity: 1;
        }
        
        .section-animate {
            transition: all 1s ease;
        }
    `;
    document.head.appendChild(pageLoadStyle);
    
    // Create cloud puff effect
    function createCloudPuff(x, y) {
        const puff = document.createElement('div');
        puff.className = 'cloud-puff';
        puff.style.left = x + 'px';
        puff.style.top = y + 'px';
        document.body.appendChild(puff);
        
        setTimeout(() => {
            puff.remove();
        }, 1000);
    }
    
    // CSS for cloud puff
    const style = document.createElement('style');
    style.textContent = `
        .cloud-puff {
            position: absolute;
            width: 30px;
            height: 30px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            filter: blur(5px);
            pointer-events: none;
            z-index: 999;
            transform: translate(-50%, -50%);
            animation: puff 1s ease-out forwards;
        }
        
        @keyframes puff {
            0% {
                transform: translate(-50%, -50%) scale(0.1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect for clouds
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.cloud').forEach((cloud, index) => {
            const speed = 0.1 * (index + 1);
            cloud.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
        
        document.querySelectorAll('.balloon').forEach((balloon, index) => {
            const speed = 0.05 * (index + 1);
            balloon.style.transform = `translateY(${scrollPosition * -speed}px)`;
        });
    });
    
    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const navBtns = document.querySelectorAll('.nav-btn');

    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Smooth scroll to sections
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = document.getElementById(btn.dataset.section);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });

    // Touch event optimizations
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe right - show previous gallery slide
                showPreviousSlide();
            } else {
                // Swipe left - show next gallery slide
                showNextSlide();
            }
        }
    }

    // Gallery carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    prevBtn.addEventListener('click', showNextSlide);
    nextBtn.addEventListener('click', showPreviousSlide);

    // Performance optimizations
    const clouds = document.querySelectorAll('.cloud');
    const heroClouds = document.querySelectorAll('.hero-cloud');

    // Reduce animation complexity on mobile
    function optimizeAnimations() {
        if (window.innerWidth <= 768) {
            clouds.forEach(cloud => {
                cloud.style.animationDuration = '30s';
            });
            heroClouds.forEach(cloud => {
                cloud.style.animationDuration = '20s';
            });
        }
    }

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimize on resize
    window.addEventListener('resize', debounce(optimizeAnimations, 250));

    // Initial optimization
    optimizeAnimations();
    
    // Cloud Card Pop Effect
    const cloudCards = document.querySelectorAll('.cloud-card');
    const scentPopup = document.querySelector('.scent-popup');
    const scentName = document.querySelector('.scent-name');
    const scentCloud = document.querySelector('.scent-cloud');
    const scentDescription = document.querySelector('.scent-description');
    const closePopupBtn = document.querySelector('.close-popup');
    
    const scentData = {
        'Fresh Rain': {
            description: 'A refreshing scent of rain on a spring morning that instantly calms your mind.',
            color: 'linear-gradient(135deg, #87CEEB, #4682B4)'
        },
        'Vanilla': {
            description: 'Warm, comforting vanilla that wraps you in a sweet, dreamy embrace.',
            color: 'linear-gradient(135deg, #FFDAB9, #FFC0CB)'
        },
        'Lavender': {
            description: 'Soothing lavender that helps you relax and drift into peaceful thoughts.',
            color: 'linear-gradient(135deg, #E6E6FA, #c8a2c8)'
        },
        'Ocean Breeze': {
            description: 'Crisp, clean ocean air that transports you to a beautiful coastal paradise.',
            color: 'linear-gradient(135deg, #87CEEB, #4682B4)'
        },
        'Wildflowers': {
            description: 'A delightful bouquet of wildflowers that brings nature into your room.',
            color: 'linear-gradient(135deg, #98FB98, #FFF44F)'
        },
        'Cotton Candy': {
            description: 'Sweet, fluffy cotton candy scent that reminds you of carefree summer days.',
            color: 'linear-gradient(135deg, #FFC0CB, #add8e6)'
        }
    };
    
    cloudCards.forEach(card => {
        const popBtn = card.querySelector('.pop-btn');
        const popEffect = card.querySelector('.pop-effect');
        
        popBtn.addEventListener('click', function() {
            // Animate the pop effect
            popEffect.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8)';
            popEffect.style.opacity = '1';
            popEffect.style.transform = 'scale(1.2)';
            
            // Get scent data
            const scentType = card.getAttribute('data-scent');
            const data = scentData[scentType];
            
            // Set popup content
            scentName.textContent = scentType;
            scentDescription.textContent = data.description;
            scentCloud.style.background = data.color;
            
            // Show popup after brief delay
            setTimeout(() => {
                scentPopup.classList.add('active');
                
                // Reset pop effect
                setTimeout(() => {
                    popEffect.style.opacity = '0';
                    popEffect.style.transform = 'scale(0.8)';
                    popEffect.style.boxShadow = 'none';
                }, 500);
            }, 500);
        });
    });
    
    closePopupBtn.addEventListener('click', function() {
        scentPopup.classList.remove('active');
    });
    
    // Customize Cloud Preview
    const colorOptions = document.querySelectorAll('.color-option');
    const previewCloud = document.querySelector('.preview-cloud');
    const previewAura = document.querySelector('.preview-aura');
    const sizeSlider = document.getElementById('cloud-size');
    const sparkleOptions = document.querySelectorAll('.sparkle-option');
    const scentsSelect = document.getElementById('cloud-scent');
    const createBtn = document.querySelector('.create-btn');
    
    // Map select values to gradient colors
    const scentColors = {
        'fresh-rain': 'linear-gradient(135deg, #87CEEB, #4682B4)',
        'vanilla': 'linear-gradient(135deg, #FFDAB9, #FFC0CB)',
        'lavender': 'linear-gradient(135deg, #E6E6FA, #c8a2c8)',
        'ocean': 'linear-gradient(135deg, #87CEEB, #4682B4)',
        'wildflowers': 'linear-gradient(135deg, #98FB98, #FFF44F)',
        'cotton-candy': 'linear-gradient(135deg, #FFC0CB, #add8e6)'
    };

    // Set initial sparkles
    setTimeout(() => {
        // Set default sparkle level
        document.querySelector('.sparkle-option[data-sparkle="2"]').classList.add('active');
        addSparkles(2);
    }, 500);

    // Cloud color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get computed style of the option
            const computedStyle = window.getComputedStyle(this);
            
            // Apply the same background to the preview cloud
            if (this.classList.contains('rainbow')) {
                previewCloud.style.animation = 'float 4s ease-in-out infinite, rainbow 10s linear infinite';
                previewCloud.style.background = 'linear-gradient(135deg, #ff9aa2, #ffb7b2, #ffdac1, #e2f0cb, #b5ead7, #c7ceea)';
                previewCloud.style.backgroundSize = '300% 300%';
                previewAura.style.background = 'radial-gradient(circle, rgba(255, 175, 189, 0.2) 0%, rgba(255, 195, 160, 0.1) 30%, rgba(255, 175, 189, 0) 70%)';
                previewAura.style.animation = 'pulse 3s ease-in-out infinite alternate, rainbow-aura 10s linear infinite';
            } else {
                previewCloud.style.animation = 'float 4s ease-in-out infinite';
                previewCloud.style.background = computedStyle.background;
                previewAura.style.animation = 'pulse 3s ease-in-out infinite alternate';
            }
        });
    });
    
    // Default active color
    colorOptions[0].classList.add('active');
    
    // Cloud size selection with smooth transition
    sizeSlider.addEventListener('input', function() {
        const size = this.value;
        const scale = 0.8 + (size * 0.2); // Scale from 1 to 1.4
        
        previewCloud.style.transform = `scale(${scale})`;
    });
    
    // Sparkle level selection
    sparkleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            sparkleOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            const sparkleLevel = parseInt(this.getAttribute('data-sparkle'));
            
            // Clear previous sparkles
            const existingSparkles = document.querySelectorAll('.cloud-sparkle');
            existingSparkles.forEach(sparkle => sparkle.remove());
            
            // Add new sparkles based on level
            addSparkles(sparkleLevel);
        });
    });
    
    function addSparkles(level) {
        // Number of sparkles based on level
        const count = level * 5;
        
        for (let i = 0; i < count; i++) {
            addSparkleToCloud();
        }
    }
    
    function addSparkleToCloud() {
        const sparkle = document.createElement('div');
        sparkle.className = 'cloud-sparkle';
        
        // Random position around the cloud
        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 70; // Wider distribution
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // Random size
        const size = 5 + Math.random() * 15;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        
        // Random animation delay and duration
        const delay = Math.random() * 3;
        const duration = 1.5 + Math.random() * 2;
        sparkle.style.animationDelay = `${delay}s`;
        sparkle.style.animationDuration = `${duration}s`;
        
        sparkle.style.left = `calc(50% + ${x}px)`;
        sparkle.style.top = `calc(50% + ${y}px)`;
        
        document.querySelector('.customize-preview').appendChild(sparkle);
    }
    
    // Add enhanced sparkle styles
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        .cloud-sparkle {
            position: absolute;
            width: 15px;
            height: 15px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 50%;
            filter: blur(1px);
            z-index: 2;
            animation: sparkle 2s ease-in-out infinite;
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
        }
        
        @keyframes sparkle {
            0%, 100% {
                transform: scale(0.6);
                opacity: 0.3;
            }
            50% {
                transform: scale(1.2);
                opacity: 1;
                filter: blur(0.5px);
                box-shadow: 0 0 8px rgba(255, 255, 255, 1);
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
    
    // Cloud scent selection
    scentsSelect.addEventListener('change', function() {
        const selectedScent = this.value;
        
        if (scentColors[selectedScent]) {
            // Don't change rainbow cloud color
            if (!document.querySelector('.color-option.active.rainbow')) {
                previewCloud.style.background = scentColors[selectedScent];
            }
            
            // Show scent change effect
            const scentEffect = document.createElement('div');
            scentEffect.className = 'scent-effect';
            document.querySelector('.customize-preview').appendChild(scentEffect);
            
            setTimeout(() => {
                scentEffect.remove();
            }, 1500);
        }
    });
    
    // Add scent effect style
    const scentEffectStyle = document.createElement('style');
    scentEffectStyle.textContent = `
        .scent-effect {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%);
            border-radius: 50%;
            animation: scent-pulse 1.5s ease-out forwards;
            pointer-events: none;
            z-index: 3;
        }
        
        @keyframes scent-pulse {
            0% {
                opacity: 0.8;
                transform: translate(-50%, -50%) scale(0.1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1.5);
            }
        }
    `;
    document.head.appendChild(scentEffectStyle);
    
    // Create button animation
    createBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create celebration effect
        createCelebration();
        
        // Add 3D press effect
        this.classList.add('button-pressed');
        
        // Shake cloud effect
        previewCloud.classList.add('cloud-shake');
        
        // Give feedback to user
        this.textContent = 'CloudPop Created!';
        this.style.background = 'linear-gradient(45deg, #98FB98, #87CEEB)';
        
        setTimeout(() => {
            this.textContent = 'Create My CloudPop';
            this.style.background = 'linear-gradient(45deg, var(--soft-pink), var(--sky-blue))';
            this.classList.remove('button-pressed');
            previewCloud.classList.remove('cloud-shake');
        }, 3000);
    });
    
    function createCelebration() {
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random positions
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.background = `hsl(${Math.random() * 360}, 100%, 80%)`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
    
    // Add confetti styles
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        .confetti {
            position: fixed;
            width: 10px;
            height: 10px;
            top: -10px;
            border-radius: 50%;
            z-index: 100;
            animation: fall 3s linear forwards;
        }
        
        @keyframes fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);
    
    // Buttons hover sound effect
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            playPoppingSound(0.2);
        });
    });
    
    function playPoppingSound(volume = 0.5) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create oscillator
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Set frequency and type
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.2);
        
        // Set volume
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        // Start and stop
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
    }

    // Add animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        section.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);

    // Add button press and cloud shake effects
    const buttonEffectsStyle = document.createElement('style');
    buttonEffectsStyle.textContent = `
        .button-pressed {
            transform: translateY(-2px) scale(0.98) !important;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2) !important;
        }
        
        .cloud-shake {
            animation: cloud-shake 0.5s ease-in-out forwards !important;
        }
        
        @keyframes cloud-shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(buttonEffectsStyle);
}); 