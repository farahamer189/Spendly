/* =========================
   Spendly Theme
========================= */

const themeLamp = document.querySelector(".theme-lamp");
const lampCord = document.querySelector("#lamp-cord");


/* =========================
   Load Saved Theme
========================= */

const savedTheme =
    localStorage.getItem("spendlyTheme");

if (savedTheme === "night") {
    document.body.classList.add("night-mode");
}


/* =========================
   Pull Cord
========================= */

if (lampCord) {

    let isPulling = false;

    lampCord.addEventListener("mousedown", function () {

        isPulling = true;

        themeLamp.classList.add("pulling");
    });


    document.addEventListener("mouseup", function () {

        if (!isPulling) return;

        isPulling = false;

        themeLamp.classList.remove("pulling");

        toggleTheme();
    });
}


/* =========================
   Toggle Theme
========================= */

function toggleTheme() {

    const isNight =
        document.body.classList.toggle("night-mode");

    localStorage.setItem(
        "spendlyTheme",
        isNight ? "night" : "light"
    );
}