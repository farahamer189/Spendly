const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const mascot = document.getElementById("mascot");

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "🙈";
        mascot.textContent = "👀";
    } else {
        password.type = "password";
        togglePassword.textContent = "👀";
        mascot.textContent = "🙈";
    }

});