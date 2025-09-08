let scoreA = 0;
let scoreB = 0;
let startY = null; // para detectar el gesto de deslizar

function update() {
  document.getElementById("scoreA").textContent = scoreA;
  document.getElementById("scoreB").textContent = scoreB;
  localStorage.setItem("marcador", JSON.stringify({ scoreA, scoreB }));
}

function reset() {
  scoreA = 0;
  scoreB = 0;
  update();
}

// === Eventos para cada rectángulo ===
function addListeners(teamId) {
  const el = document.getElementById(teamId);

  // Click/tap → sumar
  el.addEventListener("click", () => {
    if (teamId === "teamA") scoreA++;
    else scoreB++;
    update();
  });

  // Touch start → guardar Y inicial
  el.addEventListener("touchstart", e => {
    startY = e.touches[0].clientY;
  });

  // Touch end → comprobar si hubo swipe hacia abajo
  el.addEventListener("touchend", e => {
    if (startY !== null) {
      const endY = e.changedTouches[0].clientY;
      if (endY - startY > 50) { // deslizó hacia abajo
        if (teamId === "teamA" && scoreA > 0) scoreA--;
        else if (teamId === "teamB" && scoreB > 0) scoreB--;
        update();
      }
    }
    startY = null;
  });
}

window.onload = () => {
  // recuperar estado guardado
  const saved = JSON.parse(localStorage.getItem("marcador"));
  if (saved) {
    scoreA = saved.scoreA;
    scoreB = saved.scoreB;
  }
  update();

  // activar interacción en cada equipo
  addListeners("teamA");
  addListeners("teamB");

  // registrar service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
};

