import { connect, type NatsConnection } from "nats";

let nc: NatsConnection | null = null;

export async function initNats(servers: string) {
  nc = await connect({ servers });
  return nc;
}

export function getNats(): NatsConnection {
  if (!nc) throw new Error("NATS not initialized");
  return nc;
}

export async function closeNats() {
  await nc?.drain();
}