const slides = document.querySelectorAll(".wedding-slide");
const nextButton = document.getElementById("nextSlide");
const prevButton = document.getElementById("prevSlide");
const slideCounter = document.getElementById("slideCounter");
const dots = document.querySelectorAll(".dot");
const navLinks = document.querySelectorAll(".slide-link");
const navMenu = document.getElementById("navMenu");
let currentSlide = 0;
function showSlide(index) {
    if (index < 0) {
        index = 0;
    }
    if (index >= slides.length) {
        index = slides.length - 1;
    }
    currentSlide = index;
    slides.forEach(function (slide, i) {
        slide.classList.toggle("active", i === currentSlide);
        if (i === currentSlide) {
            slide.scrollTop = 0;
        }
    });
    slideCounter.textContent =
        String(currentSlide + 1).padStart(2, "0") +
        " / " +
        String(slides.length).padStart(2, "0");
    dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === currentSlide);
    });
    navLinks.forEach(function (link, i) {
        link.classList.toggle("active", i === currentSlide);
    });
    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === slides.length - 1;
}
nextButton.addEventListener("click", function () {
    showSlide(currentSlide + 1);
});
prevButton.addEventListener("click", function () {
    showSlide(currentSlide - 1);
});
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        const index = Number(link.dataset.slide);
        showSlide(index);
        const menu = bootstrap.Collapse.getInstance(navMenu);
        if (menu) {
            menu.hide();
        }
    });
});
dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
        showSlide(Number(dot.dataset.slide));
    });
})
document.getElementById("brandHome").addEventListener("click", function (event) {
    event.preventDefault();
    showSlide(0);
});
document.addEventListener("keydown", function (event) {
    const tag = document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        return;
    }
    if (event.key === "ArrowRight") {
        showSlide(currentSlide + 1);
    }
    if (event.key === "ArrowLeft") {
        showSlide(currentSlide - 1);
    }
});
let touchStartX = 0;
let touchStartY = 0;
document.getElementById("slideContainer").addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
}, { passive: true });
document.getElementById("slideContainer").addEventListener("touchend", function (event) {
    const touchEndX = event.changedTouches[0].screenX;
    const touchEndY = event.changedTouches[0].screenY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    if (Math.abs(deltaX) > 65 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
            showSlide(currentSlide + 1);
        } else {
            showSlide(currentSlide - 1);
        }
    }
}, { passive: true });
showSlide(0);
//tmbl buka undngn
document.getElementById("openInvitation").addEventListener("click", function () {
    showSlide(1);
});

const weddingDate = new Date("2027-06-12T08:00:00+07:00").getTime();
function updateCountdown() {
    const now = Date.now();
    const difference = weddingDate - now;
    const countdown = document.getElementById("countdown");
    if (difference <= 0) {
        countdown.innerHTML = "<h3>Hari bahagia kami telah tiba!</h3>";
        return;
    }
    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
        (difference / 1000) % 60
    );
    document.getElementById("days").textContent =
        String(days).padStart(3, "0");
    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);
const rsvpForm = document.getElementById("rsvpForm");
const rsvpResult = document.getElementById("rsvpResult");
rsvpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const attendance = document.getElementById("attendance").value;
    const guestCount = document.getElementById("guestCount").value;
    const message = document.getElementById("message").value.trim();
    if (!name || !attendance) {
        alert("Mohon lengkapi nama dan konfirmasi kehadiran.");
        return;
    }
    const card = document.createElement("div");
    card.className = "result-card";
    const heading = document.createElement("h5");
    heading.textContent = "Terima kasih, " + name + "!";
    const attendanceText = document.createElement("p");
    attendanceText.textContent = "Konfirmasi: " + attendance;
    const guestText = document.createElement("p");
    guestText.textContent = "Jumlah tamu: " + guestCount + " orang";
    const messageText = document.createElement("p");
    messageText.textContent = "Pesan: " + (message || "-");
    card.append(heading, attendanceText, guestText, messageText);
    rsvpResult.replaceChildren(card);
    rsvpForm.reset();
});