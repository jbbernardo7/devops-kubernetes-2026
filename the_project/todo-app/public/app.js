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
		newCard(todo.title);
	}
}

async function postTodo() {
	const input = document.getElementById("todo-input");
 	const title = input.value;

	const response = await fetch("/todos", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title,
		}),
	});
	const todo = await response.json();

	console.log(todo);

	newCard(todo.title);
	input.value = "";
}

loadTodos();

const form = document.getElementById("todo-form");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	await postTodo();
});

document.getElementById("break-btn").onclick = async () => {
	try {
		const response = await fetch("/crash", { method: "POST" });
		console.log(await response.json());

		bootstrap.Toast.getOrCreateInstance(
			document.getElementById("myToast")
		).show();
	} catch (err) {
		console.error(err);
	}
};