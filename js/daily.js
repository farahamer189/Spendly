/* =========================
   Spendly - My Money
========================= */

/* Page Elements */
const addSpendingButton = document.querySelector("#add-spending-btn");
const spendingModal = document.querySelector("#spending-modal");
const closeModalButton = document.querySelector("#close-modal");
const cancelModalButton = document.querySelector("#cancel-modal");
const spendingForm = document.querySelector("#spending-form");
const spendingList = document.querySelector("#spending-list");
const successToast = document.querySelector("#success-toast");

/* Daily Budget Elements */
const setBudgetButton = document.querySelector("#set-budget-btn");
const budgetModal = document.querySelector("#budget-modal");
const closeBudgetModalButton = document.querySelector("#close-budget-modal");
const cancelBudgetModalButton = document.querySelector("#cancel-budget-modal");
const budgetForm = document.querySelector("#budget-form");
const budgetAmountInput = document.querySelector("#budget-amount");
const editDailyBudgetButton = document.querySelector("#edit-daily-budget-btn");
const deleteDailyBudgetButton = document.querySelector("#delete-daily-budget-btn");

/* Monthly Budget Elements */
const monthlyBudgetElement = document.querySelector("#monthly-budget");
const monthlyRemainingElement = document.querySelector("#monthly-remaining");
const editMonthlyBudgetButton = document.querySelector("#edit-monthly-budget-btn");
const deleteMonthlyBudgetButton = document.querySelector("#delete-monthly-budget-btn");
const monthlyBudgetModal = document.querySelector("#monthly-budget-modal");
const monthlyBudgetForm = document.querySelector("#monthly-budget-form");
const monthlyBudgetAmountInput = document.querySelector("#monthly-budget-amount");
const closeMonthlyBudgetModalButton = document.querySelector("#close-monthly-budget-modal");
const cancelMonthlyBudgetModalButton = document.querySelector("#cancel-monthly-budget-modal");

/* Summary Elements */
const dailyBudgetElement = document.querySelector("#daily-budget");
const spentTodayElement = document.querySelector("#spent-today");
const remainingBudgetElement = document.querySelector("#remaining-budget");
const dailyMessageText = document.querySelector("#daily-message-text");

/* Spending Form Elements */
const spendingNameInput = document.querySelector("#spending-name");
const spendingAmountInput = document.querySelector("#spending-amount");
const spendingCategoryInput = document.querySelector("#spending-category");
const saveSpendingButton = document.querySelector(".save-spending-btn");

/* Delete Spending Modal */
const deleteModal = document.querySelector("#delete-modal");
const deleteCancelButton = document.querySelector("#delete-cancel-btn");
const deleteConfirmButton = document.querySelector("#delete-confirm-btn");

/* Delete Budget Modal */
const budgetDeleteModal = document.querySelector("#budget-delete-modal");
const budgetDeleteMessage = document.querySelector("#budget-delete-message");
const budgetDeleteCancelButton = document.querySelector("#budget-delete-cancel-btn");
const budgetDeleteConfirmButton = document.querySelector("#budget-delete-confirm-btn");

/* State */
let editingSpendingId = null;
let deletingSpendingId = null;
let deletingBudgetType = null;
let dailyBudget = null;
let monthlyBudget = null;

/* Date Helpers */
function getDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getMonthKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getCurrentDateKey() {
    return getDateKey(new Date());
}

function getCurrentMonthKey() {
    return getMonthKey(new Date());
}

/* Category Icons */
const categoryIcons = {
    Food: "🍔",
    Transportation: "🚕",
    Shopping: "🛒",
    Bills: "💡",
    Entertainment: "🎬",
    Health: "💊",
    Other: "📦"
};

/* Language Helpers */
function getCurrentLanguage() {
    return localStorage.getItem("spendlyLanguage") || "en";
}

function getText(key) {
    const language = getCurrentLanguage();

    if (typeof translations !== "undefined") {
        return translations[language]?.[key]
            ?? translations.en?.[key]
            ?? key;
    }

    return key;
}

function getCategoryText(category) {
    if (typeof translations !== "undefined") {
        const language = getCurrentLanguage();

        return translations[language]?.categories?.[category]
            ?? translations.en?.categories?.[category]
            ?? category;
    }

    return category;
}

/* Currency Formatting */
function formatMoney(amount) {
    const language = getCurrentLanguage();

    const formattedAmount = Number(amount).toLocaleString(
        language === "ar" ? "ar-EG" : "en-US",
        {
            maximumFractionDigits: 2
        }
    );

    return `${formattedAmount} EGP`;
}

/* Escape User-Entered Text */
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}

/* =========================
   Load All Spending
========================= */

let allSpending = [];

try {
    const savedSpending = JSON.parse(
        localStorage.getItem("spendlySpending") || "[]"
    );

    if (Array.isArray(savedSpending)) {
        allSpending = savedSpending.map(function (spending, index) {
            const date = new Date(spending.date);

            const validDate = Number.isNaN(date.getTime())
                ? new Date()
                : date;

            const time = new Date(
                spending.time || spending.date || validDate
            );

            const validTime = Number.isNaN(time.getTime())
                ? validDate
                : time;

            return {
                ...spending,
                id: spending.id ?? `legacy-${index}-${validDate.getTime()}`,
                name: String(spending.name ?? ""),
                amount: Number(spending.amount) || 0,
                category: spending.category || "Other",
                date: validDate,
                time: validTime
            };
        });
    }
} catch (error) {
    console.error("Could not load saved spending.", error);
    allSpending = [];
}

/* Save Spending Records */
function saveSpendingRecords() {
    localStorage.setItem(
        "spendlySpending",
        JSON.stringify(allSpending)
    );
}

/* Only Today's Spending */
function getTodaySpending() {
    const today = getCurrentDateKey();

    return allSpending.filter(function (spending) {
        return getDateKey(new Date(spending.date)) === today;
    });
}

/* =========================
   Load Monthly Budgets
========================= */

let monthlyBudgets = {};

try {
    monthlyBudgets = JSON.parse(
        localStorage.getItem("spendlyMonthlyBudgets") || "{}"
    );

    if (
        !monthlyBudgets ||
        typeof monthlyBudgets !== "object" ||
        Array.isArray(monthlyBudgets)
    ) {
        monthlyBudgets = {};
    }
} catch (error) {
    monthlyBudgets = {};
}

/* Support Existing Monthly Budget Data */
function loadMonthlyBudget() {
    const monthKey = getCurrentMonthKey();

    if (Object.prototype.hasOwnProperty.call(monthlyBudgets, monthKey)) {
        const amount = Number(monthlyBudgets[monthKey]);

        monthlyBudget = Number.isFinite(amount) && amount > 0
            ? amount
            : null;

        return;
    }

    const oldBudget = localStorage.getItem("spendlyMonthlyBudget");

    if (oldBudget !== null && oldBudget !== "") {
        const amount = Number(oldBudget);

        if (Number.isFinite(amount) && amount > 0) {
            monthlyBudget = amount;
            monthlyBudgets[monthKey] = amount;

            localStorage.setItem(
                "spendlyMonthlyBudgets",
                JSON.stringify(monthlyBudgets)
            );

            return;
        }
    }

    monthlyBudget = null;
}

loadMonthlyBudget();

/* Save Monthly Budget */
function saveMonthlyBudget() {
    const monthKey = getCurrentMonthKey();

    monthlyBudgets[monthKey] = monthlyBudget;

    localStorage.setItem(
        "spendlyMonthlyBudgets",
        JSON.stringify(monthlyBudgets)
    );
}

/* =========================
   Load Today's Budget
========================= */

function loadDailyBudget() {
    dailyBudget = null;

    try {
        const savedBudget = JSON.parse(
            localStorage.getItem("spendlyDailyBudget") || "null"
        );

        if (!savedBudget || typeof savedBudget !== "object") {
            return;
        }

        const savedDate = savedBudget.date;

        const isToday =
            savedDate === getCurrentDateKey() ||
            savedDate === new Date().toDateString();

        const amount = Number(savedBudget.amount);

        if (isToday && Number.isFinite(amount) && amount > 0) {
            dailyBudget = amount;
        }
    } catch (error) {
        console.error("Could not load daily budget.", error);
    }
}

loadDailyBudget();

/* Save Today's Budget */
function saveDailyBudget() {
    if (dailyBudget === null) {
        localStorage.removeItem("spendlyDailyBudget");
        return;
    }

    localStorage.setItem(
        "spendlyDailyBudget",
        JSON.stringify({
            amount: dailyBudget,
            date: getCurrentDateKey()
        })
    );
}

/* =========================
   Modal Helpers
========================= */

function openModal(modal) {
    if (modal) {
        modal.classList.add("show");
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove("show");
    }
}

/* =========================
   Success Toast
========================= */

let toastTimeout;

function showSuccessToast(message) {
    if (!successToast) return;

    const toastMessage = successToast.querySelector("p");

    if (toastMessage) {
        toastMessage.textContent = message;
    }

    successToast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(function () {
        successToast.classList.remove("show");
    }, 2500);
}

/* =========================
   Spending Modal
========================= */

if (addSpendingButton) {
    addSpendingButton.addEventListener("click", function () {
        editingSpendingId = null;

        spendingForm.reset();

        if (saveSpendingButton) {
            saveSpendingButton.textContent = getText("saveSpending");
        }

        openModal(spendingModal);
    });
}

if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
        closeModal(spendingModal);
        editingSpendingId = null;
    });
}

if (cancelModalButton) {
    cancelModalButton.addEventListener("click", function () {
        closeModal(spendingModal);
        editingSpendingId = null;
    });
}

/* =========================
   Daily Budget Modal
========================= */

function openDailyBudgetModal() {
    budgetForm.reset();
    budgetAmountInput.value = dailyBudget ?? "";

    openModal(budgetModal);
}

if (setBudgetButton) {
    setBudgetButton.addEventListener("click", openDailyBudgetModal);
}

if (editDailyBudgetButton) {
    editDailyBudgetButton.addEventListener("click", openDailyBudgetModal);
}

if (closeBudgetModalButton) {
    closeBudgetModalButton.addEventListener("click", function () {
        closeModal(budgetModal);
    });
}

if (cancelBudgetModalButton) {
    cancelBudgetModalButton.addEventListener("click", function () {
        closeModal(budgetModal);
    });
}

/* Save Today's Budget */
if (budgetForm) {
    budgetForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const amount = Number(budgetAmountInput.value);

        if (!Number.isFinite(amount) || amount <= 0) {
            budgetAmountInput.focus();
            return;
        }

        dailyBudget = amount;

        saveDailyBudget();
        updateDailySummary();

        budgetForm.reset();
        closeModal(budgetModal);

        showSuccessToast(
            getCurrentLanguage() === "ar"
                ? "تم حفظ ميزانية اليوم بنجاح!"
                : "Today's budget saved successfully!"
        );
    });
}

/* =========================
   Monthly Budget Modal
========================= */

if (editMonthlyBudgetButton) {
    editMonthlyBudgetButton.addEventListener("click", function () {
        monthlyBudgetAmountInput.value = monthlyBudget ?? "";
        openModal(monthlyBudgetModal);
    });
}

if (closeMonthlyBudgetModalButton) {
    closeMonthlyBudgetModalButton.addEventListener("click", function () {
        closeModal(monthlyBudgetModal);
    });
}

if (cancelMonthlyBudgetModalButton) {
    cancelMonthlyBudgetModalButton.addEventListener("click", function () {
        closeModal(monthlyBudgetModal);
    });
}

/* Save Monthly Budget */
if (monthlyBudgetForm) {
    monthlyBudgetForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const amount = Number(monthlyBudgetAmountInput.value);

        if (!Number.isFinite(amount) || amount <= 0) {
            monthlyBudgetAmountInput.focus();
            return;
        }

        monthlyBudget = amount;

        saveMonthlyBudget();
        updateDailySummary();

        monthlyBudgetForm.reset();
        closeModal(monthlyBudgetModal);

        showSuccessToast(
            getCurrentLanguage() === "ar"
                ? "تم حفظ الميزانية الشهرية بنجاح!"
                : "Monthly budget saved successfully!"
        );
    });
}

/* =========================
   Add / Edit Spending
========================= */

if (spendingForm) {
    spendingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = spendingNameInput.value.trim();
        const amount = Number(spendingAmountInput.value);
        const category = spendingCategoryInput.value;

        if (
            !name ||
            !Number.isFinite(amount) ||
            amount <= 0 ||
            !category
        ) {
            return;
        }

        if (editingSpendingId !== null) {
            const spending = allSpending.find(function (item) {
                return String(item.id) === String(editingSpendingId);
            });

            if (!spending) return;

            spending.name = name;
            spending.amount = amount;
            spending.category = category;

            showSuccessToast(getText("spendingUpdated"));
        } else {
            const now = new Date();

            allSpending.push({
                id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                name: name,
                amount: amount,
                category: category,
                date: now,
                time: now
            });

            showSuccessToast(getText("spendingAdded"));
        }

        saveSpendingRecords();
        displaySpending();
        updateDailySummary();

        editingSpendingId = null;
        spendingForm.reset();

        if (saveSpendingButton) {
            saveSpendingButton.textContent = getText("saveSpending");
        }

        closeModal(spendingModal);
    });
}

/* =========================
   Display Today's Spending
========================= */

function displaySpending() {
    if (!spendingList) return;

    spendingList.innerHTML = "";

    const todaySpending = getTodaySpending();

    if (todaySpending.length === 0) {
        spendingList.innerHTML = `
            <div class="empty-spending">
                <span>💸</span>
                <p>${escapeHTML(getText("emptySpending"))}</p>
            </div>
        `;

        return;
    }

    todaySpending.sort(function (a, b) {
        return new Date(b.time) - new Date(a.time);
    });

    todaySpending.forEach(function (spending) {
        const spendingCard = document.createElement("div");

        spendingCard.classList.add("spending-card");

        const icon = categoryIcons[spending.category] || "📦";
        const categoryName = getCategoryText(spending.category);

        const time = new Date(spending.time).toLocaleTimeString(
            getCurrentLanguage() === "ar" ? "ar-EG" : "en-US",
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }
        );

        spendingCard.innerHTML = `
            <div class="spending-info">
                <span class="spending-icon">${icon}</span>

                <div>
                    <h3>${escapeHTML(spending.name)}</h3>
                    <p>${escapeHTML(categoryName)} · ${escapeHTML(time)}</p>
                </div>
            </div>

            <div class="spending-right">
                <strong class="spending-amount">
                    ${formatMoney(spending.amount)}
                </strong>

                <div class="spending-actions">
                    <button
                        class="edit-spending-btn"
                        type="button"
                        data-id="${escapeHTML(spending.id)}"
                        aria-label="${getCurrentLanguage() === "ar" ? "تعديل المصروف" : "Edit spending"}"
                        title="${getCurrentLanguage() === "ar" ? "تعديل" : "Edit"}">✏️</button>

                    <button
                        class="delete-spending-btn"
                        type="button"
                        data-id="${escapeHTML(spending.id)}"
                        aria-label="${getCurrentLanguage() === "ar" ? "حذف المصروف" : "Delete spending"}"
                        title="${getCurrentLanguage() === "ar" ? "حذف" : "Delete"}">🗑️</button>
                </div>
            </div>
        `;

        spendingList.appendChild(spendingCard);
    });

    spendingList.querySelectorAll(".edit-spending-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            editSpending(button.dataset.id);
        });
    });

    spendingList.querySelectorAll(".delete-spending-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            deleteSpending(button.dataset.id);
        });
    });
}

/* =========================
   Edit Spending
========================= */

function editSpending(id) {
    const spending = allSpending.find(function (item) {
        return String(item.id) === String(id);
    });

    if (!spending) return;

    editingSpendingId = id;

    spendingNameInput.value = spending.name;
    spendingAmountInput.value = spending.amount;
    spendingCategoryInput.value = spending.category;

    if (saveSpendingButton) {
        saveSpendingButton.textContent = getText("updateSpending");
    }

    openModal(spendingModal);
}

/* =========================
   Delete Spending
========================= */

function deleteSpending(id) {
    deletingSpendingId = id;
    openModal(deleteModal);
}

if (deleteCancelButton) {
    deleteCancelButton.addEventListener("click", function () {
        closeModal(deleteModal);
        deletingSpendingId = null;
    });
}

if (deleteConfirmButton) {
    deleteConfirmButton.addEventListener("click", function () {
        if (deletingSpendingId === null) return;

        allSpending = allSpending.filter(function (item) {
            return String(item.id) !== String(deletingSpendingId);
        });

        saveSpendingRecords();
        displaySpending();
        updateDailySummary();

        closeModal(deleteModal);
        deletingSpendingId = null;

        showSuccessToast(getText("spendingDeleted"));
    });
}

/* =========================
   Delete Budget Confirmation
========================= */

function openBudgetDeleteModal(type) {
    deletingBudgetType = type;

    if (budgetDeleteMessage) {
        budgetDeleteMessage.textContent = type === "monthly"
            ? getText("deleteMonthlyBudgetMessage")
            : getText("deleteDailyBudgetMessage");
    }

    openModal(budgetDeleteModal);
}

/* Delete Monthly Budget Button */
if (deleteMonthlyBudgetButton) {
    deleteMonthlyBudgetButton.addEventListener("click", function () {
        if (monthlyBudget === null) {
            showSuccessToast(
                getCurrentLanguage() === "ar"
                    ? "مفيش ميزانية شهرية محددة لحذفها."
                    : "There is no monthly budget to delete."
            );

            return;
        }

        openBudgetDeleteModal("monthly");
    });
}

/* Delete Daily Budget Button */
if (deleteDailyBudgetButton) {
    deleteDailyBudgetButton.addEventListener("click", function () {
        if (dailyBudget === null) {
            showSuccessToast(
                getCurrentLanguage() === "ar"
                    ? "مفيش ميزانية يومية محددة لحذفها."
                    : "There is no daily budget to delete."
            );

            return;
        }

        openBudgetDeleteModal("daily");
    });
}

/* Cancel Budget Deletion */
if (budgetDeleteCancelButton) {
    budgetDeleteCancelButton.addEventListener("click", function () {
        closeModal(budgetDeleteModal);
        deletingBudgetType = null;
    });
}

/* Confirm Budget Deletion */
if (budgetDeleteConfirmButton) {
    budgetDeleteConfirmButton.addEventListener("click", function () {
        if (deletingBudgetType === "monthly") {
            delete monthlyBudgets[getCurrentMonthKey()];

            localStorage.setItem(
                "spendlyMonthlyBudgets",
                JSON.stringify(monthlyBudgets)
            );

            monthlyBudget = null;

        } else if (deletingBudgetType === "daily") {
            dailyBudget = null;

            localStorage.removeItem("spendlyDailyBudget");
        } else {
            return;
        }

        /*
         * Only the budget is deleted.
         * Existing spending records are never removed here.
         */

        updateDailySummary();

        closeModal(budgetDeleteModal);
        deletingBudgetType = null;

        showSuccessToast(getText("budgetDeleted"));
    });
}

/* =========================
   Update Budget Summaries
========================= */

function updateDailySummary() {
    /*
     * Recheck the date and month so that opening the page on a new day
     * or month loads the correct budgets.
     */

    const currentMonth = getCurrentMonthKey();
    const currentDate = getCurrentDateKey();

    if (
        typeof lastLoadedMonthKey !== "undefined" &&
        lastLoadedMonthKey !== currentMonth
    ) {
        loadMonthlyBudget();
    }

    if (
        typeof lastLoadedDateKey !== "undefined" &&
        lastLoadedDateKey !== currentDate
    ) {
        loadDailyBudget();
    }

    const todaySpending = getTodaySpending();

    const totalSpentToday = todaySpending.reduce(function (total, spending) {
        return total + Number(spending.amount || 0);
    }, 0);

    const totalSpentThisMonth = allSpending.reduce(function (total, spending) {
        const spendingDate = new Date(spending.date);

        if (
            !Number.isNaN(spendingDate.getTime()) &&
            getMonthKey(spendingDate) === currentMonth
        ) {
            return total + Number(spending.amount || 0);
        }

        return total;
    }, 0);

    /* Today's Budget */
    if (dailyBudgetElement) {
        dailyBudgetElement.textContent = dailyBudget === null
            ? getText("notSet")
            : formatMoney(dailyBudget);
    }

    /* Spent Today */
    if (spentTodayElement) {
        spentTodayElement.textContent = formatMoney(totalSpentToday);
    }

    /* Today's Remaining */
    if (remainingBudgetElement) {
        remainingBudgetElement.textContent = dailyBudget === null
            ? "—"
            : formatMoney(dailyBudget - totalSpentToday);
    }

    /* Include any approved carryover from the previous month. */
    let carriedIntoThisMonth = 0;

    try {
        const savedCarryovers = JSON.parse(
            localStorage.getItem("spendlyBudgetCarryovers") || "{}"
        );

        const thisMonthKey = getCurrentMonthKey();

        const previousMonthDate = new Date();
        previousMonthDate.setDate(1);
        previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

        const previousMonthKey = getMonthKey(previousMonthDate);
        const previousDecision = savedCarryovers && savedCarryovers[previousMonthKey];

        if (
            previousDecision &&
            previousDecision.decision === "yes" &&
            previousDecision.targetMonth === thisMonthKey
        ) {
            const amount = Number(previousDecision.amount);

            if (Number.isFinite(amount) && amount > 0) {
                carriedIntoThisMonth = amount;
            }
        }
    } catch (error) {
        console.error("Could not load monthly budget carryover.", error);
    }

    const effectiveMonthlyBudget = monthlyBudget === null
        ? (carriedIntoThisMonth > 0 ? carriedIntoThisMonth : null)
        : monthlyBudget + carriedIntoThisMonth;

    /* Monthly Budget */
    if (monthlyBudgetElement) {
        monthlyBudgetElement.textContent = effectiveMonthlyBudget === null
            ? getText("noMonthlyBudget")
            : formatMoney(effectiveMonthlyBudget);
    }

    /*
     * Monthly remaining:
     * If no daily budget is set, deduct all recorded expenses.
     * If a daily budget is set, count the reservation once and do not
     * deduct today's actual expenses a second time.
     */

    const reservedForToday = dailyBudget === null ? 0 : dailyBudget;
    const spentBeforeToday = totalSpentThisMonth - totalSpentToday;

    const amountAccountedFor = dailyBudget === null
        ? totalSpentThisMonth
        : spentBeforeToday + reservedForToday;

    const monthlyRemaining = effectiveMonthlyBudget === null
        ? null
        : effectiveMonthlyBudget - amountAccountedFor;

    if (monthlyRemainingElement) {
        monthlyRemainingElement.textContent = monthlyRemaining === null
            ? "—"
            : formatMoney(monthlyRemaining);
    }

    /* Daily Spending Message */
    if (dailyMessageText) {
        if (totalSpentToday === 0) {
            dailyMessageText.textContent = getText("noSpending");

        } else if (dailyBudget === null) {
            dailyMessageText.textContent = getText("noBudget");

        } else {
            const percentage = (totalSpentToday / dailyBudget) * 100;

            if (percentage >= 100) {
                dailyMessageText.textContent = getText("reachedBudget");

            } else if (percentage >= 80) {
                dailyMessageText.textContent = getText("closeToBudget");

            } else if (percentage >= 50) {
                dailyMessageText.textContent = getText("usedHalfBudget");

            } else {
                dailyMessageText.textContent = getText("noBudget");
            }
        }
    }

    lastLoadedDateKey = currentDate;
    lastLoadedMonthKey = currentMonth;
}

/* Track Last Loaded Date and Month */
let lastLoadedDateKey = getCurrentDateKey();
let lastLoadedMonthKey = getCurrentMonthKey();

/* =========================
   Language Change
========================= */

window.addEventListener("languageChanged", function () {
    displaySpending();
    updateDailySummary();

    if (saveSpendingButton) {
        saveSpendingButton.textContent = editingSpendingId !== null
            ? getText("updateSpending")
            : getText("saveSpending");
    }

    if (budgetDeleteMessage && deletingBudgetType) {
        budgetDeleteMessage.textContent = deletingBudgetType === "monthly"
            ? getText("deleteMonthlyBudgetMessage")
            : getText("deleteDailyBudgetMessage");
    }
});

/* =========================
   Logout
========================= */

const logoutButton = document.getElementById("logout-btn");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("spendlyLoggedIn");

        window.location.href = "login.html";
    });
}

/* =========================
   Initial Display
========================= */

displaySpending();
updateDailySummary();