/* =========================
   Password Toggle
========================= */

const password =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");


if (togglePassword && password) {

    togglePassword.addEventListener(
        "click",
        function () {

            if (password.type === "password") {

                password.type = "text";

                togglePassword.textContent = "🙈";

            } else {

                password.type = "password";

                togglePassword.textContent = "👀";

            }

        }
    );

}


/* =========================
   Live Avatar
========================= */

const nameInput =
    document.getElementById("name");

const profileAvatar =
    document.getElementById("profile-avatar");


if (nameInput && profileAvatar) {

    nameInput.addEventListener(
        "input",
        function () {

            const name =
                nameInput.value.trim();


            if (name) {

                profileAvatar.textContent =
                    name.charAt(0).toUpperCase();

            } else {

                profileAvatar.textContent = "";

            }

        }
    );

}


/* =========================
   Password Strength
========================= */

const lengthCheck =
    document.getElementById("length-check");

const uppercaseCheck =
    document.getElementById("uppercase-check");

const lowercaseCheck =
    document.getElementById("lowercase-check");

const numberCheck =
    document.getElementById("number-check");


if (password) {

    password.addEventListener(
        "focus",
        function () {

            const requirements =
                document.getElementById(
                    "password-requirements"
                );

            if (requirements) {

                requirements.classList.add(
                    "show"
                );

            }

        }
    );


    password.addEventListener(
        "input",
        function () {

            const value =
                password.value;


            const hasLength =
                value.length >= 8;

            const hasUppercase =
                /[A-Z]/.test(value);

            const hasLowercase =
                /[a-z]/.test(value);

            const hasNumber =
                /[0-9]/.test(value);


            updatePasswordCheck(
                lengthCheck,
                hasLength,
                "At least 8 characters"
            );


            updatePasswordCheck(
                uppercaseCheck,
                hasUppercase,
                "One uppercase letter"
            );


            updatePasswordCheck(
                lowercaseCheck,
                hasLowercase,
                "One lowercase letter"
            );


            updatePasswordCheck(
                numberCheck,
                hasNumber,
                "One number"
            );

        }
    );

}


/* =========================
   Password Check UI
========================= */

function updatePasswordCheck(
    element,
    isValid,
    text
) {

    if (!element) return;


    if (isValid) {

        element.textContent =
            "✓ " + text;

        element.classList.add(
            "valid"
        );

    } else {

        element.textContent =
            "❌ " + text;

        element.classList.remove(
            "valid"
        );

    }

}


/* =========================
   Gender Selection
========================= */

const genderOptions =
    document.querySelectorAll(
        'input[name="gender"]'
    );


genderOptions.forEach(
    function (option) {

        option.addEventListener(
            "change",
            function () {

                const genderMessage =
                    document.getElementById(
                        "gender-message"
                    );


                if (genderMessage) {

                    genderMessage.classList.remove(
                        "show"
                    );

                }

            }
        );

    }
);


/* =========================
   Signup Form
========================= */

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =========================
               Get Values
            ========================= */

            const name =
                nameInput.value.trim();


            const email =
                document.getElementById("email")
                    .value
                    .trim();


            const passwordValue =
                password.value;


            const selectedGender =
                document.querySelector(
                    'input[name="gender"]:checked'
                );


            /* =========================
               Check Name
            ========================= */

            if (!name) {

                alert(
                    "Please enter your name."
                );

                nameInput.focus();

                return;

            }


            /* =========================
               Check Email
            ========================= */

            if (!email) {

                alert(
                    "Please enter your email."
                );

                document
                    .getElementById("email")
                    .focus();

                return;

            }


            /* =========================
               Check Gender
            ========================= */

            if (!selectedGender) {

                const genderMessage =
                    document.getElementById(
                        "gender-message"
                    );


                if (genderMessage) {

                    genderMessage.classList.add(
                        "show"
                    );

                }

                return;

            }


            /* =========================
               Check Password
            ========================= */

            const hasLength =
                passwordValue.length >= 8;

            const hasUppercase =
                /[A-Z]/.test(passwordValue);

            const hasLowercase =
                /[a-z]/.test(passwordValue);

            const hasNumber =
                /[0-9]/.test(passwordValue);


            if (
                !hasLength ||
                !hasUppercase ||
                !hasLowercase ||
                !hasNumber
            ) {

                alert(
                    "Please create a stronger password."
                );

                password.focus();

                return;

            }


            /* =========================
               Get Gender
            ========================= */

            const gender =
                selectedGender.value;


            /* =========================
               Create User
            ========================= */

            const user = {

                name: name,

                email: email,

                password: passwordValue,

                gender: gender,

                avatar: {

                    type: "initial",

                    value:
                        name
                            .charAt(0)
                            .toUpperCase()

                }

            };


            /* =========================
               Save User
            ========================= */

            localStorage.setItem(
                "spendlyUser",
                JSON.stringify(user)
            );


            /* =========================
               Show Success Card
            ========================= */

            const successOverlay =
                document.getElementById(
                    "success-overlay"
                );


            const signupContainer =
                document.querySelector(
                    ".signup-container"
                );


            if (successOverlay) {

                successOverlay.classList.add(
                    "show"
                );

            }


            if (signupContainer) {

                signupContainer.classList.add(
                    "blur-card"
                );

            }


            /* =========================
               Disable Form
            ========================= */

            const submitButton =
                signupForm.querySelector(
                    ".signup-button"
                );


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.style.opacity =
                    "0.6";

                submitButton.style.cursor =
                    "default";

            }


            /* =========================
               Go To Login
            ========================= */

            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                2500
            );

        }
    );

}