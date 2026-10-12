
/* =========================
   Spendly Theme Manager
========================= */

(() => {
    const THEME_KEY = "spendlyTheme";

    // Supports both Login and Signup markup
    const lamp = document.querySelector("#theme-lamp, .theme-lamp");
    const cord = document.querySelector("#lamp-cord");

    let pullTimer;

    function getSavedTheme() {
        try {
            return localStorage.getItem(THEME_KEY) || "light";
        } catch (error) {
            return "light";
        }
    }

    function applyTheme(theme) {
        const isDark = theme === "dark";

        document.body.classList.toggle("night-mode", isDark);
        document.documentElement.style.colorScheme =
            isDark ? "dark" : "light";

        if (cord) {
            const label = isDark
                ? "Switch to light mode"
                : "Switch to dark mode";

            cord.setAttribute("aria-label", label);
            cord.setAttribute("title", label);
        }

        document.dispatchEvent(
            new CustomEvent("spendlyThemeChanged", {
                detail: { theme }
            })
        );
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            // Theme remains active for the current page.
        }
    }

    function toggleTheme() {
        const isDark = document.body.classList.contains("night-mode");
        const nextTheme = isDark ? "light" : "dark";

        if (lamp) {
            lamp.classList.add("pulling");
            clearTimeout(pullTimer);

            pullTimer = setTimeout(() => {
                lamp.classList.remove("pulling");
            }, 350);
        }

        applyTheme(nextTheme);
        saveTheme(nextTheme);
    }

    applyTheme(getSavedTheme());

    if (cord) {
        cord.addEventListener("click", toggleTheme);
    }
})();
