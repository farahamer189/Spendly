/* =========================
   Expense Form Elements
========================= */

const addExpenseButton = document.querySelector(".add-expense-btn");
const expenseModal = document.querySelector("#expense-modal");
const closeModalButton = document.querySelector("#close-modal");
const cancelModalButton = document.querySelector("#cancel-modal");

const expenseForm = document.querySelector("#expense-form");
const expenseList = document.querySelector("#expenses-list");

const totalSpentElement = document.querySelector("#total-spent");
const expenseCountElement = document.querySelector("#expense-count");

const successMessage = document.querySelector("#success-message");
const successMessageText = successMessage.querySelector("p");

const submitExpenseButton =
    expenseForm.querySelector("button[type='submit']");

    // =========================
// Month Selector
// =========================

const previousMonthButton = document.querySelector("#previous-month");
const nextMonthButton = document.querySelector("#next-month");
const currentMonthElement = document.querySelector("#current-month");

let selectedMonth = new Date();


function updateMonthDisplay() {
    const monthName = selectedMonth.toLocaleString("en-US", {
        month: "long"
    });

    const year = selectedMonth.getFullYear();

    currentMonthElement.textContent = `${monthName} ${year}`;
}




previousMonthButton.addEventListener("click", () => {
    selectedMonth.setMonth(selectedMonth.getMonth() - 1);

    updateMonthDisplay();
    filterExpenses();
});

nextMonthButton.addEventListener("click", () => {
    selectedMonth.setMonth(selectedMonth.getMonth() + 1);

    updateMonthDisplay();
    filterExpenses();
});

updateMonthDisplay();












/* =========================
   Category
========================= */

const categorySelect =
    document.querySelector("#expense-category");

const customCategoryInput =
    document.querySelector("#custom-category");


/* =========================
   Expense Filter
========================= */

const expensePeriod =
    document.querySelector("#expense-period");


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
   Edit Mode
========================= */

let expenseBeingEdited = null;


/* =========================
   Open Add Expense Modal
========================= */

addExpenseButton.addEventListener("click", function () {

    expenseBeingEdited = null;

    expenseForm.reset();

    customCategoryInput.style.display = "none";
    customCategoryInput.required = false;

    submitExpenseButton.textContent = "Add Expense";

    expenseModal.classList.add("show");

});


/* =========================
   Close Modal
========================= */

closeModalButton.addEventListener("click", function () {

    expenseModal.classList.remove("show");

});


cancelModalButton.addEventListener("click", function () {

    expenseModal.classList.remove("show");

});


/* =========================
   Category Selection
========================= */

categorySelect.addEventListener("change", function () {

    if (categorySelect.value === "custom") {

        customCategoryInput.style.display = "block";
        customCategoryInput.required = true;
        customCategoryInput.focus();

    } else {

        customCategoryInput.style.display = "none";
        customCategoryInput.required = false;
        customCategoryInput.value = "";

    }

});


/* =========================
   Show Success Message
========================= */

function showSuccessMessage(message) {

    successMessageText.textContent = message;

    successMessage.classList.add("show");

    setTimeout(function () {

        successMessage.classList.remove("show");

    }, 2000);

}


/* =========================
   Format Date
========================= */

function formatDate(date) {

    const dateObject = new Date(date + "T00:00:00");

    return dateObject.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
    });

}


/* =========================
   Format Time
========================= */

function formatTime(time) {

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

}


/* =========================
   Update Total Spent
========================= */

function updateTotalSpent() {

    let total = 0;

    const expenseCards =
        expenseList.querySelectorAll(".expense-card");


    expenseCards.forEach(function (card) {

        /* Ignore hidden expenses */

        if (card.style.display === "none") {
            return;
        }


        const amountElement =
            card.querySelector(".expense-right strong");


        if (!amountElement) {
            return;
        }


        const amount =
            Number(
                amountElement.textContent
                    .replace(" EGP", "")
                    .replace(/,/g, "")
            );


        total += amount;

    });


    totalSpentElement.textContent =
        `${total.toLocaleString()} EGP`;

}


/* =========================
   Update Expense Count
========================= */

function updateExpenseCount() {

    let count = 0;

    const expenseCards =
        expenseList.querySelectorAll(".expense-card");


    expenseCards.forEach(function (card) {

        /* Count only visible expenses */

        if (card.style.display !== "none") {
            count++;
        }

    });


    expenseCountElement.textContent = count;

}


/* =========================
   Filter Expenses
========================= */

function filterExpenses() {

    const selectedPeriod = expensePeriod.value;

    const expenseCards =
        expenseList.querySelectorAll(".expense-card");


    const today = new Date();

    today.setHours(0, 0, 0, 0);


    const selectedMonthNumber = selectedMonth.getMonth();
const selectedYear = selectedMonth.getFullYear();


    expenseCards.forEach(function (card) {

        const detailsElement =
            card.querySelector(".expense-info p");


        if (!detailsElement) {
            return;
        }


        const details =
            detailsElement.textContent.trim();


        const parts =
            details.split(" · ");


        if (parts.length < 3) {
            return;
        }


        const dateText = parts[1];


        const expenseDate =
            new Date(dateText);


        expenseDate.setHours(0, 0, 0, 0);


        let shouldShow =
    expenseDate.getMonth() === selectedMonthNumber &&
    expenseDate.getFullYear() === selectedYear;


        /* =========================
           All
        ========================= */

        if (selectedPeriod === "all") {

            

        }


        /* =========================
           Today
        ========================= */

        else if (selectedPeriod === "today") {

    shouldShow =
        shouldShow &&
        expenseDate.getTime() === today.getTime();

}


        /* =========================
           This Week
        ========================= */

        else if (selectedPeriod === "week") {

            const dayOfWeek =
                today.getDay();


            const startOfWeek =
                new Date(today);


            startOfWeek.setDate(
                today.getDate() - dayOfWeek
            );


            startOfWeek.setHours(0, 0, 0, 0);


            const endOfWeek =
                new Date(startOfWeek);


            endOfWeek.setDate(
                startOfWeek.getDate() + 6
            );


            endOfWeek.setHours(23, 59, 59, 999);

shouldShow =
    shouldShow &&
    expenseDate >= startOfWeek &&
    expenseDate <= endOfWeek;

        }


        /* =========================
           This Month
        ========================= */

        else if (selectedPeriod === "month") {

    shouldShow =
        shouldShow &&
        expenseDate.getMonth() === selectedMonthNumber &&
        expenseDate.getFullYear() === selectedYear;

}


        /* =========================
           Show / Hide Card
        ========================= */

        card.style.display =
            shouldShow ? "" : "none";

    });


    /* Update summary after filtering */

    updateTotalSpent();
    updateExpenseCount();

}


/* =========================
   Filter Change
========================= */

expensePeriod.addEventListener("change", function () {

    filterExpenses();

});


/* =========================
   Convert Display Date
   To Input Date
========================= */

function convertDateToInput(dateText) {

    const date = new Date(dateText);


    if (isNaN(date)) {
        return "";
    }


    const year =
        date.getFullYear();


    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");


    const day =
        String(date.getDate())
            .padStart(2, "0");


    return `${year}-${month}-${day}`;

}


/* =========================
   Convert Display Time
   To Input Time
========================= */

function convertTimeToInput(timeText) {

    const match =
        timeText.match(
            /(\d{1,2}):(\d{2})\s*(AM|PM)/i
        );


    if (!match) {
        return "";
    }


    let hours =
        Number(match[1]);


    const minutes =
        match[2];


    const period =
        match[3].toUpperCase();


    if (period === "PM" && hours !== 12) {
        hours += 12;
    }


    if (period === "AM" && hours === 12) {
        hours = 0;
    }


    return `${String(hours).padStart(2, "0")}:${minutes}`;

}


/* =========================
   Fill Form For Editing
========================= */

function openEditModal(expenseCard) {

    expenseBeingEdited = expenseCard;


    const name =
        expenseCard
            .querySelector(".expense-info h3")
            .textContent;


    const amount =
        Number(
            expenseCard
                .querySelector(".expense-right strong")
                .textContent
                .replace(" EGP", "")
                .replace(/,/g, "")
        );


    const details =
        expenseCard
            .querySelector(".expense-info p")
            .textContent
            .trim();


    const parts =
        details.split(" · ");


    const category = parts[0];
    const date = parts[1];
    const time = parts[2];


    const noteElement =
        expenseCard.querySelector(".expense-note");


    const note =
        noteElement
            ? noteElement.textContent
            : "";


    /* Fill basic fields */

    document.querySelector("#expense-name").value =
        name;


    document.querySelector("#expense-amount").value =
        amount;


    document.querySelector("#expense-date-input").value =
        convertDateToInput(date);


    document.querySelector("#expense-time-input").value =
        convertTimeToInput(time);


    document.querySelector("#expense-note").value =
        note;


    /* Handle category */

    const categoryExists =
        [...categorySelect.options].some(
            option => option.value === category
        );


    if (categoryExists) {

        categorySelect.value = category;

        customCategoryInput.style.display = "none";
        customCategoryInput.required = false;
        customCategoryInput.value = "";

    } else {

        categorySelect.value = "custom";

        customCategoryInput.style.display = "block";
        customCategoryInput.required = true;

        customCategoryInput.value = category;

    }


    /* Change modal button */

    submitExpenseButton.textContent =
        "Save Changes";


    /* Open modal */

    expenseModal.classList.add("show");

}


/* =========================
   Add / Edit Expense
========================= */

expenseForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document
            .querySelector("#expense-name")
            .value
            .trim();


    const amount =
        Number(
            document
                .querySelector("#expense-amount")
                .value
        );


    const selectedCategory =
        categorySelect.value;


    const customCategory =
        customCategoryInput.value.trim();


    const category =
        selectedCategory === "custom"
            ? customCategory
            : selectedCategory;


    const date =
        document
            .querySelector("#expense-date-input")
            .value;


    const time =
        document
            .querySelector("#expense-time-input")
            .value;


    const note =
        document
            .querySelector("#expense-note")
            .value
            .trim();


    const categoryIcon =
        categoryIcons[category] || "📦";


    /* =========================
       EDIT EXISTING EXPENSE
    ========================= */

    if (expenseBeingEdited) {

        expenseBeingEdited.innerHTML = `

            <div class="expense-info">

                <span class="expense-icon">
                    ${categoryIcon}
                </span>

                <div>

                    <h3>${name}</h3>

                    <p>
                        ${category} · ${formatDate(date)} · ${formatTime(time)}
                    </p>

                    ${
                        note
                            ? `<span class="expense-note">${note}</span>`
                            : ""
                    }

                </div>

            </div>


            <div class="expense-right">

                <strong>
                    ${amount.toLocaleString()} EGP
                </strong>


                <div class="expense-actions">

                    <button title="Edit">
                        ✏️
                    </button>

                    <button title="Delete">
                        🗑️
                    </button>

                </div>

            </div>

        `;


        /*
           Keep the currently selected filter
           working after editing.
        */

        filterExpenses();


        /* Reset */

        expenseForm.reset();

        customCategoryInput.style.display = "none";
        customCategoryInput.required = false;

        expenseBeingEdited = null;


        /* Change button back */

        submitExpenseButton.textContent =
            "Add Expense";


        /* Close */

        expenseModal.classList.remove("show");


        /* Success */

        showSuccessMessage(
            "Expense updated successfully!"
        );


        return;

    }


    /* =========================
       ADD NEW EXPENSE
    ========================= */

    const expenseCard =
        document.createElement("div");


    expenseCard.classList.add("expense-card");


    expenseCard.innerHTML = `

        <div class="expense-info">

            <span class="expense-icon">
                ${categoryIcon}
            </span>

            <div>

                <h3>${name}</h3>

                <p>
                    ${category} · ${formatDate(date)} · ${formatTime(time)}
                </p>

                ${
                    note
                        ? `<span class="expense-note">${note}</span>`
                        : ""
                }

            </div>

        </div>


        <div class="expense-right">

            <strong>
                ${amount.toLocaleString()} EGP
            </strong>


            <div class="expense-actions">

                <button title="Edit">
                    ✏️
                </button>

                <button title="Delete">
                    🗑️
                </button>

            </div>

        </div>

    `;


    /* Add to top */

    expenseList.prepend(expenseCard);


    /*
       Reapply the selected filter.
       This makes sure the new expense
       appears only if it belongs
       to the selected period.
    */

    filterExpenses();


    /* Reset */

    expenseForm.reset();

    customCategoryInput.style.display = "none";
    customCategoryInput.required = false;


    /* Close */

    expenseModal.classList.remove("show");


    /* Success */

    showSuccessMessage(
        "Expense added successfully!"
    );

});


/* =========================
   Delete Confirmation Modal
========================= */

const deleteModal =
    document.querySelector("#delete-modal");

const deleteCancelButton =
    document.querySelector("#delete-cancel");

const deleteConfirmButton =
    document.querySelector("#delete-confirm");


let expenseToDelete = null;


/* =========================
   Edit + Delete Buttons
========================= */

document.addEventListener("click", function (event) {


    /* =========================
       Edit
    ========================= */

    const editButton =
        event.target.closest(
            ".expense-actions button[title='Edit']"
        );


    if (editButton) {

        const expenseCard =
            editButton.closest(".expense-card");


        openEditModal(expenseCard);

        return;

    }


    /* =========================
       Delete
    ========================= */

    const deleteButton =
        event.target.closest(
            ".expense-actions button[title='Delete']"
        );


    if (!deleteButton) {
        return;
    }


    expenseToDelete =
        deleteButton.closest(".expense-card");


    deleteModal.classList.add("show");

});


/* =========================
   Cancel Delete
========================= */

deleteCancelButton.addEventListener("click", function () {

    deleteModal.classList.remove("show");

    expenseToDelete = null;

});


/* =========================
   Confirm Delete
========================= */

deleteConfirmButton.addEventListener("click", function () {

    if (!expenseToDelete) {
        return;
    }


    /* Remove Expense */

    expenseToDelete.remove();


    /*
       Recalculate everything
       after removing the expense.
    */

    updateTotalSpent();
    updateExpenseCount();


    /* Close Modal */

    deleteModal.classList.remove("show");

    expenseToDelete = null;


    /*
       Make sure the current filter
       is still applied.
    */

    filterExpenses();

});


/* =========================
   Initial Calculation
========================= */

/*
   Calculate values when the page loads.
   This makes the existing HTML expenses
   appear in Total Spent and Number of Expenses.
*/

filterExpenses();