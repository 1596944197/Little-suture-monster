import { Worker } from "node:worker_threads";

export async function WorkerAsync() {
  const worker = new Worker("./main/module/workServer/server.mjs", {
    workerData: "0xff",
  });
  worker.on("message", (...args) => {
    console.log("main accept", args);
  });
  worker.postMessage("send to child");
}
