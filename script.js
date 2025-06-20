const addBtn = document.getElementById("addBtn");
const input = document.getElementById("txtMessage");
const timeInput = document.getElementById("taskTime");
const taskList = document.getElementById("taskList");
const toggleModeBtn = document.getElementById("toggleMode");
const copyBtn = document.getElementById("copyBtn");
const quote = document.getElementById("quote");

const quotes = [
  "Believe in yourself!",
  "Dream it. Do it.",
  "Stay positive, work hard, make it happen.",
  "Be the change.",
  "Your only limit is your mind."
];

addBtn.onclick = addElement;

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addElement() {
  const text = input.value.trim();
  const time = timeInput.value;
  if (!text) return;

  const tasks = getTasks();
  tasks.push({ text, time, completed: false });
  saveTasks(tasks);
  input.value = "";
  timeInput.value = "";
  renderTasks();
  showQuote();
}

function renderTasks() {
  const tasks = getTasks();
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.classList.toggle("completed", task.completed);

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.time) {
      const timeBadge = document.createElement("small");
      timeBadge.textContent = ` ⏰ ${task.time}`;
      timeBadge.style.marginLeft = "10px";
      span.appendChild(timeBadge);
    }

    const btnGroup = document.createElement("div");

    const doneBtn = document.createElement("button");
    doneBtn.className = "btn btn-sm btn-success me-2";
    doneBtn.textContent = "✔";
    doneBtn.onclick = () => {
      task.completed = !task.completed;
      saveTasks(tasks);
      renderTasks();
    };

    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-sm btn-danger";
    delBtn.textContent = "🗑";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTasks();
    };

    btnGroup.append(doneBtn, delBtn);
    li.append(span, btnGroup);
    taskList.appendChild(li);
  });
}

function showQuote() {
  quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

toggleModeBtn.onclick = () => {
  document.body.classList.toggle("dark-mode");
};

copyBtn.onclick = () => {
  const tasks = getTasks().map(t => `• ${t.text}${t.time ? ' @ ' + t.time : ''}`).join("\n");
  navigator.clipboard.writeText(tasks).then(() => {
    alert("List copied!");
  });
};

// Rain background animation
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');
let raindrops = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createRaindrops() {
  for (let i = 0; i < 200; i++) {
    raindrops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: 10 + Math.random() * 20,
      speed: 2 + Math.random() * 3,
    });
  }
}
function drawRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(174,194,224,0.5)';
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';

  for (let drop of raindrops) {
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x, drop.y + drop.length);
    ctx.stroke();

    drop.y += drop.speed;
    if (drop.y > canvas.height) {
      drop.y = -drop.length;
      drop.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(drawRain);
}
createRaindrops();
drawRain();

// Try to autoplay and unmute song
window.addEventListener("load", () => {
  const audio = document.getElementById("audioPlayer");
  audio.muted = false;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.warn("Autoplay failed:", error);
    });
  }
});

renderTasks();
showQuote();
