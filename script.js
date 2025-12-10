// Three.js 3D Roblox Hacker Character
let scene, camera, renderer, character;

function init3DCharacter() {
    const canvas = document.getElementById('roblox-character');
    
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    
    // Create Roblox-style character (blocky 1x1x1x1)
    createRobloxCharacter();
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x00ff00, 0.3);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00ff00, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0xff00ff, 0.5);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);
    
    // Animation loop
    animate();
}

function createRobloxCharacter() {
    character = new THREE.Group();
    
    // Materials with hacker theme
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00ff00,
        emissive: 0x002200,
        shininess: 100
    });
    
    const headMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00ff00,
        emissive: 0x003300,
        shininess: 100
    });
    
    const limbMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00cc00,
        emissive: 0x001100,
        shininess: 80
    });
    
    // Head (1x1x1 cube)
    const headGeometry = new THREE.BoxGeometry(1, 1, 1);
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2;
    character.add(head);
    
    // Add face details
    const eyeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.05);
    const leftEye = new THREE.Mesh(eyeGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    leftEye.position.set(-0.2, 2.1, 0.5);
    character.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    rightEye.position.set(0.2, 2.1, 0.5);
    character.add(rightEye);
    
    // Body (1x2x1 rectangle)
    const bodyGeometry = new THREE.BoxGeometry(1, 2, 0.5);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    character.add(body);
    
    // Arms (0.5x2x0.5 rectangles)
    const armGeometry = new THREE.BoxGeometry(0.3, 1.5, 0.3);
    
    const leftArm = new THREE.Mesh(armGeometry, limbMaterial);
    leftArm.position.set(-0.8, 0.5, 0);
    character.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, limbMaterial);
    rightArm.position.set(0.8, 0.5, 0);
    character.add(rightArm);
    
    // Legs (0.5x2x0.5 rectangles)
    const legGeometry = new THREE.BoxGeometry(0.4, 1.5, 0.4);
    
    const leftLeg = new THREE.Mesh(legGeometry, limbMaterial);
    leftLeg.position.set(-0.3, -1.25, 0);
    character.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, limbMaterial);
    rightLeg.position.set(0.3, -1.25, 0);
    character.add(rightLeg);
    
    scene.add(character);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate character
    if (character) {
        character.rotation.y += 0.01;
        character.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
        
        // Floating animation
        character.position.y = Math.sin(Date.now() * 0.002) * 0.2;
    }
    
    renderer.render(scene, camera);
}

// Matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

// Typing effect for hero text
function typeWriter() {
    const text = "Code • Hack • Create";
    const element = document.querySelector('.typing-text');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 1000);
}

// Smooth scrolling
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Form submission
function handleFormSubmission() {
    const form = document.querySelector('.contact-form form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Message encrypted and sent successfully!';
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 255, 0, 0.9);
            color: #000;
            padding: 2rem;
            border-radius: 10px;
            z-index: 10000;
            font-weight: bold;
            animation: fadeInOut 3s ease-in-out;
        `;
        
        // Add fade animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(successMessage);
        
        // Remove message after animation
        setTimeout(() => {
            successMessage.remove();
            style.remove();
        }, 3000);
        
        // Reset form
        form.reset();
    });
}

// Interactive hover effects
function addInteractiveEffects() {
    // Add glow effect to project cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.6)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 255, 0, 0.3)';
        });
    });
    
    // Add typing sound effect simulation (visual feedback)
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Visual feedback for "hacking"
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 200);
        });
    });
}

// Parallax scrolling effect
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.matrix-bg');
        
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init3DCharacter();
    createMatrixRain();
    typeWriter();
    smoothScroll();
    animateSkillBars();
    handleFormSubmission();
    addInteractiveEffects();
    parallaxEffect();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for quick access
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // ESC to reset view
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Console easter egg
console.log('%c Welcome to HackerHub! ', 'background: #00ff00; color: #000; font-size: 20px; font-weight: bold;');
console.log('%c Initializing hacking protocols... ', 'background: #000; color: #00ff00; font-size: 14px;');
console.log('%c Access granted. Welcome to the matrix. ', 'background: #000; color: #ff00ff; font-size: 14px;');
