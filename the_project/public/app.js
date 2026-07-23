async function loadTodos() {
  const res = await fetch("/todos");
  const todos = await res.json();

  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  for (const todo of todos) {
    const card = document.createElement("div");
    card.classList.add("card", "mb-2");

    const body = document.createElement("div");
    body.classList.add("card-body");

    body.textContent = todo.text;

    card.appendChild(body);
    list.appendChild(card);
  }
}

loadTodos();