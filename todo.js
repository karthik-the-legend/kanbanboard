const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");

// Load saved tasks
window.addEventListener("load", () => {
  const savedData = JSON.parse(localStorage.getItem("kanbanData")) || {};
  Object.keys(savedData).forEach((laneId) => {
    const lane = document.getElementById(laneId);
    if (lane) {
      savedData[laneId].forEach((taskText) => {
        const newTask = createTaskElement(taskText);
        lane.appendChild(newTask);
      });
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  const newTask = createTaskElement(value);
  todoLane.appendChild(newTask);

  input.value = "";
  saveTasks();
});

// Create a new task element
const createTaskElement = (text) => {
  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  newTask.innerText = text;

  // Double-click to edit task
  newTask.addEventListener("dblclick", () => {
    const newText = prompt("Edit task:", newTask.innerText);
    if (newText) {
      newTask.innerText = newText;
      saveTasks();
    }
  });

  // Add delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    newTask.remove();
    saveTasks();
  });

  newTask.appendChild(deleteBtn);

  // Dragging events
  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
    saveTasks();
  });

  return newTask;
};

// Save tasks to localStorage
const saveTasks = () => {
  const lanes = document.querySelectorAll(".swim-lane");
  const kanbanData = {};
  lanes.forEach((lane) => {
    const laneId = lane.id;
    const tasks = Array.from(lane.querySelectorAll(".task")).map(
      (task) => task.innerText.replace("X", "").trim()
    );
    kanbanData[laneId] = tasks;
  });
  localStorage.setItem("kanbanData", JSON.stringify(kanbanData));
};
