document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Default tasks
  const defaultTasks = [
    "Eat",
    "Code Code Code Code Code Code Code Code Code ",
    "Learn",
  ];
  defaultTasks.forEach((task) => createTaskItem(task));

  // Add button click
  addBtn.addEventListener("click", () => {
    addTaskByEnterOrAddBtn();
  });

  // Add by pressing Enter
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTaskByEnterOrAddBtn();
    }
  });

  function addTaskByEnterOrAddBtn() {
    const taskText = taskInput.value.trim();
    if (taskText) {
      createTaskItem(taskText);
      taskInput.value = "";
      taskInput.focus();
    } else {
      alert("Please enter a task!");
    }
  }

  // Create & append task item
  function createTaskItem(text) {
    const li = document.createElement("li");
    li.className = "task-item";

    const p = document.createElement("p");
    p.className = "task-text";
    p.textContent = text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.title = "Edit this TASK";
    editBtn.addEventListener("click", () => {
      editBtn.textContent = "✅";
      const textArea = document.createElement("textarea");
      textArea.type = "text";
      textArea.value = p.textContent;
      textArea.className = "edit-input";
      textArea.addEventListener("blur", finishEdit);
      textArea.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          finishEdit();
        }
      });
      editBtn.addEventListener("click", () => {
        finishEdit();
      });

      function finishEdit() {
        const newText = textArea.value.trim();
        if (newText) {
          p.textContent = newText;
        }
        p.style.display = "";
        textArea.remove();
      }

      p.style.display = "none";
      p.parentNode.insertBefore(textArea, p);
      textArea.focus();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.title = "Delete this TODO";
    deleteBtn.addEventListener("click", () => li.remove());

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(p);
    li.appendChild(actions);
    taskList.appendChild(li);
  }
});
