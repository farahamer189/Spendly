/* =========================
   Spendly Language
========================= */

let savedLanguage =
    localStorage.getItem("spendlyLanguage") || "en";


/* =========================
   Translations
========================= */

const translations = {

    /* =========================
       English
    ========================= */

    en: {

        /* ===== Daily ===== */

        pageLabel: "YOUR DAY",

        title: "Today's Spending 💸",

        subtitle:
            "Keep track of what you spend today.",

        budget:
            "Today's Budget",

        spent:
            "Spent Today",

        remaining:
            "Remaining",

        notSet:
            "Not set",

        setBudget:
            "+ Set Today's Budget",

        today:
            "TODAY",

        todaySpending:
            "Today's Spending",

        addSpending:
            "+ Add Spending",

        newSpending:
            "NEW SPENDING",

        addSpendingTitle:
            "Add spending",

        spendingQuestion:
            "What did you spend on?",

        amount:
            "Amount",

        category:
            "Category",

        chooseCategory:
            "Choose a category",

        cancel:
            "Cancel",

        saveSpending:
            "Add Spending",

        updateSpending:
            "Save Changes",

        dailyBudget:
            "DAILY BUDGET",

        setTodaysBudget:
            "Set today's budget",

        budgetQuestion:
            "How much can you spend today?",

        setBudgetButton:
            "Set Budget",

        deleteTitle:
            "Delete spending?",

        deleteMessage:
            "Are you sure you want to delete this spending? This action can't be undone.",

        deleteCancel:
            "Cancel",

        deleteConfirm:
            "Yes, Delete",

        spendingAdded:
            "Spending added successfully!",

        spendingUpdated:
            "Spending updated successfully!",

        spendingDeleted:
            "Spending deleted successfully!",

        emptySpending:
            "You haven't added any spending today.",

        noSpending:
            "You haven't added any spending yet. 💰",

        noBudget:
            "You're doing great! Keep tracking your spending. 💸",

        reachedBudget:
            "You've reached your daily budget! 🚨",

        closeToBudget:
            "Careful! You're getting close to your daily budget. ⚠️",

        usedHalfBudget:
            "You've used 50% of your daily budget. 👀",


        /* ===== Signup ===== */

        joinSpendly:
            "Join Spendly!",

        signupWelcome:
            "Let's get your money life together ✨",

        name:
            "Name",

        email:
            "Email",

        password:
            "Password",

        gender:
            "Gender",

        female:
            "♀ Female",

        male:
            "♂ Male",

        preferNotToSay:
            "✨ Prefer not to say",

        createAccount:
            "Create my account ✨",

        alreadyHaveAccount:
            "Already have an account?",

        login:
            "Log in",


        /* ===== Categories ===== */

        categories: {

            Food:
                "🍔 Food",

            Transportation:
                "🚕 Transportation",

            Shopping:
                "🛒 Shopping",

            Bills:
                "💡 Bills",

            Entertainment:
                "🎬 Entertainment",

            Health:
                "💊 Health",

            Other:
                "📦 Other"
        }

    },


    /* =========================
       Arabic
    ========================= */

    ar: {

        /* ===== Daily ===== */

        pageLabel:
            "يومك",

        title:
            "مصروفات اليوم 💸",

        subtitle:
            "تابعي مصروفاتك خلال اليوم.",

        budget:
            "ميزانية اليوم",

        spent:
            "مصروفات اليوم",

        remaining:
            "المتبقي",

        notSet:
            "لم يتم تحديدها",

        setBudget:
            "+ تحديد ميزانية اليوم",

        today:
            "اليوم",

        todaySpending:
            "مصروفات اليوم",

        addSpending:
            "+ إضافة مصروف",

        newSpending:
            "مصروف جديد",

        addSpendingTitle:
            "إضافة مصروف",

        spendingQuestion:
            "صرفتي فلوس على إيه؟",

        amount:
            "المبلغ",

        category:
            "الفئة",

        chooseCategory:
            "اختاري الفئة",

        cancel:
            "إلغاء",

        saveSpending:
            "إضافة المصروف",

        updateSpending:
            "حفظ التعديلات",

        dailyBudget:
            "ميزانية اليوم",

        setTodaysBudget:
            "تحديد ميزانية اليوم",

        budgetQuestion:
            "قد إيه تقدري تصرفي النهارده؟",

        setBudgetButton:
            "تحديد الميزانية",

        deleteTitle:
            "حذف المصروف؟",

        deleteMessage:
            "متأكدة إنك عايزة تحذفي المصروف ده؟ مش هتقدري ترجعيه بعد كده.",

        deleteCancel:
            "إلغاء",

        deleteConfirm:
            "نعم، احذف",

        spendingAdded:
            "تمت إضافة المصروف بنجاح!",

        spendingUpdated:
            "تم تعديل المصروف بنجاح!",

        spendingDeleted:
            "تم حذف المصروف بنجاح!",

        emptySpending:
            "لم تضيفي أي مصروفات اليوم.",

        noSpending:
            "لم تضيفي أي مصروفات حتى الآن. 💰",

        noBudget:
            "أداؤك رائع! استمري في تسجيل مصروفاتك. 💸",

        reachedBudget:
            "لقد وصلتي إلى ميزانية اليوم! 🚨",

        closeToBudget:
            "خلي بالك! إنتِ قربتي من ميزانية اليوم. ⚠️",

        usedHalfBudget:
            "لقد استخدمتي 50% من ميزانية اليوم. 👀",


        /* ===== Signup ===== */

        joinSpendly:
            "انضمي إلى Spendly!",

        signupWelcome:
            "يلا نرتب حياتك المالية مع بعض ✨",

        name:
            "الاسم",

        email:
            "البريد الإلكتروني",

        password:
            "كلمة المرور",

        gender:
            "النوع",

        female:
            "♀ بنت",

        male:
            "♂ ولد",

        preferNotToSay:
            "✨ أفضل عدم التحديد",

        createAccount:
            "إنشاء حسابي ✨",

        alreadyHaveAccount:
            "عندك حساب بالفعل؟",

        login:
            "تسجيل الدخول",


        /* ===== Categories ===== */

        categories: {

            Food:
                "🍔 أكل",

            Transportation:
                "🚕 مواصلات",

            Shopping:
                "🛒 تسوق",

            Bills:
                "💡 فواتير",

            Entertainment:
                "🎬 ترفيه",

            Health:
                "💊 صحة",

            Other:
                "📦 أخرى"
        }

    }

};


/* =========================
   Apply Translation
========================= */

function applyLanguage(language) {

    const selectedLanguage =
        translations[language] || translations.en;


    /* =========================
       Page Direction
    ========================= */

    document.documentElement.lang =
        language;

    document.documentElement.dir =
        language === "ar"
            ? "rtl"
            : "ltr";


    /* =========================
       Translate Elements
    ========================= */

    const elements =
        document.querySelectorAll(
            "[data-i18n]"
        );


    elements.forEach(
        function (element) {

            const key =
                element.dataset.i18n;


            if (
                selectedLanguage[key]
            ) {

                element.textContent =
                    selectedLanguage[key];

            }

        }
    );


    /* =========================
       Translate Daily Categories
    ========================= */

    const categorySelect =
        document.querySelector(
            "#spending-category"
        );


    if (categorySelect) {

        const categories =
            selectedLanguage.categories;


        categorySelect
            .querySelectorAll(
                "option[value]"
            )
            .forEach(
                function (option) {

                    const category =
                        option.value;


                    if (
                        categories[category]
                    ) {

                        option.textContent =
                            categories[category];

                    }

                }
            );

    }


    /* =========================
       Daily Placeholders
    ========================= */

    const spendingName =
        document.querySelector(
            "#spending-name"
        );

    const spendingAmount =
        document.querySelector(
            "#spending-amount"
        );

    const budgetAmount =
        document.querySelector(
            "#budget-amount"
        );


    if (language === "ar") {

        if (spendingName) {

            spendingName.placeholder =
                "مثال: الغداء";

        }


        if (spendingAmount) {

            spendingAmount.placeholder =
                "مثال: 250";

        }


        if (budgetAmount) {

            budgetAmount.placeholder =
                "مثال: 1000";

        }

    } else {

        if (spendingName) {

            spendingName.placeholder =
                "e.g. Lunch";

        }


        if (spendingAmount) {

            spendingAmount.placeholder =
                "e.g. 250";

        }


        if (budgetAmount) {

            budgetAmount.placeholder =
                "e.g. 1000";

        }

    }


    /* =========================
       Signup Placeholders
    ========================= */

    const nameInput =
        document.querySelector(
            "#name"
        );

    const emailInput =
        document.querySelector(
            "#email"
        );

    const passwordInput =
        document.querySelector(
            "#password"
        );


    if (language === "ar") {

        if (nameInput) {

            nameInput.placeholder =
                "هنناديك بإيه؟";

        }


        if (emailInput) {

            emailInput.placeholder =
                "اكتبي إيميلك";

        }


        if (passwordInput) {

            passwordInput.placeholder =
                "اعملي كلمة مرور";

        }

    } else {

        if (nameInput) {

            nameInput.placeholder =
                "What should we call you?";

        }


        if (emailInput) {

            emailInput.placeholder =
                "Enter your email";

        }


        if (passwordInput) {

            passwordInput.placeholder =
                "Create a password";

        }

    }


    /* =========================
       Update Language Button
    ========================= */

    updateLanguageButton(
        language
    );


    /* =========================
       Refresh Daily Content
    ========================= */

    if (
        typeof displaySpending ===
        "function"
    ) {

        displaySpending();

    }


    if (
        typeof updateDailySummary ===
        "function"
    ) {

        updateDailySummary();

    }


    /* =========================
       Tell Other Scripts
       Language Changed
    ========================= */

    window.dispatchEvent(
        new Event("languageChanged")
    );

}


/* =========================
   Language Button
========================= */

function createLanguageButton() {

    /* Prevent duplicate button */

    if (
        document.querySelector(
            "#language-toggle"
        )
    ) {

        return;

    }


    const button =
        document.createElement(
            "button"
        );


    button.id =
        "language-toggle";


    button.type =
        "button";


    button.addEventListener(
        "click",
        function () {

            const newLanguage =
                savedLanguage === "en"
                    ? "ar"
                    : "en";


            savedLanguage =
                newLanguage;


            localStorage.setItem(
                "spendlyLanguage",
                newLanguage
            );


            applyLanguage(
                newLanguage
            );

        }
    );


    document.body.appendChild(
        button
    );

}


/* =========================
   Update Language Button
========================= */

function updateLanguageButton(
    language
) {

    const button =
        document.querySelector(
            "#language-toggle"
        );


    if (!button) return;


    if (language === "en") {

        button.textContent =
            "🇪🇬 AR";

        button.title =
            "Switch to Arabic";

    } else {

        button.textContent =
            "🇬🇧 EN";

        button.title =
            "Switch to English";

    }

}


/* =========================
   Language Button Style
========================= */

function addLanguageStyles() {

    /* Prevent duplicate styles */

    if (
        document.querySelector(
            "#spendly-language-styles"
        )
    ) {

        return;

    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "spendly-language-styles";


    style.textContent = `

        #language-toggle {

            position: fixed;

            top: 25px;

            left: 25px;

            z-index: 9999;

            border: none;

            background: white;

            color: #2f3437;

            padding: 10px 15px;

            border-radius: 12px;

            font-family:
                "Original Surfer",
                cursive;

            font-size: 13px;

            cursor: pointer;

            box-shadow:
                0 6px 20px
                rgba(0, 0, 0, 0.08);

            transition:
                transform 0.2s ease,
                box-shadow 0.2s ease;

        }


        #language-toggle:hover {

            transform:
                translateY(-2px);

            box-shadow:
                0 9px 25px
                rgba(0, 0, 0, 0.12);

        }


        body.night-mode
        #language-toggle {

            background: #242630;

            color: #eee8dc;

            box-shadow:
                0 6px 20px
                rgba(0, 0, 0, 0.25);

        }


        @media (max-width: 600px) {

            #language-toggle {

                top: 15px;

                left: 15px;

                padding: 8px 12px;

                font-size: 12px;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================
   Start Language System
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createLanguageButton();

        addLanguageStyles();

        applyLanguage(
            savedLanguage
        );

    }
);