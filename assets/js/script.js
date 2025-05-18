'use strict';



/**
 * navbar toggle
 */

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
});

/**
 * toggle the navbar when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}





/**
 * back to top & header
 */

const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

// Modal functionality for Terms & Conditions and Privacy Policy
document.addEventListener('DOMContentLoaded', function () {

  // Terms & Conditions modal elements
  const termsModal = document.getElementById("termsModal");
  const termsLink = document.getElementById("termsLink");
  const closeTermsModal = document.querySelector("#termsModal .close-modal");

  // Privacy Policy modal elements
  const privacyModal = document.getElementById("privacyModal");
  const privacyLink = document.getElementById("privacyLink");
  const closePrivacyModal = document.querySelector(".close-modal-privacy");

  // Terms & Conditions modal functionality
  if (termsModal && termsLink && closeTermsModal) {
    // Show modal when Terms & Conditions link is clicked
    termsLink.addEventListener("click", function (e) {
      e.preventDefault();
      termsModal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    });

    // Close modal when X is clicked
    closeTermsModal.addEventListener("click", function () {
      termsModal.style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
    });
  }

  // Privacy Policy modal functionality
  if (privacyModal && privacyLink && closePrivacyModal) {
    // Show modal when Privacy Policy link is clicked
    privacyLink.addEventListener("click", function (e) {
      e.preventDefault();
      privacyModal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    });

    // Close modal when X is clicked
    closePrivacyModal.addEventListener("click", function () {
      privacyModal.style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
    });
  }

  // Close modals when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target === termsModal) {
      termsModal.style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
    if (event.target === privacyModal) {
      privacyModal.style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
  });

  // Close modals with Escape key
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (termsModal.style.display === "block") {
        termsModal.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scrolling
      }
      if (privacyModal.style.display === "block") {
        privacyModal.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scrolling
      }
    }
  });

  // Modern sonsuz card stack swipe
  (function () {
    const stack = document.querySelector('.card-stack');
    if (!stack) return;
    const indicator = document.querySelector('.stack-indicator');
    let cards = Array.from(stack.children);
    let zBase = 10;

    function updateStack() {
      cards = Array.from(stack.children);
      cards.forEach((card, i) => {
        card.style.transition = 'transform 0.35s cubic-bezier(.4,2,.6,1), opacity 0.3s';
        card.classList.remove('removed');
        card.style.zIndex = zBase - i;
        card.style.opacity = i > 2 ? 0 : 1;
        card.style.pointerEvents = i === 0 ? 'auto' : 'none';
        card.setAttribute('data-index', i);
        if (i === 0) {
          card.style.transform = 'none';
        } else if (i === 1) {
          card.style.transform = 'scale(0.95) translateY(20px)';
        } else if (i === 2) {
          card.style.transform = 'scale(0.9) translateY(40px)';
        } else {
          card.style.transform = 'scale(0.9) translateY(60px)';
        }
      });
      // Indicator
      if (indicator) {
        indicator.innerHTML = '';
        cards.forEach((_, i) => {
          const dot = document.createElement('span');
          if (i === 0) dot.classList.add('active');
          indicator.appendChild(dot);
        });
      }
      attachCardEvents();
    }

    let startX = 0, currentX = 0, dragging = false;
    function onPointerDown(e) {
      if (cards.length === 0) return;
      dragging = true;
      startX = e.type.startsWith('touch') ? (e.touches[0]?.clientX ?? 0) : e.clientX;
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
      document.addEventListener('touchmove', onPointerMove, { passive: false });
      document.addEventListener('touchend', onPointerUp);
    }
    function onPointerMove(e) {
      if (!dragging) return;
      currentX = e.type.startsWith('touch') ? (e.touches[0]?.clientX ?? 0) : e.clientX;
      const dx = currentX - startX;
      const card = cards[0];
      if (card) {
        card.style.transition = 'none';
        card.style.transform = `translateX(${dx}px) rotate(${dx / 15}deg)`;
      }
    }
    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      const dx = currentX - startX;
      const card = cards[0];
      if (card) {
        if (Math.abs(dx) > 80) {
          swipeCard(card, dx > 0 ? 1 : -1);
        } else {
          card.style.transition = 'transform 0.35s cubic-bezier(.4,2,.6,1)';
          card.style.transform = '';
        }
      }
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchend', onPointerUp);
    }
    function swipeCard(card, dir) {
      card.style.transition = 'transform 0.35s cubic-bezier(.4,2,.6,1), opacity 0.3s';
      card.style.transform = `translateX(${dir * 1200}px) rotate(${dir * 30}deg)`;
      card.classList.add('removed');
      setTimeout(() => {
        card.classList.remove('removed');
        card.style.transition = 'none';
        card.style.transform = '';
        stack.appendChild(card); // Sonsuz döngü için kartı sona taşı
        updateStack();
      }, 350);
    }
    function attachCardEvents() {
      cards.forEach((card, i) => {
        card.onpointerdown = null;
        card.ontouchstart = null;
        if (i === 0) {
          card.onpointerdown = function (e) {
            e.stopPropagation();
            onPointerDown(e);
          };
          card.ontouchstart = function (e) {
            e.stopPropagation();
            onPointerDown(e);
          };
        }
      });
    }
    updateStack();
  })();

  // Remove Unsplash integration and restore static blog card stack
  // No dynamic population, just use static HTML for cards
});