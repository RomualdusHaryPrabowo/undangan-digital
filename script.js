// Initialize AOS
AOS.init({
    duration: 1000,
    once: false
});

// --- KODE MUSIK DAN ELEMEN UTAMA ---
const backgroundMusic = document.getElementById('backgroundMusic');
const musicPlayer = document.getElementById('musicPlayer');
const bukaUndanganBtn = document.getElementById('bukaUndanganBtn');
let isPlaying = false;

if (bukaUndanganBtn) {
    // 1. Fungsi untuk memutar musik saat "Buka Undangan" diklik
    bukaUndanganBtn.addEventListener('click', function() {
        backgroundMusic.play();
        isPlaying = true;
        musicPlayer.classList.add('playing');
        scrollToSection('couple'); // Panggil fungsi scroll
    });
}

// 2. Fungsi untuk tombol play/pause
musicPlayer.addEventListener('click', function() {
    if (isPlaying) {
        backgroundMusic.pause();
        this.classList.remove('playing');
        isPlaying = false;
    } else {
        backgroundMusic.play();
        this.classList.add('playing');
        isPlaying = true;
    }
});
// --- AKHIR KODE MUSIK ---

// Loading Screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Countdown Timer
function updateCountdown() {
    // Pastikan tanggal di sini sudah benar
    const weddingDate = new Date('November 16, 2025 08:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Copy to Clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Show notification
    showNotification('Nomor rekening telah disalin!');
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '100px';
    notification.style.right = '30px';
    notification.style.backgroundColor = 'var(--accent-color)';
    notification.style.color = 'var(--secondary-color)';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '30px';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Open Map
// Open Map
function openMap(location) {
    // Mengubah lokasi (koordinat) menjadi format URL
    const encodedLocation = encodeURIComponent(location);
    
    // Membuat URL Google Maps dengan parameter 'q'
    // 'q' bisa menerima teks pencarian ATAU koordinat
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    
    // Membuka URL tersebut di tab baru
    window.open(mapUrl, '_blank');
}

// Scroll to Section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 70,
            behavior: 'smooth'
        });
    }
}

// Gallery Lightbox (Simple Implementation)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        // In a real application, this would open a lightbox
        alert(`Membuka gambar dalam lightbox: ${imgSrc}`);
    });
});