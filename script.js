document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const deadlineInput = document.getElementById("deadline-input");
    const taskList = document.getElementById("task-list");

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "task";
            li.innerHTML = `${task.name} (締切: ${task.deadline}) 
                <button onclick="deleteTask(${index})">削除</button>`;
            taskList.appendChild(li);
        });
    };

    const saveTask = (name, deadline) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ name, deadline });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        saveTask(taskInput.value, deadlineInput.value);
        taskInput.value = "";
        deadlineInput.value = "";
    });

    window.deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    loadTasks();
});