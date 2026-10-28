/* ==========================================
   Spendly Monthly Report
   Daily budget reservation fix
========================================== */

(() => {
    "use strict";

    const SPENDING_KEY = "spendlySpending";
    const MONTHLY_BUDGETS_KEY = "spendlyMonthlyBudgets";
    const LEGACY_MONTHLY_BUDGET_KEY = "spendlyMonthlyBudget";
    const CARRYOVERS_KEY = "spendlyBudgetCarryovers";
    const DAILY_BUDGET_KEY = "spendlyDailyBudget";

    const $ = selector => document.querySelector(selector);

    const monthTitle = $("#current-month");
    const previousMonthButton = $("#previous-month");
    const nextMonthButton = $("#next-month");

    const totalSpentElement = $("#total-spent");
    const budgetLabel = $("#budget-label");
    const budgetPercent = $("#budget-percent");
    const budgetProgress = $("#budget-progress");
    const budgetStatus = $("#budget-status");

    const transactionCount = $("#transaction-count");
    const topCategory = $("#top-category");

    const categoryBreakdown = $("#category-breakdown");
    const categoryDetails = $("#category-details");
    const weeklyBreakdown = $("#weekly-breakdown");
    const quickInsights = $("#quick-insights");
    const emptyState = $("#empty-state");

    const TEXT = {
        en: {
            title: "Monthly Report | Spendly",
            reportEyebrow: "YOUR FINANCIAL OVERVIEW",
            reportTitle: "Monthly Report 📊",
            reportSubtitle: "Understand your spending habits, one month at a time.",
            backToMoney: "← Back to My Money",
            previousMonth: "Previous month",
            nextMonth: "Next month",
            monthlyOverview: "MONTHLY OVERVIEW",
            totalSpent: "Total Spent",
            transactions: "Transactions",
            topCategory: "Top category",
            whereSpent: "WHERE DID IT GO?",
            categoryTitle: "Spending by Category 🧾",
            categoryNote: "Select a category to see its transactions.",
            whenSpent: "WHEN DID YOU SPEND IT?",
            timelineTitle: "Your Monthly Timeline 📅",
            timelineNote: "Open a week, then expand a day to see each transaction.",
            moneyCheckin: "A LITTLE MONEY CHECK-IN",
            insightsTitle: "Quick Insights 💡",
            emptyTitle: "No spending recorded for this month yet",
            emptyDescription: "Add your spending from My Money and it will appear here automatically.",
            goToMoney: "Go to My Money",
            reportFootnote: "This report uses saved spending records. A daily budget reservation is not counted as an expense.",
            monthlyBudgetNotSet: "Monthly budget: Not set",
            setBudgetHint: "Set a monthly budget in My Money to compare your spending with your plan.",
            overBudget: amount => `⚠️ You spent ${amount} over your monthly budget.`,
            reachedBudget: "You reached your monthly budget.",
            remainingBudget: amount => `🎉 ${amount} remaining this month.`,
            noCategoryTotals: "No category totals yet for this month.",
            details: "details",
            total: "total",
            transaction: "transaction",
            transactionsPlural: "transactions",
            spendingShare: "of spending",
            closeDetails: "Close category details",
            timeNotRecorded: "Time not recorded",
            noWeeklyData: "Your weekly timeline will appear here after you record spending.",
            week: number => `Week ${number}`,
            noTransactionsDay: "No transactions recorded for this day.",
            noSpendingWeek: "No spending recorded during this week.",
            highestDay: "Highest Spending Day",
            spendingTip: "Your Spending Tip",
            noPatterns: "Add a few spending records to discover useful patterns in your money habits.",
            biggestCategory: (category, percent) =>
                `${category} is your biggest category at ${percent}% of your recorded spending.`,
            budgetShare: percent =>
                ` It also uses ${percent}% of your monthly budget.`,
            budgetNoSpending: "Your budget is set, but there are no spending records for this month yet.",
            noSpendingThisMonth: "No spending recorded yet for this month.",
            carryoverTitle: "Carry money into next month? 💰",
            carryoverQuestion: amount =>
                `You have ${amount} left in this month's budget. Would you like to carry it into next month?`,
            carryoverYes: "Yes, carry it over",
            carryoverNo: "No, don't carry it over",
            carryoverAccepted: (amount, target) =>
                `✓ You chose to carry ${amount} over to ${target}.`,
            carryoverDeclined: (amount, target) =>
                `You chose not to carry ${amount} over to ${target}.`,
            carryoverAdded: amount =>
                `Includes ${amount} carried over from the previous month.`,
            categories: {
                Food: "Food",
                Transportation: "Transportation",
                Shopping: "Shopping",
                Bills: "Bills",
                Entertainment: "Entertainment",
                Health: "Health",
                Other: "Other"
            }
        },

        ar: {
            title: "التقرير الشهري | Spendly",
            reportEyebrow: "نظرة عامة على فلوسك",
            reportTitle: "التقرير الشهري 📊",
            reportSubtitle: "افهمي عادات إنفاقك شهر بشهر.",
            backToMoney: "الرجوع إلى فلوسي ←",
            previousMonth: "الشهر السابق",
            nextMonth: "الشهر التالي",
            monthlyOverview: "نظرة عامة على الشهر",
            totalSpent: "إجمالي المصروفات",
            transactions: "عدد المصروفات",
            topCategory: "أعلى فئة إنفاقًا",
            whereSpent: "فلوسك راحت فين؟",
            categoryTitle: "المصروفات حسب الفئة 🧾",
            categoryNote: "اختاري فئة لعرض مصروفاتها.",
            whenSpent: "صرفتي إمتى؟",
            timelineTitle: "تفاصيل الشهر 📅",
            timelineNote: "افتحي أسبوعًا، ثم اختاري يومًا لعرض مصروفاته.",
            moneyCheckin: "خلينا نراجع فلوسك",
            insightsTitle: "ملخصات سريعة 💡",
            emptyTitle: "لسه مفيش مصروفات مسجلة للشهر ده",
            emptyDescription: "ضيفي مصروفاتك من صفحة فلوسي وهتظهر هنا تلقائيًا.",
            goToMoney: "الذهاب إلى فلوسي",
            reportFootnote: "التقرير بيستخدم المصروفات المحفوظة. تحديد ميزانية اليوم لا يُحتسب كمصروف.",
            monthlyBudgetNotSet: "الميزانية الشهرية: لم يتم تحديدها",
            setBudgetHint: "حددي ميزانية شهرية من صفحة فلوسي عشان تقارني مصروفاتك بخطتك.",
            overBudget: amount => `⚠️ صرفتي ${amount} زيادة عن ميزانيتك الشهرية.`,
            reachedBudget: "وصلتي لحد ميزانيتك الشهرية.",
            remainingBudget: amount => `🎉 فاضل معاكي ${amount} للشهر ده.`,
            noCategoryTotals: "مفيش إجماليات للفئات خلال الشهر ده لسه.",
            details: "التفاصيل",
            total: "الإجمالي",
            transaction: "مصروف",
            transactionsPlural: "مصروفات",
            spendingShare: "من إجمالي المصروفات",
            closeDetails: "إغلاق تفاصيل الفئة",
            timeNotRecorded: "الوقت غير مسجل",
            noWeeklyData: "تفاصيل الأسابيع هتظهر هنا بعد تسجيل مصروفاتك.",
            week: number => `الأسبوع ${number}`,
            noTransactionsDay: "مفيش مصروفات مسجلة في اليوم ده.",
            noSpendingWeek: "مفيش مصروفات مسجلة خلال الأسبوع ده.",
            highestDay: "أعلى يوم في الإنفاق",
            spendingTip: "نصيحة ليكي",
            noPatterns: "سجلي شوية مصروفات عشان نقدر نكتشف أنماط إنفاقك.",
            biggestCategory: (category, percent) =>
                `${category} هي أعلى فئة إنفاقًا بنسبة ${percent}% من مصروفاتك المسجلة.`,
            budgetShare: percent =>
                ` وكمان بتستهلك ${percent}% من ميزانيتك الشهرية.`,
            budgetNoSpending: "ميزانيتك متحددة، لكن مفيش مصروفات مسجلة للشهر ده لسه.",
            noSpendingThisMonth: "مفيش مصروفات مسجلة للشهر ده لسه.",
            carryoverTitle: "تحبي ترحّلي الفلوس للشهر اللي بعده؟ 💰",
            carryoverQuestion: amount =>
                `متبقي ليكي ${amount} من ميزانية الشهر ده. تحبي ترحّليهم للشهر اللي بعده؟`,
            carryoverYes: "أيوه، رحّليهم",
            carryoverNo: "لأ، مش عايزة أرحّلهم",
            carryoverAccepted: (amount, target) =>
                `✓ اخترتي ترحيل ${amount} إلى ${target}.`,
            carryoverDeclined: (amount, target) =>
                `اخترتي عدم ترحيل ${amount} إلى ${target}.`,
            carryoverAdded: amount =>
                `الميزانية تشمل ${amount} مترحّلين من الشهر السابق.`,
            categories: {
                Food: "أكل",
                Transportation: "مواصلات",
                Shopping: "تسوق",
                Bills: "فواتير",
                Entertainment: "ترفيه",
                Health: "صحة",
                Other: "أخرى"
            }
        }
    };

    const CATEGORY_INFO = {
        Food: { emoji: "🍔" },
        Transportation: { emoji: "🚕" },
        Shopping: { emoji: "🛒" },
        Bills: { emoji: "💡" },
        Entertainment: { emoji: "🎬" },
        Health: { emoji: "💊" },
        Other: { emoji: "📦" }
    };

    const CATEGORY_COLORS = [
        "#A58B6B", "#8FA18A", "#C59A93", "#AAA0C2",
        "#D0AD70", "#8DAEB0", "#B4A99B"
    ];

    let selectedMonth = new Date();
    selectedMonth = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        1
    );

    let selectedCategory = null;
    let openWeekNumber = null;
    let openDayKey = null;

    function language() {
        const selected = typeof window.spendlyGetLanguage === "function"
            ? window.spendlyGetLanguage()
            : localStorage.getItem("spendlyLanguage") || "en";

        return selected === "ar" ? "ar" : "en";
    }

    function t(key, ...args) {
        const value = TEXT[language()][key] ?? TEXT.en[key] ?? key;
        return typeof value === "function" ? value(...args) : value;
    }

    function categoryName(category) {
        return TEXT[language()].categories[category]
            || TEXT.en.categories[category]
            || category;
    }

    function applyReportLanguage() {
        document.documentElement.lang = language();
        document.documentElement.dir = language() === "ar" ? "rtl" : "ltr";
        document.title = t("title");

        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.dataset.i18n;

            if (Object.prototype.hasOwnProperty.call(TEXT[language()], key)) {
                element.textContent = t(key);
            }
        });

        document.querySelectorAll("[data-i18n-aria]").forEach(element => {
            element.setAttribute("aria-label", t(element.dataset.i18nAria));
        });

        document.querySelectorAll("[data-i18n-title]").forEach(element => {
            element.setAttribute("title", t(element.dataset.i18nTitle));
        });

        renderReport();
    }

    function readJSON(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            console.error(`Could not read ${key}:`, error);
            return fallback;
        }
    }

    function monthKey(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    }

    function getCurrentDateKey() {
        const today = new Date();

        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    }

    function getSpendingRecords() {
        const data = readJSON(SPENDING_KEY, []);
        if (!Array.isArray(data)) return [];

        return data
            .filter(item => item && typeof item === "object")
            .map((item, index) => {
                const amount = Number(item.amount);
                const date = String(item.date || "").slice(0, 10);

                return {
                    id: item.id ?? `${date}-${index}`,
                    name: String(item.name || item.title || "Spending"),
                    amount: Number.isFinite(amount) ? amount : 0,
                    category: String(item.category || "Other"),
                    date,
                    time: String(item.time || "")
                };
            })
            .filter(item =>
                item.date &&
                /^\d{4}-\d{2}-\d{2}$/.test(item.date) &&
                item.amount >= 0
            );
    }

    function getMonthlyBudgets() {
        const budgets = readJSON(MONTHLY_BUDGETS_KEY, null);

        if (budgets && typeof budgets === "object" && !Array.isArray(budgets)) {
            return budgets;
        }

        const legacy = readJSON(LEGACY_MONTHLY_BUDGET_KEY, null);

        if (legacy !== null && legacy !== "") {
            const value = Number(typeof legacy === "object" ? legacy.amount : legacy);

            if (Number.isFinite(value) && value > 0) {
                return { [monthKey(new Date())]: value };
            }
        }

        return {};
    }

    function getMonthRecords() {
        const key = monthKey(selectedMonth);

        return getSpendingRecords()
            .filter(item => item.date.startsWith(`${key}-`))
            .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));
    }

    function getDailyBudgetReservation() {
        if (monthKey(selectedMonth) !== monthKey(new Date())) {
            return 0;
        }

        const saved = readJSON(DAILY_BUDGET_KEY, null);

        if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
            return 0;
        }

        const amount = Number(saved.amount);
        const savedDate = String(saved.date || "");

        const isToday =
            savedDate === getCurrentDateKey() ||
            savedDate === new Date().toDateString();

        return isToday && Number.isFinite(amount) && amount > 0
            ? amount
            : 0;
    }

    function getCarryovers() {
        const saved = readJSON(CARRYOVERS_KEY, {});
        return saved && typeof saved === "object" && !Array.isArray(saved)
            ? saved
            : {};
    }

    function saveCarryovers(carryovers) {
        localStorage.setItem(CARRYOVERS_KEY, JSON.stringify(carryovers));
    }

    function previousMonthDate(date) {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1);
    }

    function formatMonthLabel(date) {
        return date.toLocaleDateString(
            language() === "ar" ? "ar-EG" : "en-US",
            { month: "long", year: "numeric" }
        );
    }

    function getCarryoverForMonth(targetMonthKey) {
        const previousKey = monthKey(
            previousMonthDate(new Date(`${targetMonthKey}-01T12:00:00`))
        );

        const entry = getCarryovers()[previousKey];

        if (
            !entry ||
            entry.decision !== "yes" ||
            entry.targetMonth !== targetMonthKey
        ) {
            return 0;
        }

        const amount = Number(entry.amount);
        return Number.isFinite(amount) && amount > 0 ? amount : 0;
    }

    function getBudgetForSelectedMonth() {
        const key = monthKey(selectedMonth);
        const value = Number(getMonthlyBudgets()[key]);

        const baseBudget = Number.isFinite(value) && value > 0
            ? value
            : 0;

        const effectiveBudget = baseBudget + getCarryoverForMonth(key);

        return effectiveBudget > 0 ? effectiveBudget : null;
    }

    function formatMoney(amount) {
        const locale = language() === "ar" ? "ar-EG" : "en-US";

        const number = new Intl.NumberFormat(locale, {
            maximumFractionDigits: 2
        }).format(amount);

        return language() === "ar"
            ? `${number} ج.م`
            : `${number} EGP`;
    }

    function formatDate(
        dateString,
        options = { day: "numeric", month: "short" }
    ) {
        const date = new Date(`${dateString}T12:00:00`);

        if (Number.isNaN(date.getTime())) {
            return dateString;
        }

        return new Intl.DateTimeFormat(
            language() === "ar" ? "ar-EG" : "en-GB",
            options
        ).format(date);
    }

    function formatTime(time) {
        if (!time) return t("timeNotRecorded");

        const parts = time.split(":");

        if (parts.length < 2) return time;

        const hours = Number(parts[0]);
        const minutes = Number(parts[1]);

        if (
            !Number.isFinite(hours) ||
            !Number.isFinite(minutes) ||
            hours < 0 ||
            hours > 23 ||
            minutes < 0 ||
            minutes > 59
        ) {
            return time;
        }

        const date = new Date();
        date.setHours(hours, minutes, 0, 0);

        return new Intl.DateTimeFormat(
            language() === "ar" ? "ar-EG" : "en-US",
            { hour: "2-digit", minute: "2-digit" }
        ).format(date);
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    function renderReport() {
        const records = getMonthRecords();
        const total = records.reduce((sum, item) => sum + item.amount, 0);
        const budget = getBudgetForSelectedMonth();

        const categories = new Map();

        records.forEach(item => {
            const current = categories.get(item.category) || {
                amount: 0,
                count: 0,
                records: []
            };

            current.amount += item.amount;
            current.count += 1;
            current.records.push(item);
            categories.set(item.category, current);
        });

        const sortedCategories = [...categories.entries()]
            .sort((a, b) => b[1].amount - a[1].amount);

        monthTitle.textContent = selectedMonth.toLocaleDateString(
            language() === "ar" ? "ar-EG" : "en-US",
            { month: "long", year: "numeric" }
        );

        totalSpentElement.textContent = formatMoney(total);

        transactionCount.textContent = records.length.toLocaleString(
            language() === "ar" ? "ar-EG" : "en-US"
        );

        topCategory.textContent = sortedCategories.length
            ? categoryName(sortedCategories[0][0])
            : "—";

        const todayKey = getCurrentDateKey();

        const totalSpentToday = monthKey(selectedMonth) === monthKey(new Date())
            ? records.reduce(
                (sum, item) => sum + (item.date === todayKey ? item.amount : 0),
                0
            )
            : 0;

        const dailyReservation = getDailyBudgetReservation();

        renderBudget(total, budget, totalSpentToday, dailyReservation);
        renderCarryover(total, budget);
        renderCategories(sortedCategories, total);
        renderWeeks(records);
        renderInsights(records, sortedCategories, total, budget);

        emptyState.hidden = records.length > 0;
    }

    function renderBudget(
        total,
        budget,
        totalSpentToday = 0,
        dailyReservation = 0
    ) {
        if (!budget) {
            budgetLabel.textContent = t("monthlyBudgetNotSet");
            budgetPercent.textContent = "—";
            budgetProgress.style.width = "0%";
            budgetProgress.style.background = "#82977e";
            budgetStatus.className = "budget-status neutral";
            budgetStatus.textContent = t("setBudgetHint");
            return;
        }

        // If today's daily budget is reserved, count the reservation once.
        // Otherwise, deduct all recorded spending, including today's expenses.
        const amountAccountedFor = dailyReservation > 0
            ? total - totalSpentToday + dailyReservation
            : total;

        const remaining = budget - amountAccountedFor;
        const percent = Math.round((amountAccountedFor / budget) * 100);

        budgetLabel.textContent =
            `${t("monthlyBudgetNotSet").split(":")[0]}: ${formatMoney(budget)}`;

        budgetPercent.textContent =
            `${new Intl.NumberFormat(
                language() === "ar" ? "ar-EG" : "en-US"
            ).format(percent)}%`;

        budgetProgress.style.width =
            `${Math.min(Math.max(percent, 0), 100)}%`;

        if (remaining < 0) {
            budgetStatus.className = "budget-status warning";
            budgetStatus.textContent = t(
                "overBudget",
                formatMoney(Math.abs(remaining))
            );
            budgetProgress.style.background = "#bd7568";
        } else if (remaining === 0) {
            budgetStatus.className = "budget-status warning";
            budgetStatus.textContent = t("reachedBudget");
            budgetProgress.style.background = "#bd9a68";
        } else {
            budgetStatus.className = "budget-status";
            budgetStatus.textContent = t(
                "remainingBudget",
                formatMoney(remaining)
            );
            budgetProgress.style.background = "#82977e";
        }
    }

    function ensureCarryoverNotice() {
        let notice = $("#carryover-notice");

        if (!notice && budgetStatus) {
            notice = document.createElement("p");
            notice.id = "carryover-notice";

            notice.style.cssText =
                "margin-top:10px;font-size:.9rem;line-height:1.5;color:var(--muted,#898b80);";

            budgetStatus.insertAdjacentElement("afterend", notice);
        }

        return notice;
    }

    function ensureCarryoverModal() {
        let modal = $("#carryover-modal");

        if (modal) return modal;

        const style = document.createElement("style");
        style.id = "carryover-modal-style";

        style.textContent = `
            #carryover-modal {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 20px;
                background: rgba(25,27,25,.48);
            }

            #carryover-modal.is-open {
                display: flex;
            }

            #carryover-modal .carryover-card {
                width: min(100%,440px);
                padding: 26px;
                border-radius: 22px;
                background: var(--card,#fffefa);
                color: var(--text,#2f3437);
                box-shadow: 0 18px 60px rgba(0,0,0,.2);
                text-align: center;
            }

            #carryover-modal h2 {
                font-size: 1.35rem;
                margin: 0 0 12px;
            }

            #carryover-modal p {
                line-height: 1.65;
                margin: 0 0 20px;
                color: var(--muted,#898b80);
            }

            #carryover-modal .carryover-actions {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }

            #carryover-modal button {
                flex: 1;
                min-width: 140px;
                border: 0;
                border-radius: 12px;
                padding: 12px 14px;
                font: inherit;
                font-weight: 700;
                cursor: pointer;
            }

            #carryover-yes {
                background: var(--accent,#85896c);
                color: #fff;
            }

            #carryover-no {
                background: transparent;
                color: var(--text,#2f3437);
                border: 1px solid rgba(128,128,128,.35);
            }

            @media(max-width:420px) {
                #carryover-modal .carryover-card {
                    padding: 22px 18px;
                }

                #carryover-modal .carryover-actions {
                    flex-direction: column;
                }
            }
        `;

        document.head.appendChild(style);

        modal = document.createElement("div");
        modal.id = "carryover-modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");

        modal.innerHTML = `
            <div class="carryover-card">
                <h2 id="carryover-modal-title"></h2>
                <p id="carryover-modal-message"></p>
                <div class="carryover-actions">
                    <button type="button" id="carryover-yes"></button>
                    <button type="button" id="carryover-no"></button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        return modal;
    }

    function renderCarryover(total, budget) {
        const notice = ensureCarryoverNotice();

        if (notice) notice.textContent = "";
        if (!budget || !budgetStatus) return;

        const remaining = budget - total;
        const sourceKey = monthKey(selectedMonth);
        const currentKey = monthKey(new Date());

        const targetMonth = new Date(
            selectedMonth.getFullYear(),
            selectedMonth.getMonth() + 1,
            1
        );

        const targetKey = monthKey(targetMonth);
        const carryovers = getCarryovers();
        const decision = carryovers[sourceKey];

        if (
            sourceKey < currentKey &&
            decision &&
            decision.targetMonth === targetKey
        ) {
            if (notice) {
                notice.textContent = decision.decision === "yes"
                    ? t(
                        "carryoverAccepted",
                        formatMoney(decision.amount),
                        formatMonthLabel(targetMonth)
                    )
                    : t(
                        "carryoverDeclined",
                        formatMoney(decision.amount),
                        formatMonthLabel(targetMonth)
                    );
            }

            return;
        }

        if (sourceKey >= currentKey || remaining <= 0) {
            if (notice) {
                const carried = getCarryoverForMonth(sourceKey);

                notice.textContent = carried > 0
                    ? t("carryoverAdded", formatMoney(carried))
                    : "";
            }

            return;
        }

        const modal = ensureCarryoverModal();

        $("#carryover-modal-title").textContent = t("carryoverTitle");
        $("#carryover-modal-message").textContent =
            t("carryoverQuestion", formatMoney(remaining));

        $("#carryover-yes").textContent = t("carryoverYes");
        $("#carryover-no").textContent = t("carryoverNo");

        modal.classList.add("is-open");
        document.body.style.overflow = "hidden";

        const finish = decisionValue => {
            const latest = getCarryovers();

            if (
                latest[sourceKey] &&
                latest[sourceKey].targetMonth === targetKey
            ) {
                modal.classList.remove("is-open");
                document.body.style.overflow = "";
                renderReport();
                return;
            }

            latest[sourceKey] = {
                targetMonth: targetKey,
                amount: Math.max(0, remaining),
                decision: decisionValue,
                decidedAt: new Date().toISOString()
            };

            saveCarryovers(latest);

            modal.classList.remove("is-open");
            document.body.style.overflow = "";

            renderReport();
        };

        $("#carryover-yes").onclick = () => finish("yes");
        $("#carryover-no").onclick = () => finish("no");
    }

    function renderCategories(sortedCategories, total) {
        selectedCategory = sortedCategories.some(
            ([name]) => name === selectedCategory
        )
            ? selectedCategory
            : null;

        if (!sortedCategories.length) {
            categoryBreakdown.innerHTML =
                `<div class="empty-inline">${t("noCategoryTotals")}</div>`;

            categoryDetails.hidden = true;
            categoryDetails.innerHTML = "";

            return;
        }

        categoryBreakdown.innerHTML = sortedCategories.map(
            ([name, data], index) => {
                const info = CATEGORY_INFO[name] || { emoji: "📦" };

                const percent = total > 0
                    ? (data.amount / total) * 100
                    : 0;

                const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
                const isSelected = selectedCategory === name;

                return `
                    <button
                        type="button"
                        class="category-row ${isSelected ? "selected" : ""}"
                        data-category="${escapeHTML(name)}"
                        aria-pressed="${isSelected}"
                    >
                        <div class="category-topline">
                            <span class="category-name">
                                <span class="category-emoji">${info.emoji}</span>
                                ${escapeHTML(categoryName(name))}
                            </span>

                            <span class="category-amount">${formatMoney(data.amount)}</span>
                        </div>

                        <div class="bar-track">
                            <div
                                class="bar-fill"
                                style="width:${percent}%;background:${color}"
                            ></div>
                        </div>

                        <div class="category-meta">
                            <span>
                                ${data.count}
                                ${data.count === 1
                                    ? t("transaction")
                                    : t("transactionsPlural")}
                            </span>

                            <span>${percent.toFixed(1)}% ${t("spendingShare")}</span>
                        </div>
                    </button>
                `;
            }
        ).join("");

        categoryBreakdown.querySelectorAll("[data-category]").forEach(button => {
            button.addEventListener("click", () => {
                const category = button.dataset.category;

                selectedCategory = selectedCategory === category
                    ? null
                    : category;

                renderCategories(sortedCategories, total);
            });
        });

        renderCategoryDetails(sortedCategories);
    }

    function renderCategoryDetails(sortedCategories) {
        const entry = sortedCategories.find(
            ([name]) => name === selectedCategory
        );

        if (!entry) {
            categoryDetails.hidden = true;
            categoryDetails.innerHTML = "";
            return;
        }

        const [name, data] = entry;
        const info = CATEGORY_INFO[name] || { emoji: "📦" };

        const sortedRecords = [...data.records].sort((a, b) =>
            `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`)
        );

        categoryDetails.hidden = false;

        categoryDetails.innerHTML = `
            <div class="details-heading">
                <div>
                    <h3>
                        ${info.emoji}
                        ${escapeHTML(categoryName(name))}
                        ${t("details")}
                    </h3>

                    <p>
                        ${data.count}
                        ${data.count === 1
                            ? t("transaction")
                            : t("transactionsPlural")}
                        · ${formatMoney(data.amount)} ${t("total")}
                    </p>
                </div>

                <button
                    type="button"
                    class="close-details"
                    aria-label="${escapeHTML(t("closeDetails"))}"
                >×</button>
            </div>

            <div class="transaction-list">
                ${sortedRecords.map(transactionHTML).join("")}
            </div>
        `;

        categoryDetails
            .querySelector(".close-details")
            .addEventListener("click", () => {
                selectedCategory = null;

                renderCategories(
                    sortedCategories,
                    sortedCategories.reduce(
                        (sum, [, value]) => sum + value.amount,
                        0
                    )
                );
            });
    }

    function transactionHTML(item) {
        const info = CATEGORY_INFO[item.category] || { emoji: "📦" };

        return `
            <article class="transaction-row">
                <div class="transaction-main">
                    <div class="transaction-title">
                        ${escapeHTML(item.name)}
                    </div>

                    <div class="transaction-meta">
                        ${escapeHTML(formatDate(item.date, {
                            weekday: "short",
                            day: "numeric",
                            month: "short"
                        }))}
                        · ${escapeHTML(formatTime(item.time))}
                        · ${info.emoji} ${escapeHTML(categoryName(item.category))}
                    </div>
                </div>

                <div class="transaction-amount">
                    ${formatMoney(item.amount)}
                </div>
            </article>
        `;
    }

    function renderWeeks(records) {
        if (!records.length) {
            weeklyBreakdown.innerHTML =
                `<div class="empty-inline">${t("noWeeklyData")}</div>`;

            return;
        }

        const year = selectedMonth.getFullYear();
        const month = selectedMonth.getMonth();
        const lastDay = new Date(year, month + 1, 0).getDate();

        const ranges = [
            { number: 1, start: 1, end: Math.min(7, lastDay) },
            { number: 2, start: 8, end: Math.min(14, lastDay) },
            { number: 3, start: 15, end: Math.min(21, lastDay) },
            { number: 4, start: 22, end: lastDay }
        ].filter(week => week.start <= lastDay);

        weeklyBreakdown.innerHTML = ranges.map(week => {
            const weekRecords = records.filter(item => {
                const day = Number(item.date.slice(8, 10));
                return day >= week.start && day <= week.end;
            });

            const weekTotal = weekRecords.reduce(
                (sum, item) => sum + item.amount,
                0
            );

            const isOpen = openWeekNumber === week.number;

            const rangeText = `${selectedMonth.toLocaleDateString(
                language() === "ar" ? "ar-EG" : "en-US",
                { month: "short" }
            )} ${week.start}–${week.end}`;

            const daysMap = new Map();

            weekRecords.forEach(item => {
                const list = daysMap.get(item.date) || [];
                list.push(item);
                daysMap.set(item.date, list);
            });

            const daysHTML = [...daysMap.entries()]
                .sort((a, b) => b[0].localeCompare(a[0]))
                .map(([date, dayRecords]) => {
                    const dayTotal = dayRecords.reduce(
                        (sum, item) => sum + item.amount,
                        0
                    );

                    const dayIsOpen = openDayKey === date;

                    const sortedDayRecords = [...dayRecords].sort((a, b) =>
                        (b.time || "").localeCompare(a.time || "")
                    );

                    return `
                        <section class="day-card">
                            <button
                                type="button"
                                class="day-toggle"
                                data-day="${escapeHTML(date)}"
                                aria-expanded="${dayIsOpen}"
                                aria-controls="day-transactions-${escapeHTML(date)}"
                            >
                                <span class="chevron">
                                    ${dayIsOpen ? "⌄" : "›"}
                                </span>

                                <span class="day-info">
                                    <span class="day-title">
                                        ${escapeHTML(formatDate(date, {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "short"
                                        }))}
                                    </span>

                                    <span class="day-count">
                                        ${dayRecords.length}
                                        ${dayRecords.length === 1
                                            ? t("transaction")
                                            : t("transactionsPlural")}
                                    </span>
                                </span>

                                <span class="day-total">
                                    ${formatMoney(dayTotal)}
                                </span>
                            </button>

                            ${dayIsOpen ? `
                                <div
                                    class="day-transactions"
                                    id="day-transactions-${escapeHTML(date)}"
                                    style="display:block;visibility:visible;opacity:1"
                                >
                                    ${sortedDayRecords.length
                                        ? sortedDayRecords.map(transactionHTML).join("")
                                        : `<p class="transaction-meta">${t("noTransactionsDay")}</p>`}
                                </div>
                            ` : ""}
                        </section>
                    `;
                }).join("");

            return `
                <section class="week-card">
                    <button
                        type="button"
                        class="week-toggle"
                        data-week="${week.number}"
                        aria-expanded="${isOpen}"
                    >
                        <span class="chevron">
                            ${isOpen ? "⌄" : "›"}
                        </span>

                        <span class="week-info">
                            <span class="week-title">
                                ${t("week", week.number)}
                            </span>

                            <span class="week-range">
                                ${rangeText}
                            </span>
                        </span>

                        <span class="week-total">
                            ${formatMoney(weekTotal)}
                        </span>
                    </button>

                    ${isOpen ? `
                        <div class="week-content">
                            ${daysHTML || `<p class="transaction-meta">${t("noSpendingWeek")}</p>`}
                        </div>
                    ` : ""}
                </section>
            `;
        }).join("");
    }

    weeklyBreakdown.addEventListener("click", event => {
        const dayButton = event.target.closest("[data-day]");

        if (dayButton && weeklyBreakdown.contains(dayButton)) {
            const date = dayButton.dataset.day;

            openDayKey = openDayKey === date ? null : date;

            renderWeeks(getMonthRecords());
            return;
        }

        const weekButton = event.target.closest("[data-week]");

        if (weekButton && weeklyBreakdown.contains(weekButton)) {
            const number = Number(weekButton.dataset.week);

            openWeekNumber = openWeekNumber === number
                ? null
                : number;

            openDayKey = null;

            renderWeeks(getMonthRecords());
        }
    });

    function renderInsights(records, sortedCategories, total, budget) {
        const days = new Map();

        records.forEach(item => {
            days.set(item.date, (days.get(item.date) || 0) + item.amount);
        });

        const highestDay = [...days.entries()]
            .sort((a, b) => b[1] - a[1])[0];

        const top = sortedCategories[0];

        let tip = t("noPatterns");

        if (top && total > 0) {
            const categoryPercent = (top[1].amount / total) * 100;

            tip = t(
                "biggestCategory",
                categoryName(top[0]),
                categoryPercent.toFixed(1)
            );

            if (budget && top[1].amount / budget >= 0.4) {
                tip += t(
                    "budgetShare",
                    (top[1].amount / budget * 100).toFixed(1)
                );
            }
        } else if (budget && total === 0) {
            tip = t("budgetNoSpending");
        }

        const highestDayHTML = highestDay
            ? `${escapeHTML(formatDate(highestDay[0], {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric"
            }))}: <strong>${formatMoney(highestDay[1])}</strong>`
            : t("noSpendingThisMonth");

        quickInsights.innerHTML = `
            <article class="insight-card">
                <span class="insight-icon">📆</span>

                <div>
                    <h3>${t("highestDay")}</h3>
                    <p>${highestDayHTML}</p>
                </div>
            </article>

            <article class="insight-card">
                <span class="insight-icon">🌿</span>

                <div>
                    <h3>${t("spendingTip")}</h3>
                    <p>${escapeHTML(tip)}</p>
                </div>
            </article>
        `;
    }

    previousMonthButton.addEventListener("click", () => {
        selectedMonth = new Date(
            selectedMonth.getFullYear(),
            selectedMonth.getMonth() - 1,
            1
        );

        selectedCategory = null;
        openWeekNumber = null;
        openDayKey = null;

        const carryoverModal = $("#carryover-modal");

        if (carryoverModal) {
            carryoverModal.classList.remove("is-open");
        }

        document.body.style.overflow = "";

        renderReport();
    });

    nextMonthButton.addEventListener("click", () => {
        selectedMonth = new Date(
            selectedMonth.getFullYear(),
            selectedMonth.getMonth() + 1,
            1
        );

        selectedCategory = null;
        openWeekNumber = null;
        openDayKey = null;

        const carryoverModal = $("#carryover-modal");

        if (carryoverModal) {
            carryoverModal.classList.remove("is-open");
        }

        document.body.style.overflow = "";

        renderReport();
    });

    window.addEventListener("storage", event => {
        if ([
            SPENDING_KEY,
            MONTHLY_BUDGETS_KEY,
            LEGACY_MONTHLY_BUDGET_KEY,
            CARRYOVERS_KEY,
            DAILY_BUDGET_KEY
        ].includes(event.key)) {
            renderReport();
        }
    });

    window.addEventListener("languageChanged", applyReportLanguage);

    window.addEventListener("spendlyThemeChanged", () => {
        // Theme colors are controlled by theme.css.
    });

    applyReportLanguage();
})();