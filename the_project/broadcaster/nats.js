import { connect } from "nats";

let nc = null;

export async function initNats(servers) {
  nc = await connect({ servers });
  return nc;
}

export function getNats() {
  if (!nc) throw new Error("NATS not initialized");
  return nc;
}

export async function closeNats() {
  await nc?.drain();
}