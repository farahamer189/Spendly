
/* ==========================================
   Spendly Monthly Report
   Data source: spendlySpending
   Monthly budgets: spendlyMonthlyBudgets
========================================== */

const SPENDING_KEY = "spendlySpending";
const MONTHLY_BUDGETS_KEY = "spendlyMonthlyBudgets";
const LEGACY_MONTHLY_BUDGET_KEY = "spendlyMonthlyBudget";

const monthTitle = document.querySelector("#current-month");
const previousMonthButton = document.querySelector("#previous-month");
const nextMonthButton = document.querySelector("#next-month");

const totalSpentElement = document.querySelector("#total-spent");
const budgetLabel = document.querySelector("#budget-label");
const budgetPercent = document.querySelector("#budget-percent");
const budgetProgress = document.querySelector("#budget-progress");
const budgetStatus = document.querySelector("#budget-status");

const transactionCount = document.querySelector("#transaction-count");
const dailyAverage = document.querySelector("#daily-average");
const topCategory = document.querySelector("#top-category");

const categoryBreakdown = document.querySelector("#category-breakdown");
const categoryDetails = document.querySelector("#category-details");
const weeklyBreakdown = document.querySelector("#weekly-breakdown");
const quickInsights = document.querySelector("#quick-insights");
const emptyState = document.querySelector("#empty-state");

const CATEGORY_INFO = {
    Food: { emoji: "🍔", label: "Food" },
    Transportation: { emoji: "🚕", label: "Transportation" },
    Shopping: { emoji: "🛒", label: "Shopping" },
    Bills: { emoji: "💡", label: "Bills" },
    Entertainment: { emoji: "🎬", label: "Entertainment" },
    Health: { emoji: "💊", label: "Health" },
    Other: { emoji: "📦", label: "Other" }
};

const CATEGORY_COLORS = [
    "#A58B6B",
    "#8FA18A",
    "#C59A93",
    "#AAA0C2",
    "#D0AD70",
    "#8DAEB0",
    "#B4A99B"
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

/* ==========================================
   Local Storage
========================================== */

function readJSON(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        console.error(`Could not read ${key}:`, error);
        return fallback;
    }
}

function getSpendingRecords() {
    const data = readJSON(SPENDING_KEY, []);

    if (!Array.isArray(data)) {
        return [];
    }

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

    if (
        budgets &&
        typeof budgets === "object" &&
        !Array.isArray(budgets)
    ) {
        return budgets;
    }

    const legacy = readJSON(LEGACY_MONTHLY_BUDGET_KEY, null);

    if (legacy !== null && legacy !== "") {
        const value = Number(
            typeof legacy === "object" ? legacy.amount : legacy
        );

        if (Number.isFinite(value) && value > 0) {
            const now = new Date();

            return {
                [monthKey(now)]: value
            };
        }
    }

    return {};
}

/* ==========================================
   Formatting Helpers
========================================== */

function monthKey(date) {
    return `${date.getFullYear()}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}`;
}

function formatMoney(amount) {
    return `${new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2
    }).format(amount)} EGP`;
}

function formatDate(
    dateString,
    options = { day: "numeric", month: "short" }
) {
    const date = new Date(`${dateString}T12:00:00`);

    return Number.isNaN(date.getTime())
        ? dateString
        : new Intl.DateTimeFormat("en-GB", options).format(date);
}

function formatTime(time) {
    if (!time) {
        return "Time not recorded";
    }

    const parts = time.split(":");

    if (parts.length < 2) {
        return time;
    }

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

    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);
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

/* ==========================================
   Month Data
========================================== */

function getMonthRecords() {
    const key = monthKey(selectedMonth);

    return getSpendingRecords()
        .filter(item => item.date.startsWith(`${key}-`))
        .sort((a, b) =>
            `${b.date} ${b.time}`.localeCompare(
                `${a.date} ${a.time}`
            )
        );
}

function getBudgetForSelectedMonth() {
    const budgets = getMonthlyBudgets();
    const value = Number(budgets[monthKey(selectedMonth)]);

    return Number.isFinite(value) && value > 0
        ? value
        : null;
}

/* ==========================================
   Main Report
========================================== */

function renderReport() {
    const records = getMonthRecords();

    const total = records.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const budget = getBudgetForSelectedMonth();

    const daysInMonth = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        0
    ).getDate();

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
        "en-US",
        {
            month: "long",
            year: "numeric"
        }
    );

    totalSpentElement.textContent = formatMoney(total);

    transactionCount.textContent =
        records.length.toLocaleString("en-US");

    dailyAverage.textContent = formatMoney(
        total / Math.max(daysInMonth, 1)
    );

    topCategory.textContent = sortedCategories.length
        ? (
            CATEGORY_INFO[sortedCategories[0][0]]?.label ||
            sortedCategories[0][0]
        )
        : "—";

    renderBudget(total, budget);
    renderCategories(sortedCategories, total);
    renderWeeks(records);
    renderInsights(records, sortedCategories, total, budget);

    emptyState.hidden = records.length > 0;
}

/* ==========================================
   Budget Summary
========================================== */

function renderBudget(total, budget) {
    if (!budget) {
        budgetLabel.textContent = "Monthly budget: Not set";
        budgetPercent.textContent = "—";
        budgetProgress.style.width = "0%";
        budgetProgress.style.background = "#82977e";

        budgetStatus.className = "budget-status neutral";

        budgetStatus.textContent =
            "Set a monthly budget in My Money to compare your spending with your plan.";

        return;
    }

    const percent = Math.round((total / budget) * 100);
    const safePercent = Math.min(percent, 100);

    budgetLabel.textContent =
        `Monthly budget: ${formatMoney(budget)}`;

    budgetPercent.textContent = `${percent}%`;
    budgetProgress.style.width = `${safePercent}%`;

    if (total > budget) {
        budgetStatus.className = "budget-status warning";

        budgetStatus.textContent =
            `⚠️ You spent ${formatMoney(total - budget)} over your monthly budget.`;

        budgetProgress.style.background = "#bd7568";
    } else if (total === budget) {
        budgetStatus.className = "budget-status warning";

        budgetStatus.textContent =
            "You reached your monthly budget.";

        budgetProgress.style.background = "#bd9a68";
    } else {
        budgetStatus.className = "budget-status";

        budgetStatus.textContent =
            `🎉 ${formatMoney(budget - total)} remaining this month.`;

        budgetProgress.style.background = "#82977e";
    }
}

/* ==========================================
   Category Breakdown
========================================== */

function renderCategories(sortedCategories, total) {
    selectedCategory = sortedCategories.some(
        ([name]) => name === selectedCategory
    ) ? selectedCategory : null;

    if (!sortedCategories.length) {
        categoryBreakdown.innerHTML = `
            <div class="empty-inline">
                No category totals yet for this month.
            </div>
        `;

        categoryDetails.hidden = true;
        categoryDetails.innerHTML = "";

        return;
    }

    categoryBreakdown.innerHTML = sortedCategories
        .map(([name, data], index) => {
            const info = CATEGORY_INFO[name] || {
                emoji: "📦",
                label: name
            };

            const percent = total > 0
                ? (data.amount / total) * 100
                : 0;

            const color =
                CATEGORY_COLORS[index % CATEGORY_COLORS.length];

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
                            ${escapeHTML(info.label)}
                        </span>

                        <span class="category-amount">
                            ${formatMoney(data.amount)}
                        </span>
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
                            ${data.count === 1 ? "transaction" : "transactions"}
                        </span>

                        <span>${percent.toFixed(1)}% of spending</span>
                    </div>
                </button>
            `;
        })
        .join("");

    categoryBreakdown
        .querySelectorAll("[data-category]")
        .forEach(button => {
            button.addEventListener("click", () => {
                const category = button.dataset.category;

                selectedCategory =
                    selectedCategory === category ? null : category;

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

    const info = CATEGORY_INFO[name] || {
        emoji: "📦",
        label: name
    };

    const sortedRecords = [...data.records].sort((a, b) =>
        `${b.date} ${b.time}`.localeCompare(
            `${a.date} ${a.time}`
        )
    );

    categoryDetails.hidden = false;

    categoryDetails.innerHTML = `
        <div class="details-heading">
            <div>
                <h3>${info.emoji} ${escapeHTML(info.label)} details</h3>

                <p>
                    ${data.count}
                    ${data.count === 1 ? "transaction" : "transactions"}
                    · ${formatMoney(data.amount)} total
                </p>
            </div>

            <button
                type="button"
                class="close-details"
                aria-label="Close category details"
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

/* ==========================================
   Transaction Details
========================================== */

function transactionHTML(item) {
    const info = CATEGORY_INFO[item.category] || {
        emoji: "📦",
        label: item.category
    };

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
                    · ${info.emoji} ${escapeHTML(info.label)}
                </div>
            </div>

            <div class="transaction-amount">
                ${formatMoney(item.amount)}
            </div>
        </article>
    `;
}

/* ==========================================
   Weekly Breakdown
   Week click -> Days
   Day click -> Individual transactions
========================================== */

function renderWeeks(records) {
    if (!records.length) {
        weeklyBreakdown.innerHTML = `
            <div class="empty-inline">
                Your weekly timeline will appear here after you record spending.
            </div>
        `;

        return;
    }

    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();

    const lastDay = new Date(year, month + 1, 0).getDate();

    const weekRanges = [
        { number: 1, start: 1, end: Math.min(7, lastDay) },
        { number: 2, start: 8, end: Math.min(14, lastDay) },
        { number: 3, start: 15, end: Math.min(21, lastDay) },
        { number: 4, start: 22, end: lastDay }
    ].filter(week => week.start <= lastDay);

    weeklyBreakdown.innerHTML = weekRanges.map(week => {
        const weekRecords = records.filter(item => {
            const day = Number(item.date.slice(8, 10));

            return day >= week.start && day <= week.end;
        });

        const weekTotal = weekRecords.reduce(
            (sum, item) => sum + item.amount,
            0
        );

        const isOpen = openWeekNumber === week.number;

        const rangeText = `${
            selectedMonth.toLocaleDateString("en-US", {
                month: "short"
            })
        } ${week.start}–${week.end}`;

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

                const sortedDayRecords = [...dayRecords].sort(
                    (a, b) => {
                        const timeA = a.time || "";
                        const timeB = b.time || "";

                        return timeB.localeCompare(timeA);
                    }
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
                                    ${dayRecords.length === 1 ? "transaction" : "transactions"}
                                </span>
                            </span>

                            <span class="day-total">
                                ${formatMoney(dayTotal)}
                            </span>
                        </button>

                        ${
                            dayIsOpen
                                ? `
                                    <div
                                        class="day-transactions"
                                        id="day-transactions-${escapeHTML(date)}"
                                        style="display:block; visibility:visible; opacity:1;"
                                    >
                                        ${
                                            sortedDayRecords.length
                                                ? sortedDayRecords
                                                    .map(transactionHTML)
                                                    .join("")
                                                : `
                                                    <p class="transaction-meta">
                                                        No transactions recorded for this day.
                                                    </p>
                                                `
                                        }
                                    </div>
                                `
                                : ""
                        }
                    </section>
                `;
            })
            .join("");

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
                            Week ${week.number}
                        </span>

                        <span class="week-range">
                            ${rangeText}
                        </span>
                    </span>

                    <span class="week-total">
                        ${formatMoney(weekTotal)}
                    </span>
                </button>

                ${
                    isOpen
                        ? `
                            <div class="week-content">
                                ${
                                    daysHTML ||
                                    `<p class="transaction-meta">
                                        No spending recorded during this week.
                                    </p>`
                                }
                            </div>
                        `
                        : ""
                }
            </section>
        `;
    }).join("");
}

/*
  One delegated click handler handles both weeks and days.
  This continues working after weeklyBreakdown is re-rendered.
*/

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

        openWeekNumber =
            openWeekNumber === number ? null : number;

        openDayKey = null;

        renderWeeks(getMonthRecords());
    }
});

/* ==========================================
   Quick Insights
========================================== */

function renderInsights(records, sortedCategories, total, budget) {
    const days = new Map();

    records.forEach(item => {
        days.set(
            item.date,
            (days.get(item.date) || 0) + item.amount
        );
    });

    const highestDay = [...days.entries()]
        .sort((a, b) => b[1] - a[1])[0];

    const top = sortedCategories[0];

    let tip =
        "Add a few spending records to discover useful patterns in your money habits.";

    if (top && total > 0) {
        const categoryPercent = (top[1].amount / total) * 100;

        tip = `${
            CATEGORY_INFO[top[0]]?.label || top[0]
        } is your biggest category at ${categoryPercent.toFixed(1)}% of your recorded spending.`;

        if (budget && top[1].amount / budget >= 0.4) {
            tip += ` It also uses ${
                (top[1].amount / budget * 100).toFixed(1)
            }% of your monthly budget.`;
        }
    } else if (budget && total === 0) {
        tip =
            "Your budget is set, but there are no spending records for this month yet.";
    }

    const highestDayHTML = highestDay
        ? `${escapeHTML(formatDate(highestDay[0], {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric"
        }))}: <strong>${formatMoney(highestDay[1])}</strong>`
        : "No spending recorded yet for this month.";

    quickInsights.innerHTML = `
        <article class="insight-card">
            <span class="insight-icon">📆</span>

            <div>
                <h3>Highest Spending Day</h3>
                <p>${highestDayHTML}</p>
            </div>
        </article>

        <article class="insight-card">
            <span class="insight-icon">🌿</span>

            <div>
                <h3>Your Spending Tip</h3>
                <p>${escapeHTML(tip)}</p>
            </div>
        </article>
    `;
}

/* ==========================================
   Month Navigation
========================================== */

previousMonthButton.addEventListener("click", () => {
    selectedMonth = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() - 1,
        1
    );

    selectedCategory = null;
    openWeekNumber = null;
    openDayKey = null;

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

    renderReport();
});

/* ==========================================
   Update when storage changes in another tab
========================================== */

window.addEventListener("storage", event => {
    if (
        [
            SPENDING_KEY,
            MONTHLY_BUDGETS_KEY,
            LEGACY_MONTHLY_BUDGET_KEY
        ].includes(event.key)
    ) {
        renderReport();
    }
});

/* ==========================================
   Initial Render
========================================== */

renderReport();
