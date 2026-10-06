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

        /* ===== Landing ===== */

        home:
            "Home",

        featuresNav:
            "Features",

        heroLabel:
            "SMART MONEY MANAGEMENT",

        heroTitle:
            "Take control of your money.",

        heroText:
            "Track your expenses, understand your spending, and make smarter financial decisions with Spendly.",

        getStarted:
            "Get Started 🚀",

        howItWorksLabel:
            "HOW IT WORKS",

        howItWorksTitle:
            "Manage your money in 3 simple steps.",

        stepOneTitle:
            "Add your expenses",

        stepOneText:
            "Record what you spend, whenever you spend it.",

        stepTwoTitle:
            "Set your budget",

        stepTwoText:
            "Create a daily or monthly budget that works for you.",

        stepThreeTitle:
            "Understand your spending",

        stepThreeText:
            "See where your money goes and make better decisions.",

        whySpendly:
            "WHY SPENDLY?",

        featuresTitle:
            "Everything you need to manage your money.",

        featuresDescription:
            "Simple tools designed to help you understand where your money goes.",

        trackExpenses:
            "Track Expenses",

        trackExpensesText:
            "Record your daily expenses and keep everything organized in one place.",

        manageBudget:
            "Manage Budget",

        manageBudgetText:
            "Set daily and monthly budgets and stay on track with your spending.",

        understandSpending:
            "Understand Spending",

        understandSpendingText:
            "Visualize your spending habits with simple charts and useful statistics.",

        stayOrganized:
            "Stay Organized",

        stayOrganizedText:
            "Create shopping and to-do lists and keep everything organized in one place.",

        footerTagline:
            "Spend smart. Live better. ✨",

        footerCopyright:
            "© 2026 Spendly. All rights reserved.",


        /* ===== Daily ===== */

        pageLabel:
            "YOUR DAY",

        title:
            "Today's Spending 💸",

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

        /* ===== Landing ===== */

        home:
            "الرئيسية",

        featuresNav:
            "المميزات",

        heroLabel:
            "إدارة أموالك بذكاء",

        heroTitle:
            "سيطري على فلوسك بسهولة.",

        heroText:
            "تابعي مصروفاتك، افهمي طريقة إنفاقك، وخدي قرارات مالية أذكى مع Spendly.",

        getStarted:
            "ابدئي دلوقتي 🚀",

        howItWorksLabel:
            "إزاي Spendly بيشتغل؟",

        howItWorksTitle:
            "رتبي فلوسك في 3 خطوات بسيطة.",

        stepOneTitle:
            "ضيفي مصروفاتك",

        stepOneText:
            "سجلي كل حاجة بتصرفيها وقت ما تصرفيها.",

        stepTwoTitle:
            "حددي ميزانيتك",

        stepTwoText:
            "اعملي ميزانية يومية أو شهرية مناسبة ليكي.",

        stepThreeTitle:
            "افهمي مصروفاتك",

        stepThreeText:
            "اعرفي فلوسك بتروح فين وخدي قرارات أحسن.",

        whySpendly:
            "ليه Spendly؟",

        featuresTitle:
            "كل اللي محتاجاه عشان ترتبي فلوسك.",

        featuresDescription:
            "أدوات بسيطة تساعدك تفهمي فلوسك بتروح فين.",

        trackExpenses:
            "تتبعي المصروفات",

        trackExpensesText:
            "سجلي مصروفاتك اليومية وخلي كل حاجة مترتبة في مكان واحد.",

        manageBudget:
            "إدارة الميزانية",

        manageBudgetText:
            "حددي ميزانية يومية وشهرية وخلي مصروفاتك تحت السيطرة.",

        understandSpending:
            "افهمي إنفاقك",

        understandSpendingText:
            "شوفي عادات إنفاقك من خلال إحصائيات ورسومات بسيطة.",

        stayOrganized:
            "خلي كل حاجة منظمة",

        stayOrganizedText:
            "اعملي قوائم للتسوق والمهام وخلي كل حاجة مترتبة.",

        footerTagline:
            "اصرفي بذكاء. عيشي أحسن. ✨",

        footerCopyright:
            "© 2026 Spendly. جميع الحقوق محفوظة.",


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
                        categories &&
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

            background: #ffffff;

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
                rgba(47, 52, 55, 0.08);

            transition:
                transform 0.2s ease,
                box-shadow 0.2s ease,
                background 0.4s ease,
                color 0.4s ease;

        }


        #language-toggle:hover {

            transform:
                translateY(-2px);

            box-shadow:
                0 9px 25px
                rgba(47, 52, 55, 0.12);

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