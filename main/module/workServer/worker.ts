import { Worker } from "node:worker_threads";

export async function WorkerAsync() {
  const worker = new Worker("./main/workServer/server.mjs", {
    workerData: "0xff",
  });
  worker.on("message", (...args) => {
    console.log("主线程接收", args);
  });
  worker.postMessage("给子线程");
}
