const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.className = "complete-btn";
    completeBtn.dataset.index = index;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.className = "delete-btn";
    deleteBtn.dataset.index = index;

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

// Add task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  renderTasks();
}

// Button click
addBtn.addEventListener("click", addTask);

// Enter key
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Event delegation for complete & delete
taskList.addEventListener("click", (e) => {
  const index = e.target.dataset.index;

  if (e.target.classList.contains("complete-btn")) {
    tasks[index].completed = !tasks[index].completed;
  }

  if (e.target.classList.contains("delete-btn")) {
    tasks.splice(index, 1);
  }

  renderTasks();
});