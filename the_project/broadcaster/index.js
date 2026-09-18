import { JSONCodec } from "nats";
import { initNats, getNats } from "./nats.js";

const token = process.env.TOKEN;
const chatId = process.env.CHAT_ID;

if (!token || !chatId) {
  throw new Error("TOKEN and CHAT_ID environment variables are required");
}

async function main() {
	await initNats('nats://my-nats.nats.svc.cluster.local:4222');
	
	const nc = getNats();
	const jc = JSONCodec();
	const sub = nc.subscribe("todos.*", {queue: "broadcasters"});
	
	for await (const msg of sub) {
	  const data = jc.decode(msg.data);
	
	  switch (msg.subject) {
		case "todos.created":
		  await processCreate(data);
		  break;
	
		case "todos.updated":
		  await processUpdate(data);
		  break;
	  }
	}
}

async function sendTelegram(data) {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: data })
      }
    );

    const result = await response.json();

    if (!result.ok) {
      console.error("Telegram API error:", result.description);
    }
  } catch (err) {
    console.error("Failed to send Telegram message:", err.message);
  }
}


async function processCreate(data) {
	let text = `A new todo has just been created!\n\nTodo: ${data.title}`
	console.log("Todo created:", data);
	await sendTelegram(text);
}

async function processUpdate(data) {
	let text = `A todo has just been completed!\n\nTodo: ${data.title}`
	console.log("Todo updated:", data);
	await sendTelegram(text);
}

main().catch((err) => {
	console.error("Init failed:", err);
	process.exit(1);
})