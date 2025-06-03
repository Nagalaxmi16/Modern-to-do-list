const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const prioritySelect = document.getElementById("priority");

window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.priority, task.completed));
};

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task").forEach(taskEl => {
    tasks.push({
      text: taskEl.querySelector("span").textContent,
      completed: taskEl.classList.contains("completed"),
      priority: taskEl.dataset.priority
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(text, priority = "Medium", completed = false) {
  const li = document.createElement("li");
  li.className = "task";
  li.setAttribute("data-priority", priority);
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = text;
  span.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  const delBtn = document.createElement("button");
  delBtn.innerHTML = "×";
  delBtn.classList.add("delete-btn");
  delBtn.onclick = () => {
    taskList.removeChild(li);
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  saveTasks();
}

addBtn.onclick = () => {
  const task = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (task !== "") {
    addTask(task, priority);
    taskInput.value = "";
  }
};
