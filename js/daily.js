
/* =========================
   Daily Page Elements
========================= */

const addSpendingButton =
    document.querySelector("#add-spending-btn");

const spendingModal =
    document.querySelector("#spending-modal");

const closeModalButton =
    document.querySelector("#close-modal");

const cancelModalButton =
    document.querySelector("#cancel-modal");

const spendingForm =
    document.querySelector("#spending-form");

const spendingList =
    document.querySelector("#spending-list");

const successToast =
    document.querySelector("#success-toast");


/* =========================
   Budget Elements
========================= */

const setBudgetButton =
    document.querySelector("#set-budget-btn");

const budgetModal =
    document.querySelector("#budget-modal");

const closeBudgetModalButton =
    document.querySelector("#close-budget-modal");

const cancelBudgetModalButton =
    document.querySelector("#cancel-budget-modal");

const budgetForm =
    document.querySelector("#budget-form");


/* =========================
   Summary Elements
========================= */

const dailyBudgetElement =
    document.querySelector("#daily-budget");

const spentTodayElement =
    document.querySelector("#spent-today");

const remainingBudgetElement =
    document.querySelector("#remaining-budget");


/* =========================
   Message Elements
========================= */

const dailyMessage =
    document.querySelector("#daily-message");

const dailyMessageText =
    document.querySelector("#daily-message-text");


/* =========================
   Form Elements
========================= */

const spendingNameInput =
    document.querySelector("#spending-name");

const spendingAmountInput =
    document.querySelector("#spending-amount");

const spendingCategoryInput =
    document.querySelector("#spending-category");

const saveSpendingButton =
    document.querySelector(".save-spending-btn");


/* =========================
   Delete Modal Elements
========================= */

const deleteModal =
    document.querySelector("#delete-modal");

const deleteCancelButton =
    document.querySelector("#delete-cancel-btn");

const deleteConfirmButton =
    document.querySelector("#delete-confirm-btn");


/* =========================
   States
========================= */

let deletingSpendingIndex = null;
let editingSpendingIndex = null;


/* =========================
   Daily Budget
========================= */

let dailyBudget = null;


/* =========================
   Today's Date
========================= */

const todayDate =
    new Date().toDateString();


/* =========================
   Load Today's Budget
========================= */

const savedBudget =
    localStorage.getItem("spendlyDailyBudget");

if (savedBudget) {

    try {

        const budgetData =
            JSON.parse(savedBudget);

        if (
            budgetData &&
            typeof budgetData === "object" &&
            budgetData.date === todayDate
        ) {

            dailyBudget =
                Number(budgetData.amount);

        }

    } catch (error) {

        console.log(
            "Could not load daily budget."
        );

    }

}


/* =========================
   Save Today's Budget
========================= */

function saveDailyBudget() {

    localStorage.setItem(
        "spendlyDailyBudget",
        JSON.stringify({
            amount: dailyBudget,
            date: todayDate
        })
    );

}


/* =========================
   Show Saved Budget
========================= */

if (dailyBudget !== null) {

    dailyBudgetElement.textContent =
        `${dailyBudget.toLocaleString()} EGP`;

}


/* =========================
   Today's Spending
========================= */

let todaySpending = [];


/* =========================
   Load Saved Spending
========================= */

const savedSpending =
    localStorage.getItem("spendlySpending");

if (savedSpending) {

    try {

        todaySpending =
            JSON.parse(savedSpending);

        todaySpending.forEach(
            function (spending) {

                spending.date =
                    new Date(spending.date);

                spending.time =
                    new Date(spending.time);

            }
        );

    } catch (error) {

        todaySpending = [];

        console.log(
            "Could not load saved spending."
        );

    }

}


/* =========================
   Save Spending
========================= */

function saveSpending() {

    localStorage.setItem(
        "spendlySpending",
        JSON.stringify(todaySpending)
    );

}


/* =========================
   Category Icons
========================= */

const categoryIcons = {

    Food: "🍔",

    Transportation: "🚕",

    Shopping: "🛒",

    Bills: "💡",

    Entertainment: "🎬",

    Health: "💊",

    Other: "📦"

};


/* =========================
   Current Language
========================= */

function getCurrentLanguage() {

    return localStorage.getItem(
        "spendlyLanguage"
    ) || "en";

}


/* =========================
   Translation Helper
========================= */

function getText(key) {

    const language =
        getCurrentLanguage();

    return translations[language][key];

}


/* =========================
   Category Translation
========================= */

function getCategoryText(category) {

    const language =
        getCurrentLanguage();

    return (
        translations[language]
            .categories[category]
        || category
    );

}


/* =========================
   Open Add Spending Modal
========================= */

addSpendingButton.addEventListener(
    "click",
    function () {

        editingSpendingIndex = null;

        spendingForm.reset();

        saveSpendingButton.textContent =
            getText("saveSpending");

        spendingModal.classList.add("show");

    }
);


/* =========================
   Close Spending Modal
========================= */

closeModalButton.addEventListener(
    "click",
    function () {

        spendingModal.classList.remove("show");

        editingSpendingIndex = null;

    }
);


cancelModalButton.addEventListener(
    "click",
    function () {

        spendingModal.classList.remove("show");

        editingSpendingIndex = null;

    }
);


/* =========================
   Open Budget Modal
========================= */

setBudgetButton.addEventListener(
    "click",
    function () {

        budgetModal.classList.add("show");

    }
);


/* =========================
   Close Budget Modal
========================= */

closeBudgetModalButton.addEventListener(
    "click",
    function () {

        budgetModal.classList.remove("show");

    }
);


cancelBudgetModalButton.addEventListener(
    "click",
    function () {

        budgetModal.classList.remove("show");

    }
);


/* =========================
   Set Budget
========================= */

budgetForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const budgetAmount =
            Number(
                document.querySelector(
                    "#budget-amount"
                ).value
            );

        dailyBudget =
            budgetAmount;

        saveDailyBudget();

        dailyBudgetElement.textContent =
            `${dailyBudget.toLocaleString()} EGP`;

        updateDailySummary();

        budgetForm.reset();

        budgetModal.classList.remove("show");

    }
);


/* =========================
   Add / Edit Spending
========================= */

spendingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /* Get Form Values */

        const name =
            spendingNameInput.value.trim();

        const amount =
            Number(
                spendingAmountInput.value
            );

        const category =
            spendingCategoryInput.value;


        /* =========================
           Edit Existing Spending
        ========================= */

        if (editingSpendingIndex !== null) {

            const spending =
                todaySpending[
                    editingSpendingIndex
                ];


            spending.name =
                name;

            spending.amount =
                amount;

            spending.category =
                category;


            saveSpending();

            displaySpending();

            updateDailySummary();


            showSuccessToast(
                getText("spendingUpdated")
            );

        }


        /* =========================
           Add New Spending
        ========================= */

        else {

            const now =
                new Date();


            const spending = {

                name:
                    name,

                amount:
                    amount,

                category:
                    category,

                date:
                    now,

                time:
                    now

            };


            todaySpending.push(
                spending
            );


            saveSpending();

            displaySpending();

            updateDailySummary();


            showSuccessToast(
                getText("spendingAdded")
            );

        }


        /* Reset Edit State */

        editingSpendingIndex =
            null;


        /* Reset Form */

        spendingForm.reset();


        /* Reset Button */

        saveSpendingButton.textContent =
            getText("saveSpending");


        /* Close Modal */

        spendingModal.classList.remove(
            "show"
        );

    }
);


/* =========================
   Success Toast
========================= */

function showSuccessToast(message) {

    const toastMessage =
        successToast.querySelector("p");


    toastMessage.textContent =
        message;


    successToast.classList.add("show");


    setTimeout(
        function () {

            successToast.classList.remove(
                "show"
            );

        },
        2000
    );

}


/* =========================
   Display Today's Spending
========================= */

function displaySpending() {

    spendingList.innerHTML = "";


    /* Empty State */

    if (todaySpending.length === 0) {

        spendingList.innerHTML = `
            <div class="empty-spending">

                <span>💸</span>

                <p>
                    ${getText("emptySpending")}
                </p>

            </div>
        `;

        return;

    }


    /* Display Spending */

    todaySpending.forEach(
        function (spending, index) {

            const spendingCard =
                document.createElement(
                    "div"
                );


            spendingCard.classList.add(
                "spending-card"
            );


            /* Category Icon */

            const icon =
                categoryIcons[
                    spending.category
                ] || "📦";


            /* Category Name */

            const categoryName =
                getCategoryText(
                    spending.category
                );


            /* Spending Time */

            const time =
                spending.time.toLocaleTimeString(
                    "en-US",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                    }
                );


            /* Spending Card */

            spendingCard.innerHTML = `

                <div class="spending-info">

                    <span class="spending-icon">
                        ${icon}
                    </span>

                    <div>

                        <h3>
                            ${spending.name}
                        </h3>

                        <p>
                            ${categoryName} · ${time}
                        </p>

                    </div>

                </div>


                <div class="spending-right">

                    <strong class="spending-amount">
                        ${spending.amount.toLocaleString()} EGP
                    </strong>


                    <div class="spending-actions">

                        <button
                            class="edit-spending-btn"
                            type="button"
                            data-index="${index}"
                        >
                            ✏️
                        </button>


                        <button
                            class="delete-spending-btn"
                            type="button"
                            data-index="${index}"
                        >
                            🗑️
                        </button>

                    </div>

                </div>

            `;


            spendingList.appendChild(
                spendingCard
            );

        }
    );


    /* =========================
       Edit Buttons
    ========================= */

    const editButtons =
        document.querySelectorAll(
            ".edit-spending-btn"
        );


    editButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    editSpending(index);

                }
            );

        }
    );


    /* =========================
       Delete Buttons
    ========================= */

    const deleteButtons =
        document.querySelectorAll(
            ".delete-spending-btn"
        );


    deleteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    deleteSpending(index);

                }
            );

        }
    );

}


/* =========================
   Edit Spending
========================= */

function editSpending(index) {

    const spending =
        todaySpending[index];


    editingSpendingIndex =
        index;


    /* Fill Form */

    spendingNameInput.value =
        spending.name;

    spendingAmountInput.value =
        spending.amount;

    spendingCategoryInput.value =
        spending.category;


    /* Change Button */

    saveSpendingButton.textContent =
        getText("updateSpending");


    /* Open Modal */

    spendingModal.classList.add(
        "show"
    );

}


/* =========================
   Delete Spending
========================= */

function deleteSpending(index) {

    deletingSpendingIndex =
        index;


    deleteModal.classList.add(
        "show"
    );

}


/* =========================
   Cancel Delete
========================= */

deleteCancelButton.addEventListener(
    "click",
    function () {

        deleteModal.classList.remove(
            "show"
        );

        deletingSpendingIndex =
            null;

    }
);


/* =========================
   Confirm Delete
========================= */

deleteConfirmButton.addEventListener(
    "click",
    function () {

        if (
            deletingSpendingIndex === null
        ) {

            return;

        }


        /* Delete Spending */

        todaySpending.splice(
            deletingSpendingIndex,
            1
        );


        saveSpending();


        /* Update Spending List */

        displaySpending();


        /* Update Summary */

        updateDailySummary();


        /* Close Delete Modal */

        deleteModal.classList.remove(
            "show"
        );


        /* Reset Delete State */

        deletingSpendingIndex =
            null;


        /* Show Success Toast */

        showSuccessToast(
            getText("spendingDeleted")
        );

    }
);


/* =========================
   Update Daily Summary
========================= */

function updateDailySummary() {

    let totalSpent = 0;


    /* Calculate Total Spending */

    todaySpending.forEach(
        function (spending) {

            totalSpent +=
                spending.amount;

        }
    );


    /* Update Spent Today */

    spentTodayElement.textContent =
        `${totalSpent.toLocaleString()} EGP`;


    /* =========================
       Update Daily Message
    ========================= */

    if (totalSpent === 0) {

        dailyMessageText.textContent =
            getText("noSpending");

    }

    else if (dailyBudget === null) {

        dailyMessageText.textContent =
            getText("noBudget");

    }

    else {

        const spendingPercentage =
            (totalSpent / dailyBudget) * 100;


        if (spendingPercentage >= 100) {

            dailyMessageText.textContent =
                getText("reachedBudget");

        }

        else if (spendingPercentage >= 80) {

            dailyMessageText.textContent =
                getText("closeToBudget");

        }

        else if (spendingPercentage >= 50) {

            dailyMessageText.textContent =
                getText("usedHalfBudget");

        }

        else {

            dailyMessageText.textContent =
                getText("noBudget");

        }

    }


    /* =========================
       Update Remaining Budget
    ========================= */

    if (dailyBudget === null) {

        remainingBudgetElement.textContent =
            "—";

        return;

    }


    const remaining =
        dailyBudget - totalSpent;


    remainingBudgetElement.textContent =
        `${remaining.toLocaleString()} EGP`;

}


/* =========================
   Refresh After Language Change
========================= */

window.addEventListener(
    "languageChanged",
    function () {

        displaySpending();

        updateDailySummary();

        if (
            editingSpendingIndex !== null
        ) {

            saveSpendingButton.textContent =
                getText("updateSpending");

        } else {

            saveSpendingButton.textContent =
                getText("saveSpending");

        }

    }
);


/* =========================
   Initial Display
========================= */

displaySpending();

updateDailySummary();
