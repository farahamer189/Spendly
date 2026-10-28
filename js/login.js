
/* ==============================
   Spendly Login
============================== */

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const togglePasswordButton = document.querySelector("#toggle-password");
const loginMessage = document.querySelector("#login-message");
const loginButton = document.querySelector("#login-button");
const loginAvatar = document.querySelector("#login-avatar");

let currentMessageKey = "";

/* ==============================
   Translation Helper
============================== */

function loginTranslate(key) {
    if (typeof window.spendlyTranslate === "function") {
        return window.spendlyTranslate(key);
    }

    return key;
}

/* ==============================
   Live Email Initial Avatar
============================== */

function updateLoginAvatar() {
    if (!loginAvatar || !emailInput) return;

    // Always keep the circle visible.
    loginAvatar.hidden = false;

    const email = emailInput.value.trim();

    // Show the first character of the email.
    // Leave the circle empty when the email is cleared.
    loginAvatar.textContent = email
        ? email.charAt(0).toLocaleUpperCase()
        : "";

    loginAvatar.setAttribute(
        "aria-label",
        email
            ? `Email initial: ${email.charAt(0).toLocaleUpperCase()}`
            : "Empty user avatar"
    );

    loginAvatar.title = email || "User avatar";
}

// Show the empty circle as soon as the page loads.
updateLoginAvatar();

// Update the avatar while typing or deleting the email.
emailInput?.addEventListener("input", updateLoginAvatar);

/* ==============================
   Show / Hide Password
============================== */

if (togglePasswordButton && passwordInput) {
    togglePasswordButton.addEventListener("click", () => {
        const shouldShow = passwordInput.type === "password";

        passwordInput.type = shouldShow ? "text" : "password";
        togglePasswordButton.textContent = shouldShow ? "🙈" : "👀";

        const key = shouldShow ? "hidePassword" : "showPassword";

        togglePasswordButton.setAttribute(
            "aria-label",
            loginTranslate(key)
        );

        togglePasswordButton.setAttribute(
            "title",
            loginTranslate(key)
        );
    });
}

/* ==============================
   Display Messages
============================== */

function showLoginMessage(messageKey, type) {
    if (!loginMessage) return;

    currentMessageKey = messageKey;

    loginMessage.textContent = loginTranslate(messageKey);
    loginMessage.className = `login-message ${type}`;
    loginMessage.hidden = false;
}

function clearLoginMessage() {
    if (!loginMessage) return;

    currentMessageKey = "";

    loginMessage.textContent = "";
    loginMessage.className = "login-message";
    loginMessage.hidden = true;
}

/* ==============================
   Refresh Text After Language Change
============================== */

function refreshLoginTranslations() {
    if (currentMessageKey && loginMessage && !loginMessage.hidden) {
        const type = loginMessage.classList.contains("error")
            ? "error"
            : "success";

        showLoginMessage(currentMessageKey, type);
    }

    if (togglePasswordButton && passwordInput) {
        const key = passwordInput.type === "text"
            ? "hidePassword"
            : "showPassword";

        togglePasswordButton.setAttribute(
            "aria-label",
            loginTranslate(key)
        );

        togglePasswordButton.setAttribute(
            "title",
            loginTranslate(key)
        );
    }
}

document.addEventListener(
    "languageChanged",
    refreshLoginTranslations
);

document.addEventListener(
    "spendlyLanguageChanged",
    refreshLoginTranslations
);

/* ==============================
   Login Validation
============================== */

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearLoginMessage();

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        if (!email || !password) {
            showLoginMessage("loginEmptyFields", "error");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showLoginMessage("loginInvalidEmail", "error");
            return;
        }

        let savedUser;

        try {
            const storedUser = localStorage.getItem("spendlyUser");

            if (!storedUser) {
                showLoginMessage("loginNoAccountFound", "error");
                return;
            }

            savedUser = JSON.parse(storedUser);
        } catch (error) {
            showLoginMessage("loginNoAccountFound", "error");
            return;
        }

        if (!savedUser?.email || savedUser.password == null) {
            showLoginMessage("loginNoAccountFound", "error");
            return;
        }

        const savedEmail = String(savedUser.email)
            .trim()
            .toLowerCase();

        const savedPassword = String(savedUser.password);

        if (email !== savedEmail || password !== savedPassword) {
            showLoginMessage("loginWrongPassword", "error");
            return;
        }

        try {
            localStorage.setItem("spendlyLoggedIn", "true");
        } catch (error) {
            showLoginMessage("loginWrongPassword", "error");
            return;
        }

        showLoginMessage("loginSuccess", "success");

        if (loginButton) {
            loginButton.disabled = true;
        }

        setTimeout(() => {
            window.location.href = "daily.html";
        }, 900);
    });
}

/* ==============================
   Clear Messages When Editing
============================== */

emailInput?.addEventListener("input", clearLoginMessage);
passwordInput?.addEventListener("input", clearLoginMessage);
