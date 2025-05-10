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
document.addEventListener('DOMContentLoaded', function() {
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
    termsLink.addEventListener("click", function(e) {
      e.preventDefault();
      termsModal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    });

    // Close modal when X is clicked
    closeTermsModal.addEventListener("click", function() {
      termsModal.style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
    });
  }

  // Privacy Policy modal functionality
  if (privacyModal && privacyLink && closePrivacyModal) {
    // Show modal when Privacy Policy link is clicked
    privacyLink.addEventListener("click", function(e) {
      e.preventDefault();
      privacyModal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
    });

    // Close modal when X is clicked
    closePrivacyModal.addEventListener("click", function() {
      privacyModal.style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
    });
  }

  // Close modals when clicking outside the modal content
  window.addEventListener("click", function(event) {
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
  window.addEventListener("keydown", function(event) {
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
});