const timestamp = new Date().toISOString();

const uuid = crypto.randomUUID();

setInterval(() => {
    console.log(`${timestamp}: ${uuid}`);
}, 5000);
