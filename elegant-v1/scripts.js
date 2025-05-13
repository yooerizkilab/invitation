// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom'
    });

// Copy to clipboard for gift
const copyButtons = document.querySelectorAll('.gift-copy');

copyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-clipboard');
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Temporary change button text to indicate success
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Tersalin';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
            }, 2000);
        });
    });
});

// Add parallax effect to sections
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const scrollPosition = window.scrollY;
        const sectionOffset = section.offsetTop;
        const distance = scrollPosition - sectionOffset;
        
        if (Math.abs(distance) < window.innerHeight) {
            const decoration = section.querySelector('.section-decoration.top');
            if (decoration) {
                decoration.style.transform = `translateY(${distance * 0.1}px)`;
            }
        }
    });
});

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            if (!element.classList.contains('aos-animate')) {
                element.classList.add('aos-animate');
            }
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Add falling flower petals animation to welcome page
function createPetal() {
    const welcomePage = document.getElementById('welcome');
    const petal = document.createElement('div');
    petal.classList.add('flower-petal');
    
    // Randomize petal properties
    const size = Math.random() * 15 + 10;
    const positionX = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    const rotation = Math.random() * 360;
    
    // Set petal styles
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${positionX}%`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.transform = `rotate(${rotation}deg)`;
    petal.style.backgroundColor = `hsl(${Math.random() * 30 + 340}, 100%, 80%, 0.7)`;
    petal.style.borderRadius = '50% 0 50% 50%';
    
    // Add petal to welcome page
    welcomePage.appendChild(petal);
    
    // Remove petal after animation completes
    setTimeout(() => {
        petal.remove();
    }, duration * 1000 + delay * 1000);
}

// Create petals at regular intervals
function createPetals() {
    const welcomePage = document.getElementById('welcome');
    if (welcomePage.style.display !== 'none') {
        for (let i = 0; i < 3; i++) {
            createPetal();
        }
    }
}

setInterval(createPetals, 1000);

// Add CSS for petals
const petalStyles = document.createElement('style');
petalStyles.innerHTML = `
    .flower-petal {
        position: absolute;
        top: -20px;
        z-index: 1;
        animation: falling linear forwards;
        pointer-events: none;
    }
    
    @keyframes falling {
        0% {
            transform: translateY(0) rotate(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg) translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(petalStyles);
});

// Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-container');
    setTimeout(function() {
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Open Invitation with Envelope Animation
const welcomePage = document.getElementById('welcome');
const detailPage = document.getElementById('detail');
const openInvitationBtn = document.getElementById('open-invitation');
const envelope = document.querySelector('.envelope');

// Add envelope opening animation when page loads
window.addEventListener('load', function() {
    setTimeout(function() {
        if (envelope) {
            envelope.classList.add('open');
        }
    }, 2000);
});

openInvitationBtn.addEventListener('click', function() {
    // Close envelope first
    if (envelope) {
        envelope.classList.remove('open');
        
        // Wait for envelope to close before transitioning
        setTimeout(function() {
            // Then fade out the welcome page
            welcomePage.classList.add('animate__animated', 'animate__fadeOutUp');
            
            setTimeout(function() {
                welcomePage.style.display = 'none';
                detailPage.style.display = 'block';
                detailPage.classList.add('page-transition');
                playMusic();
                
                // Apply entrance animations to sections
                const sections = document.querySelectorAll('.section');
                sections.forEach((section, index) => {
                    section.style.animationDelay = (index * 0.3) + 's';
                });
                
                // Trigger AOS refresh
                setTimeout(function() {
                    AOS.refresh();
                }, 500);
            }, 1000);
        }, 800);
    } else {
        // Fallback if envelope not found
        welcomePage.classList.add('animate__animated', 'animate__fadeOutUp');
        
        setTimeout(function() {
            welcomePage.style.display = 'none';
            detailPage.style.display = 'block';
            detailPage.classList.add('page-transition');
            playMusic();
            
            // Apply entrance animations to sections
            const sections = document.querySelectorAll('.section');
            sections.forEach((section, index) => {
                section.style.animationDelay = (index * 0.3) + 's';
            });
            
            // Trigger AOS refresh
            setTimeout(function() {
                AOS.refresh();
            }, 500);
        }, 1000);
    }
});

// Scroll Indicator
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-indicator-bar').style.width = scrolled + '%';
    
    // Show elements as user scrolls
    revealOnScroll();
});

// Reveal elements on scroll
function revealOnScroll() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - revealPoint) {
            if (!section.classList.contains('active')) {
                section.classList.add('active');
                AOS.refresh();
            }
        }
    });
}

// Countdown Timer
const weddingDate = new Date('June 12, 2025 11:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('countdown-days').innerText = days.toString().padStart(2, '0');
    document.getElementById('countdown-hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('countdown-minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('countdown-seconds').innerText = seconds.toString().padStart(2, '0');
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown-days').innerText = '00';
        document.getElementById('countdown-hours').innerText = '00';
        document.getElementById('countdown-minutes').innerText = '00';
        document.getElementById('countdown-seconds').innerText = '00';
    }
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// Smooth scroll to sections
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
let currentImageIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('.gallery-image').src;
        modalImage.src = imgSrc;
        modal.style.display = 'flex';
        currentImageIndex = index;
        document.body.style.overflow = 'hidden';
        
        // Add animation to modal
        modal.classList.add('animate__animated', 'animate__fadeIn');
        modalImage.classList.add('animate__animated', 'animate__zoomIn');
    });
});

modalClose.addEventListener('click', function() {
    modal.classList.add('animate__animated', 'animate__fadeOut');
    modalImage.classList.add('animate__animated', 'animate__zoomOut');
    
    setTimeout(function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.classList.remove('animate__animated', 'animate__fadeOut');
        modalImage.classList.remove('animate__animated', 'animate__zoomOut');
    }, 500);
});

modalPrev.addEventListener('click', function() {
    modalImage.classList.add('animate__animated', 'animate__fadeOutRight');
    
    setTimeout(function() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        modalImage.src = galleryItems[currentImageIndex].querySelector('.gallery-image').src;
        modalImage.classList.remove('animate__fadeOutRight');
        modalImage.classList.add('animate__fadeInLeft');
        
        setTimeout(function() {
            modalImage.classList.remove('animate__animated', 'animate__fadeInLeft');
        }, 500);
    }, 300);
});

modalNext.addEventListener('click', function() {
    modalImage.classList.add('animate__animated', 'animate__fadeOutLeft');
    
    setTimeout(function() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        modalImage.src = galleryItems[currentImageIndex].querySelector('.gallery-image').src;
        modalImage.classList.remove('animate__fadeOutLeft');
        modalImage.classList.add('animate__fadeInRight');
        
        setTimeout(function() {
            modalImage.classList.remove('animate__animated', 'animate__fadeInRight');
        }, 500);
    }, 300);
});

// Music Player
const musicPlayer = document.getElementById('music-player');
let isPlaying = false;
// Get audio file from assets
let audio = new Audio('assets/audio/romantic-dreams-155789.mp3'); 
audio.loop = true;

function playMusic() {
    audio.play().catch(e => {
        console.log('Autoplay prevented, user interaction needed:', e);
    });
    isPlaying = true;
    musicPlayer.innerHTML = '<i class="fas fa-pause"></i>';
    musicPlayer.classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
}

function pauseMusic() {
    audio.pause();
    isPlaying = false;
    musicPlayer.innerHTML = '<i class="fas fa-music"></i>';
    musicPlayer.classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
}

musicPlayer.addEventListener('click', function() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// Comments Form
const commentForm = document.getElementById('submit-comment');
const commentsList = document.getElementById('comments-list');

commentForm.addEventListener('click', function() {
    const name = document.getElementById('comment-name').value;
    const message = document.getElementById('comment-message').value;
    
    if (name && message) {
        // Get today's date
        const today = new Date();
        const day = today.getDate();
        const month = today.toLocaleString('id-ID', { month: 'long' });
        const year = today.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;
        
        // Create comment
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item animate__animated animate__fadeInUp';
        commentItem.innerHTML = `
            <div class="comment-header">
                <div class="comment-name">${name}</div>
                <div class="comment-date">${formattedDate}</div>
            </div>
            <div class="comment-message">
                ${message}
            </div>
        `;
        
        // Add to list
        commentsList.prepend(commentItem);
        
        // Clear form
        document.getElementById('comment-name').value = '';
        document.getElementById('comment-message').value = '';
    } else {
        alert('Silakan isi nama dan pesan Anda');
    }
});