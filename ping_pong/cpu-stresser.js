import { workerData, parentPort } from "worker_threads";

const end = Date.now() + workerData.ms;
while (Date.now() < end) {
  Math.sqrt(Math.random());
}
parentPort.postMessage("done");