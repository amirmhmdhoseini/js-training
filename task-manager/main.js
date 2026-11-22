
let tasks = [];
let idCounter = 1;

function addTask(title, priority) {
  const legalPriorities = ["low", "medium", "high"];

  // Validate title
  if (typeof title !== "string" || title.trim() === "") {
    return false;
  }

  // Validate priority
  if (!legalPriorities.includes(priority)) {
    return false;
  }

  const task = {
    title: title.trim(),
    priority: priority,
    id: idCounter,
    completed: false,
    createdAt: new Date().toLocaleString(),
  };

  tasks.push(task);
  idCounter++;

  return task;
}

function deleteTask(id) {
  const taskExists = tasks.some((task) => task.id === id);

  if (!taskExists) {
    return false;
  }

  tasks = tasks.filter((task) => task.id !== id);
  return true;
}

function toggleTask(id) {
  const task = tasks.find((task) => task.id === id);

  if (task === undefined) {
    return false;
  }

  task.completed = !task.completed;
  return true;
}

function getCompletedTasks() {
  return tasks.filter((task) => task.completed);
}

function getPendingTasks() {
  return tasks.filter((task) => !task.completed);
}

function searchTasks(query) {
  if (typeof query !== "string") {
    return [];
  }

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === "") {
    return [];
  }

  return tasks.filter((task) =>
    task.title.toLowerCase().includes(normalizedQuery)
  );
}

function getTasksByPriority(priority) {
  const legalPriorities = ["low", "medium", "high"];

  if (!legalPriorities.includes(priority)) {
    return [];
  }

  return tasks.filter((task) => task.priority === priority);
}

function getTaskStats() {
  return tasks.reduce(
    (stats, task) => {
      stats.total++;

      if (task.completed) {
        stats.completed++;
      } else {
        stats.pending++;
      }

      return stats;
    },
    {
      total: 0,
      pending: 0,
      completed: 0,
    }
  );
}




/* addTask("Learn JavaScript", "high");
addTask("Practice Array Methods", "medium");
addTask("Build a project", "low");
addTask("   ", "high"); // false

toggleTask(1);
toggleTask(1); // دوباره انجام‌نشده می‌شود

console.log(tasks);
console.log(getCompletedTasks());
console.log(getPendingTasks());
console.log(searchTasks("javascript"));
console.log(getTasksByPriority("high"));
console.log(getTaskStats()); */