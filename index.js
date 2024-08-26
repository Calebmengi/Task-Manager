const addTask = document.querySelector("#add-task");
const input = document.querySelector("#task-input");
const tasks = document.querySelector("#task-list");

const taskArr = [];

const displayTasks = () => {
  if (input.value === "") {
    return;
  }

  const taskObj = {
    input: input.value
  };
  taskArr.unshift(taskObj);

  let content = "";

  taskArr.forEach((task, index) => {
    content += `
    <div class="task-box">
      <div class="task">
        <p class="task-txt">${task.input}</p>

        <div class="icon-container">
         <i class="fa-solid fa-circle-xmark red delete-task" data-index="${index}"></i>
        </div>
      </div>
    </div>`;
  });

  tasks.innerHTML = content;
  input.value = "";

  // Attach event listeners for delete buttons after the tasks are rendered
  attachDeleteTaskListeners();
};

addTask.addEventListener("click", displayTasks);

const attachDeleteTaskListeners = () => {
  const deleteButtons = document.querySelectorAll(".delete-task");

  deleteButtons.forEach(button => {
      button.addEventListener("click", (event) => {
          const index = event.target.getAttribute("data-index");

          // Convert index to a number and remove the task from the array
          const taskIndex = parseInt(index, 10);
          if (taskIndex > -1) {
              taskArr.splice(taskIndex, 1);
          }

          // Update the task list display without calling displayTasks()
          event.target.closest('.task-box').remove(); // Remove the task box directly from the DOM
          console.log("Task deleted at index: " + taskIndex);
      });
  });
};





