const list = document.getElementById("todo-list");

function newCard(todo) {
	const card = document.createElement("div");
	card.classList.add("card", "mb-2");
 
	const body = document.createElement("div");
	body.classList.add("card-body", "d-flex", "justify-content-between", "align-items-center");
 
	const text = document.createElement("span");
	text.textContent = todo.title;
 
	const action = document.createElement("div");
 
	if (todo.is_done) {
		action.textContent = "Done";
	} else {
		const doneBtn = document.createElement("button");
		doneBtn.classList.add("btn", "btn-primary", "btn-sm");
		doneBtn.textContent = "Mark as Done";
		doneBtn.onclick = () => markDone(todo.id, action);
		action.appendChild(doneBtn);
	}
 
	body.appendChild(text);
	body.appendChild(action);
	card.appendChild(body);
	list.prepend(card);
}
 
async function markDone(id, actionContainer) {
	const response = await fetch(`/todos/${id}`, { method: "PUT" });
	await response.json();
 
	actionContainer.textContent = "Done";
}

async function loadTodos() {
	const res = await fetch("/todos");
	const todos = await res.json();

	list.innerHTML = "";

	for (const todo of todos) {
		newCard(todo);
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

	newCard(todo);
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