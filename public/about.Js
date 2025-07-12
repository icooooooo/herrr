const timeline = document.getElementById("timeline");
const form = document.getElementById("memory-form");
const input = document.getElementById("memory-input");

let memories = JSON.parse(localStorage.getItem("memories")) || [
  "You always know how to make me smile even on the hardest days.",
];

function renderMemories() {
  timeline.innerHTML = "";
  memories.forEach((memory) => {
    const div = document.createElement("div");
    div.classList.add("timeline-item");
    div.textContent = memory;
    timeline.appendChild(div);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newMemory = input.value.trim();
  if (newMemory !== "") {
    memories.unshift(newMemory);
    localStorage.setItem("memories", JSON.stringify(memories));
    input.value = "";
    renderMemories();
  }
});

renderMemories();