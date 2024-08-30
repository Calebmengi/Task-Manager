const addTask = document.querySelector("#add-task");
const input = document.querySelector("#task-input");
const tasks = document.querySelector("#task-list");
const changeBg = document.querySelector("#change-bg");

const taskArr = [];

// Background colors array
const colorsArr = [
    { bg: "linear-gradient(rgb(176, 112, 112), #151DB7)", buttonColor: "#B07070" }, 
    { bg: "linear-gradient(#FF6666, #6600FF)", buttonColor: "#FF6666" }, 
    { bg: "linear-gradient(black, #151DB7)", buttonColor: "#151DB7" },
    { bg: "linear-gradient(#006600, #66FF33)", buttonColor: "#006600" }
];

// To track which backgrounds have been used
let usedColors = [];

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

  localStorage.setItem("tasks", taskArr);
  console.log(localStorage.getItem("data"));  // Attach event listeners for delete buttons after the tasks are rendered
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

const backgroundChanger = () => {

  if (colorsArr.length === 0) {
    colorsArr.push(...usedColors);
    usedColors = [];
  }

  const randomIndex = Math.floor(Math.random() * colorsArr.length); 
  const selectedColor = colorsArr.splice(randomIndex, 1)[0]; 

  usedColors.push(selectedColor);

  document.body.style.backgroundImage = selectedColor.bg;
  addTask.style.backgroundColor = selectedColor.buttonColor;
  console.log("Background applied:", selectedColor.bg);
}

changeBg.addEventListener("click", backgroundChanger);
