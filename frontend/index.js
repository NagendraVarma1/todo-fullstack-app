function addTodo(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const desc = document.getElementById("desc").value;
  const status = false;

  const todoDetails = {
    name,
    desc,
    status,
  };
  axios
    .post("http://localhost:3000/todo/add-todo", todoDetails)
    .then((res) => {
      showTodo(res.data.newTodoDetails);
    })
    .catch((err) => {
      console.log(err);
    });

  document.getElementById("name").value = "";
  document.getElementById("desc").value = "";
}

function showTodo(todo) {
  let todoId = todo.id;
  if (todo.status === false) {
    let ul = document.getElementById("uncompletedTodos");

    let li = document.createElement("li");

    let doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";

    doneBtn.onclick = () => {
      let updatedTodo = {
        name: todo.name,
        description: todo.description,
        status: true,
      };
      axios
        .put(`http://localhost:3000/todo/update-todo/${todoId}`, updatedTodo)
        .then(() => {
          showTodo(updatedTodo);
          ul.removeChild(li);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = () => {
      axios
        .delete(`http://localhost:3000/todo/delete-todo/${todoId}`)
        .then(() => {
          ul.removeChild(li);
        });
    };

    li.textContent = `Name: ${todo.name}, Description: ${todo.description}`;

    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    ul.append(li);
  } else {
    let ul = document.getElementById("completedTodos");
    let li = document.createElement("li");

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = () => {
      axios
        .delete(`http://localhost:3000/todo/delete-todo/${todoId}`)
        .then(() => {
          ul.removeChild(li);
        });
    };

    li.textContent = `Name: ${todo.name}, Description: ${todo.description}`;

    li.appendChild(deleteBtn);
    ul.append(li);
  }
}

function allTodos() {
  axios
    .get("http://localhost:3000/todo/get-todo")
    .then((res) => {
      for (let i = 0; i < res.data.allTodoDetails.length; i++) {
        showTodo(res.data.allTodoDetails[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

allTodos();
