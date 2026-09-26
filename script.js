/**
 * K-afe — LIGHT LUXURY COFFEE EDITORIAL DESIGN SYSTEM
 * Vanilla JavaScript Engine — Custom Cursor, Hero Parallax, Scroll Reveal, Interactive Cup Builder
 */

document.body.classList.add('loaded');

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');


    /* ------------------------------------------------------------------------
       2. DESKTOP CUSTOM CURSOR LOGIC
       ------------------------------------------------------------------------ */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorFollower = document.getElementById('cursor-follower');
    const cursorText = document.getElementById('cursor-text');
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice && cursorDot && cursorFollower) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {
            const distX = mouseX - followerX;
            const distY = mouseY - followerY;

            followerX += distX * 0.15;
            followerY += distY * 0.15;

            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor Hover Effects for Links & Buttons
        const hoverTargets = document.querySelectorAll('a, button, .stage-item');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-active');
            });
            target.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-active');
            });
        });

        // Cursor "EXPLORE" Mode for Imagery
        const viewTargets = document.querySelectorAll('[data-cursor-view]');
        viewTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-view-active');
                if (cursorText) cursorText.textContent = 'EXPLORE';
            });
            target.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-view-active');
            });
        });

        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });
    }


    /* ------------------------------------------------------------------------
       3. MOBILE NAVIGATION DRAWER
       ------------------------------------------------------------------------ */
    const hamburgerBtn = document.getElementById('hamburger-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMobileMenu() {
        const isOpen = hamburgerBtn.classList.contains('active');
        
        if (isOpen) {
            hamburgerBtn.classList.remove('active');
            mobileDrawer.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            mobileDrawer.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        } else {
            hamburgerBtn.classList.add('active');
            mobileDrawer.classList.add('active');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
            mobileDrawer.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    if (hamburgerBtn && mobileDrawer) {
        hamburgerBtn.addEventListener('click', toggleMobileMenu);

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburgerBtn.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
    }


    /* ------------------------------------------------------------------------
       4. NAVBAR SCROLL HEADER STYLING
       ------------------------------------------------------------------------ */
    const navbar = document.getElementById('navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();


    /* ------------------------------------------------------------------------
       5. HERO MOUSE PARALLAX & SCROLL MOTION ENGINE
       ------------------------------------------------------------------------ */
    const heroSection = document.getElementById('hero');
    const coffeeCupWrap = document.getElementById('hero-cup-wrap');
    const heroBgCoco = document.getElementById('hero-bg-coco');
    const heroSplash = document.getElementById('hero-splash');
    const floatingBeans = document.querySelectorAll('.coffee-bean');

    // Mouse Parallax Engine (Desktop Only)
    let rawMouseX = 0;
    let rawMouseY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    if (heroSection && !isTouchDevice) {
        window.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            rawMouseX = (e.clientX - centerX) / centerX; // Range: -1 -> +1
            rawMouseY = (e.clientY - centerY) / centerY;
            
            targetParallaxX = rawMouseX;
            targetParallaxY = rawMouseY;
        });

        function renderHeroMouseParallax() {
            // Smooth Lerp
            currentParallaxX += (targetParallaxX - currentParallaxX) * 0.08;
            currentParallaxY += (targetParallaxY - currentParallaxY) * 0.08;

            const cupX = currentParallaxX * 8; // Central cup shift
            const cupY = currentParallaxY * 8;
            const bgX = currentParallaxX * -5; // Inverse shift for background CO-CO typography
            const bgY = currentParallaxY * -5;

            if (coffeeCupWrap) {
                coffeeCupWrap.style.transform = `translate3d(${cupX}px, ${cupY}px, 0)`;
            }

            if (heroBgCoco) {
                heroBgCoco.style.transform = `translate(-50%, -50%) translate3d(${bgX}px, ${bgY}px, 0)`;
            }

            if (heroSplash) {
                heroSplash.style.transform = `translate(-50%, -50%) translate3d(${currentParallaxX * -7}px, ${currentParallaxY * -7}px, 0)`;
            }

            floatingBeans.forEach(bean => {
                const factor = parseFloat(bean.getAttribute('data-parallax-factor')) || 1.5;
                const beanX = currentParallaxX * (12 * (factor / 1.5));
                const beanY = currentParallaxY * (12 * (factor / 1.5));
                bean.style.transform = `translate3d(${beanX}px, ${beanY}px, 0)`;
            });

            requestAnimationFrame(renderHeroMouseParallax);
        }
        renderHeroMouseParallax();
    }

    // Scroll-based Hero Response
    if (heroSection) {
        function renderHeroScrollResponse() {
            const scrollY = window.scrollY;
            const heroHeight = heroSection.offsetHeight;

            if (scrollY <= heroHeight) {
                const progress = scrollY / heroHeight;

                // Central cup moves slightly upward on scroll
                if (coffeeCupWrap && !isTouchDevice) {
                    coffeeCupWrap.style.marginTop = `${-scrollY * 0.12}px`;
                }

                // CO-CO background typography fades out on scroll
                if (heroBgCoco) {
                    heroBgCoco.style.opacity = `${Math.max(0, 0.12 * (1 - progress * 1.5))}`;
                }
            }
        }

        window.addEventListener('scroll', () => {
            requestAnimationFrame(renderHeroScrollResponse);
        }, { passive: true });
    }


    /* ------------------------------------------------------------------------
       6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ------------------------------------------------------------------------ */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale');

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay');
                
                if (delay) {
                    element.style.transitionDelay = `${delay}ms`;
                }

                element.classList.add('reveal-active');
                observer.unobserve(element);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => revealObserver.observe(el));


    /* ------------------------------------------------------------------------
       7. SIGNATURE FEATURE — INTERACTIVE CUP BUILDER ENGINE
       ------------------------------------------------------------------------ */
    const state = {
        ice: false,
        coffee: false,
        milk: false,
        sugar: false,
        cream: false
    };

    const btnIce = document.getElementById('btn-ice');
    const btnCoffee = document.getElementById('btn-coffee');
    const btnMilk = document.getElementById('btn-milk');
    const btnSugar = document.getElementById('btn-sugar');
    const btnCream = document.getElementById('btn-cream');
    const btnReset = document.getElementById('btn-reset');

    const statusIce = document.getElementById('status-ice');
    const statusCoffee = document.getElementById('status-coffee');
    const statusMilk = document.getElementById('status-milk');
    const statusSugar = document.getElementById('status-sugar');
    const statusCream = document.getElementById('status-cream');

    const glassContainer = document.getElementById('glass-container');
    const iceLayer = document.getElementById('ice-layer');
    const coffeeFill = document.getElementById('coffee-fill');
    const milkFill = document.getElementById('milk-fill');
    const sugarLayer = document.getElementById('sugar-layer');
    const creamLayer = document.getElementById('cream-layer');
    const liquidStream = document.getElementById('liquid-stream');

    const recipeTitle = document.getElementById('recipe-title');
    const recipeDesc = document.getElementById('recipe-desc');
    const statTemp = document.getElementById('stat-temp');
    const statIntensity = document.getElementById('stat-intensity');
    const statProfile = document.getElementById('stat-profile');
    const activeTagsList = document.getElementById('active-tags');

    function triggerStream(color) {
        if (!liquidStream) return;
        liquidStream.style.background = color;
        liquidStream.classList.add('pouring');
        setTimeout(() => {
            liquidStream.classList.remove('pouring');
        }, 750);
    }

    // 1. ADD ICE
    if (btnIce) {
        btnIce.addEventListener('click', () => {
            if (state.ice) return;
            state.ice = true;
            btnIce.classList.add('added');
            if (statusIce) statusIce.textContent = '✓ ADDED';

            if (iceLayer) {
                iceLayer.classList.add('active');
                iceLayer.innerHTML = `
                    <div class="ice-cube" style="animation-delay: 0s;"></div>
                    <div class="ice-cube" style="animation-delay: 0.15s;"></div>
                    <div class="ice-cube" style="animation-delay: 0.3s;"></div>
                `;
            }
            updateRecipePanel();
        });
    }

    // 2. POUR COFFEE
    if (btnCoffee) {
        btnCoffee.addEventListener('click', () => {
            if (state.coffee) return;
            state.coffee = true;
            btnCoffee.classList.add('added');
            if (statusCoffee) statusCoffee.textContent = '✓ POURED';

            triggerStream('#3D261A');

            setTimeout(() => {
                if (coffeeFill) {
                    coffeeFill.style.height = state.milk ? '45%' : '60%';
                }
                updateRecipePanel();
            }, 300);
        });
    }

    // 3. POUR MILK
    if (btnMilk) {
        btnMilk.addEventListener('click', () => {
            if (state.milk) return;
            state.milk = true;
            btnMilk.classList.add('added');
            if (statusMilk) statusMilk.textContent = '✓ POURED';

            triggerStream('#FFFDF8');

            setTimeout(() => {
                if (milkFill) {
                    milkFill.style.height = '78%';
                }
                if (state.coffee && glassContainer) {
                    glassContainer.classList.add('blended');
                }
                updateRecipePanel();
            }, 300);
        });
    }

    // 4. ADD SUGAR
    if (btnSugar) {
        btnSugar.addEventListener('click', () => {
            if (state.sugar) return;
            state.sugar = true;
            btnSugar.classList.add('added');
            if (statusSugar) statusSugar.textContent = '✓ ADDED';

            if (sugarLayer) {
                sugarLayer.classList.add('active');
                sugarLayer.innerHTML = '';
                for (let i = 0; i < 8; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'sugar-particle';
                    particle.style.left = `${15 + Math.random() * 70}%`;
                    particle.style.animationDelay = `${Math.random() * 0.4}s`;
                    sugarLayer.appendChild(particle);
                }
            }
            updateRecipePanel();
        });
    }

    // 5. TOP CREAM
    if (btnCream) {
        btnCream.addEventListener('click', () => {
            if (state.cream) return;
            state.cream = true;
            btnCream.classList.add('added');
            if (statusCream) statusCream.textContent = '✓ TOPPED';

            if (creamLayer) {
                creamLayer.classList.add('active');
            }
            updateRecipePanel();
        });
    }

    // 6. RESET CUP
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            state.ice = false;
            state.coffee = false;
            state.milk = false;
            state.sugar = false;
            state.cream = false;

            [btnIce, btnCoffee, btnMilk, btnSugar, btnCream].forEach(btn => {
                if (btn) btn.classList.remove('added');
            });

            if (statusIce) statusIce.textContent = '+ ADD';
            if (statusCoffee) statusCoffee.textContent = '+ POUR';
            if (statusMilk) statusMilk.textContent = '+ POUR';
            if (statusSugar) statusSugar.textContent = '+ ADD';
            if (statusCream) statusCream.textContent = '+ TOP';

            if (coffeeFill) coffeeFill.style.height = '0%';
            if (milkFill) milkFill.style.height = '0%';
            if (iceLayer) {
                iceLayer.classList.remove('active');
                iceLayer.innerHTML = '';
            }
            if (sugarLayer) {
                sugarLayer.classList.remove('active');
                sugarLayer.innerHTML = '';
            }
            if (creamLayer) creamLayer.classList.remove('active');
            if (glassContainer) glassContainer.classList.remove('blended');

            updateRecipePanel();
        });
    }

    // UPDATE DYNAMIC RECIPE PANEL
    function updateRecipePanel() {
        const activeCount = Object.values(state).filter(Boolean).length;
        
        if (activeCount === 0) {
            recipeTitle.textContent = 'EMPTY GLASS';
            recipeDesc.textContent = 'Select an ingredient from the left control panel to begin crafting your bespoke K-afe beverage.';
            statTemp.textContent = 'ROOM TEMP';
            statIntensity.textContent = '0 / 5';
            statProfile.textContent = 'UNBALANCED';
            activeTagsList.innerHTML = '<li class="empty-tag">No ingredients added yet</li>';
            return;
        }

        let name = 'K-afe SPECIAL';
        let desc = 'Custom formulation layered with artisanal precision.';
        let temp = state.ice ? 'CHILLED 4°C' : 'WARM 85°C';
        let intensity = 1;
        let profile = 'BALANCED';

        if (state.coffee && state.milk && state.ice && state.cream) {
            name = 'K-afe SIGNATURE LATTE';
            desc = 'Rich espresso layered over chilled oat milk, ice, and velvet whipped cream.';
            intensity = 4;
            profile = 'CREAMY & BOLD';
        } else if (state.coffee && state.milk) {
            name = 'VELVET K-afe LATTE';
            desc = 'Silky combination of double espresso and warm steamed oat milk.';
            intensity = 3;
            profile = 'SMOOTH & RICH';
        } else if (state.coffee && state.ice) {
            name = 'ICED ESPRESSO DOPPIO';
            desc = 'Chilled double shot extracted directly over hand-cut ice cubes.';
            intensity = 5;
            profile = 'INTENSE & CRISP';
        } else if (state.coffee) {
            name = 'PURE ESPRESSO';
            desc = 'Single origin Ethiopian Yirgacheffe double extraction.';
            intensity = 5;
            profile = 'BOLD & AROMATIC';
        } else if (state.milk) {
            name = 'STEAMED OAT MILK';
            desc = 'Warm micro-foamed organic milk with natural sweetness.';
            intensity = 1;
            profile = 'SWEET & SILKY';
        }

        if (state.sugar) intensity += 0.5;

        recipeTitle.textContent = name;
        recipeDesc.textContent = desc;
        statTemp.textContent = temp;
        statIntensity.textContent = `${intensity} / 5`;
        statProfile.textContent = profile;

        activeTagsList.innerHTML = '';
        if (state.ice) activeTagsList.innerHTML += '<li class="tag-item">ICE CUBES</li>';
        if (state.coffee) activeTagsList.innerHTML += '<li class="tag-item">ESPRESSO SHOT</li>';
        if (state.milk) activeTagsList.innerHTML += '<li class="tag-item">STEAMED MILK</li>';
        if (state.sugar) activeTagsList.innerHTML += '<li class="tag-item">RAW SUGAR</li>';
        if (state.cream) activeTagsList.innerHTML += '<li class="tag-item">WHIPPED CREAM</li>';
    }


    /* ------------------------------------------------------------------------
       8. SMOOTH SCROLL FOR INTERNAL ANCHORS
       ------------------------------------------------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 85;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
