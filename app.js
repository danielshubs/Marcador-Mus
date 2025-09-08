let scoreA = 0;
let scoreB = 0;
let startY = null;
let nameA = "Equipo A";
let nameB = "Equipo B";

function update() {
  document.getElementById("scoreA").textContent = scoreA;
  document.getElementById("scoreB").textContent = scoreB;
  document.getElementById("nameA").textContent = nameA;
  document.getElementById("nameB").textContent = nameB;

  localStorage.setItem("marcador", JSON.stringify({
    scoreA, scoreB, nameA, nameB
  }));
}

function reset() {
  scoreA = 0;
  scoreB = 0;
  update();
}

function addListeners(teamId) {
  const el = document.getElementById(teamId);

  el.addEventListener("click", () => {
    if (teamId === "teamA") scoreA++;
    else scoreB++;
    update();
  });

  el.addEventListener("touchstart", e => {
    startY = e.touches[0].clientY;
  });

  el.addEventListener("touchend", e => {
    if (startY !== null) {
      const endY = e.changedTouches[0].clientY;
      if (endY - startY > 50) {
        if (teamId === "teamA" && scoreA > 0) scoreA--;
        else if (teamId === "teamB" && scoreB > 0) scoreB--;
        update();
      }
    }
    startY = null;
  });
}

window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("marcador"));
  if (saved) {
    scoreA = saved.scoreA;
    scoreB = saved.scoreB;
    nameA = saved.nameA || nameA;
    nameB = saved.nameB || nameB;
  }
  update();

  addListeners("teamA");
  addListeners("teamB");

  // Guardar cambios de nombre en tiempo real
  document.getElementById("nameA").addEventListener("input", e => {
    nameA = e.target.textContent.trim() || "Equipo A";
    update();
  });

  document.getElementById("nameB").addEventListener("input", e => {
    nameB = e.target.textContent.trim() || "Equipo B";
    update();
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
};
