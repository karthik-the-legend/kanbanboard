const droppables = document.querySelectorAll(".swim-lane");

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};

// Add new swim lane functionality
const addLaneBtn = document.getElementById("add-lane");
addLaneBtn.addEventListener("click", () => {
  const newLane = document.createElement("div");
  newLane.classList.add("swim-lane");
  newLane.id = `lane-${Date.now()}`;
  newLane.innerHTML = `<h3>New Lane</h3>`;
  document.getElementById("kanban-board").appendChild(newLane);

  newLane.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(newLane, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      newLane.appendChild(curTask);
    } else {
      newLane.insertBefore(curTask, bottomTask);
    }
    saveTasks();
  });
});
