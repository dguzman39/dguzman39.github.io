// Smooth Scrolling with Error Handling
const sections = document.querySelectorAll(".section");

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const darkIcon = document.getElementById("dark-icon");
  const lightIcon = document.getElementById("light-icon");
  const backToTopButton = document.getElementById("back-to-top");
  const projectsSection = document.querySelector("#projects");

  // Function to handle dark mode logic
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    darkIcon.style.display = isDark ? "none" : "inline";
    lightIcon.style.display = isDark ? "inline" : "none";

    // Update aria-label dynamically for better accessibility
    darkModeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    // Add visual feedback for theme transition
    document.body.style.transition = "background-color 0.5s ease, color 0.5s ease";
    setTimeout(() => {
      document.body.style.transition = "";
    }, 500);
  };

  // Initialize dark mode based on localStorage
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    darkIcon.style.display = "none";
    lightIcon.style.display = "inline";
  }

  // Attach event listeners
  darkModeToggle.addEventListener("click", toggleDarkMode);
  darkModeToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Prevent default button behavior for keyboard events
      toggleDarkMode();
    }
  });

  // Ensure the page loads at the top by default
  const savedSection = localStorage.getItem("activeSection");
  if (!savedSection || !document.querySelector(`#${savedSection}`)) {
    // Scroll to the top (homepage) if no valid saved section exists
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Function to check if projects section is in view
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  };

  // Show or hide the back-to-top button based on projects section visibility
  window.addEventListener("scroll", () => {
    if (isElementInViewport(projectsSection)) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  // Smooth scroll to top when back-to-top button is clicked
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Skill Popup Logic with Position Detection and Progress Bar Animation
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((skill) => {
    const popup = skill.querySelector(".popup");
    const progressBar = popup.querySelector(".progress-bar");
    const proficiency = skill.getAttribute("data-proficiency");

    skill.addEventListener("mouseenter", () => {
      // Set the progress bar width
      progressBar.style.width = `${proficiency}%`;

      // Calculate position dynamically
      const skillRect = skill.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();

      // Determine if the popup should be on top or bottom
      if (skillRect.top < popupRect.height) {
        popup.classList.remove("top");
        popup.classList.add("bottom");
      } else {
        popup.classList.remove("bottom");
        popup.classList.add("top");
      }

      // Show the popup
      popup.style.opacity = "1";
      popup.style.visibility = "visible";
    });

    skill.addEventListener("mouseleave", () => {
      // Hide the popup and reset the progress bar
      popup.style.opacity = "0";
      popup.style.visibility = "hidden";
      progressBar.style.width = "0";
    });
  });
});

// Save Active Section in Local Storage
window.addEventListener("beforeunload", () => {
  const activeSection = document.querySelector(".section");
  if (activeSection) {
    localStorage.setItem("activeSection", activeSection.getAttribute("id"));
  }
});
