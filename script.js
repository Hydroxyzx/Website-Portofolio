// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Tutup menu mobile jika terbuka
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        // Hapus class active dari semua menu
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Tambah class active ke menu yang diklik
        this.classList.add('active');
        
        // Scroll ke section
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Tambahkan observer untuk section yang sedang aktif
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section, .project-card, .about-content');
    const windowHeight = window.innerHeight;
    const triggerPoint = 100; // Jarak dari bawah viewport saat animasi dipicu
    
    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const elementHeight = element.offsetHeight;
        
        // Jika elemen masuk viewport (dengan buffer)
        if (elementPosition < windowHeight - triggerPoint) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transitionDelay = `${index * 0.1}s`; // Delay bertahap
        }
        // Jika elemen keluar viewport (opsional, untuk reset animasi)
        else if (elementPosition > windowHeight) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.section, .project-card, .about-content').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Jalankan saat load dan scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('resize', animateOnScroll); // Juga jalankan saat resize

/// Typing Animation for Profession
const typingProfession = document.querySelector('.typing-profession');
const professionContainer = document.querySelector('.profession-container');
const professions = [
    "UI/UX Designer",
    "Frontend Developer", 
    "Full Stack Developer",
    "Web Developer",
    "Digital Creator",
    "Software Developer"
];

// Hitung lebar maksimal untuk container
let maxWidth = 0;
professions.forEach(profession => {
    // Buat elemen sementara untuk mengukur lebar
    const temp = document.createElement('span');
    temp.textContent = profession;
    temp.style.visibility = 'hidden';
    temp.style.position = 'absolute';
    temp.style.whiteSpace = 'nowrap';
    document.body.appendChild(temp);
    maxWidth = Math.max(maxWidth, temp.offsetWidth);
    document.body.removeChild(temp);
});

// Set lebar container
professionContainer.style.width = `${maxWidth}px`;

let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeProfession() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
        typingProfession.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingProfession.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true;
        setTimeout(typeProfession, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        setTimeout(typeProfession, 500);
    } else {
        const typingSpeed = isDeleting ? 50 : 150;
        setTimeout(typeProfession, typingSpeed);
    }
}

window.addEventListener('load', () => {
    typingProfession.classList.add('typing-cursor');
    setTimeout(typeProfession, 1000);
});

// Hide/Show Header on Scroll
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 100) {
        // Jika di paling atas, tampilkan header
        header.classList.remove('scroll-down');
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll ke bawah - sembunyikan header
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll ke atas - tampilkan header
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Run once on page load
animateOnScroll();

// Run on scroll
window.addEventListener('scroll', animateOnScroll);