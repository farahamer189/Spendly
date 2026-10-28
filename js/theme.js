/* =========================
   Spendly Theme Manager
========================= */

(() => {
    const THEME_KEY = "spendlyTheme";

    function getSavedTheme() {
        try {
            return localStorage.getItem(THEME_KEY) || "light";
        } catch (error) {
            return "light";
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            // Keep current selection
        }
    }

    function applyTheme(theme) {
        const isDark = theme === "dark";

        document.body.classList.toggle("night-mode", isDark);
        document.documentElement.style.colorScheme = isDark ? "dark" : "light";

        console.log("Applied Theme:", theme, "| body class:", document.body.className);
    }

    function toggleTheme() {
        const isDark = document.body.classList.contains("night-mode");
        const nextTheme = isDark ? "light" : "dark";

        console.log("Toggling theme from", isDark ? "dark" : "light", "to", nextTheme);

        const lamp = document.querySelector(".theme-lamp");
        if (lamp) {
            lamp.classList.add("pulling");
            setTimeout(() => {
                lamp.classList.remove("pulling");
            }, 350);
        }

        applyTheme(nextTheme);
        saveTheme(nextTheme);
    }

    // Apply saved theme immediately
    document.addEventListener("DOMContentLoaded", () => {
        applyTheme(getSavedTheme());
    });

    // Universal Click Listener
    document.addEventListener("click", (event) => {
        const lamp = event.target.closest(".theme-lamp, #lamp-cord, .lamp-cord, .cord-handle");
        if (lamp) {
            console.log("Lamp element clicked!", event.target);
            toggleTheme();
        }
    });
})();