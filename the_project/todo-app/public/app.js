const list = document.getElementById("todo-list");

function newCard(todoText) {
	const card = document.createElement("div");
    card.classList.add("card", "mb-2");

    const body = document.createElement("div");
    body.classList.add("card-body");

    body.textContent = todoText;

    card.appendChild(body);
    list.prepend(card);
}

async function loadTodos() {
	const res = await fetch("/todos");
	const todos = await res.json();

	list.innerHTML = "";

	for (const todo of todos) {
		newCard(todo.text);
	}
}

async function postTodo() {
	const input = document.getElementById("todo-input");
 	const text = input.value;

	const response = await fetch("/todos", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			text,
		}),
	});
	const todo = await response.json();

	console.log(todo);

	newCard(todo.text);
}

loadTodos();

const form = document.getElementById("todo-form");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	await postTodo();
});