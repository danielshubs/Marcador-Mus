let scoreA = 0;
let scoreB = 0;

function update() {
    document.getElementById("scoreA").textContent = scoreA;
    document.getElementById("scoreB").textContent = scoreB;
    localStorage.setItem("marcador", JSON.stringify({ scoreA, scoreB }));
}

function sumar(team) {
    if (team === "A") scoreA++;
    else scoreB++;
    update();
}

function restar(team) {
    if (team === "A" && scoreA > 0) scoreA--;
    else if (team === "B" && scoreB > 0) scoreB--;
    update();
}

function reset() {
    scoreA = 0;
    scoreB = 0;
    update();
}

window.onload = () => {
    const saved = JSON.parse(localStorage.getItem("marcador"));
    if (saved) {
        scoreA = saved.scoreA;
        scoreB = saved.scoreB;
    }
    update();

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js");
    }
};
