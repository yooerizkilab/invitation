$(document).ready(function() {
    // Initialize AOS animation
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Open invitation button
    $('#openInvitation').on('click', function() {
        $('#cover').fadeOut(1000);
        $('#invitation-content').fadeIn(1000, function() {
            // Initialize Fullpage.js after content is shown
            initFullPage();
        });
        
        // Start background music
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            bgMusic.play().catch(error => {
                console.log('Autoplay prevented by browser policy. User needs to interact with the document first.');
            });
            $('#music-toggle').addClass('playing');
        }
    });

    // Music toggle
    $('#music-toggle').on('click', function() {
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic.paused) {
            bgMusic.play();
            $(this).addClass('playing');
        } else {
            bgMusic.pause();
            $(this).removeClass('playing');
        }
    });

    // Initialize Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': "Foto %1 dari %2",
        'fadeDuration': 300
    });

    // Initialize Clipboard.js for copy functionality
    new ClipboardJS('.copy-btn');
    
    // Handle copy button click
    $('.copy-btn').on('click', function() {
        const originalText = $(this).html();
        $(this).html('<i class="fas fa-check me-1"></i>Tersalin');
        
        setTimeout(() => {
            $(this).html(originalText);
        }, 2000);
    });

    // Initialize Fullpage.js
    function initFullPage() {
        // Define section IDs in order
        const sections = [
            '.section-wedding-title',
            '.section-bride-groom',
            '.section-event',
            '.section-gallery',
            '.section-wishes',
            '.section-location',
            '.section-gift',
            '.section-footer'
        ];
        
        // Initialize fullpage
        $('#fullpage').fullpage({
            sectionSelector: '.section',
            scrollingSpeed: 1000,
            autoScrolling: true,
            fitToSection: true,
            navigation: false,
            responsiveWidth: 768,
            afterLoad: function(origin, destination, direction) {
                // Update custom navigation dots
                $('.fp-nav-custom li').removeClass('active');
                $('.fp-nav-custom li[data-target="' + destination.index + '"]').addClass('active');
                
                // Activate animations for current section
                $(destination.item).find('[data-aos]').addClass('aos-animate');
            },
            onLeave: function(origin, destination, direction) {
                // Remove animations from leaving section
                $(origin.item).find('[data-aos]').removeClass('aos-animate');
            }
        });
        
        // Custom navigation click
        $('.fp-nav-custom li').on('click', function() {
            const target = $(this).data('target');
            $.fn.fullpage.moveTo(target + 1);
        });
        
        // Activate first section animations
        setTimeout(function() {
            $('.section').first().find('[data-aos]').addClass('aos-animate');
        }, 500);
    }

    // Countdown timer
    function updateCountdown() {
        const weddingDate = new Date("June 15, 2025 08:00:00").getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        // If countdown is over
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
        }
    }

    // Update countdown every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Wishes form submit handler
    $('#wishForm').on('submit', function(e) {
        e.preventDefault();
        
        const name = $('#wishName').val();
        const attendance = $('#wishAttendance').val() || 'Belum Pasti';
        const message = $('#wishMessage').val();
        
        // Format the date in Indonesian
        const now = new Date();
        const day = now.getDate();
        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        const month = monthNames[now.getMonth()];
        const year = now.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;
        
        let attendanceClass = 'belum-pasti';
        if (attendance === 'Hadir') {
            attendanceClass = 'hadir';
        } else if (attendance === 'Tidak Hadir') {
            attendanceClass = 'tidak-hadir';
        }
        
        const wishHtml = `
            <div class="wish-item">
                <div class="wish-header">
                    <h5>${name}</h5>
                    <span class="attendance-badge ${attendanceClass}">${attendance}</span>
                    <span class="wish-date">${formattedDate}</span>
                </div>
                <p>${message}</p>
            </div>
        `;
        
        // Add to the top of the list
        $('#wishesList').prepend(wishHtml);
        
        // Reset form
        this.reset();
    });

    // Get URL parameters to display guest name
    function getURLParameter(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    // Set guest name from URL parameter
    const guestName = getURLParameter('to');
    if (guestName) {
        $('#guestName').text(decodeURIComponent(guestName.replace(/\+/g, ' ')));
    }

    // Handle responsive behavior - check if on mobile
    function isMobile() {
        return window.innerWidth < 768;
    }

    // Apply responsive settings on window resize
    $(window).on('resize', function() {
        if ($.fn.fullpage) {
            if (isMobile()) {
                $.fn.fullpage.setResponsive(true);
            } else {
                $.fn.fullpage.setResponsive(false);
            }
        }
    });

    // Animated entrance for cover section
    setTimeout(function() {
        $('#cover .container').animate({ opacity: 1 }, 1000);
    }, 500);
});