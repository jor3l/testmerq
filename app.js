import express from "express";
import helmet from "helmet";
import logs from "./api/logs.js";
import transaction from "./api/transaction.js";
import bodyParser from "body-parser";
import state from "./api/state.js";
import set from "./api/set.js";
import timemachine from "./api/timemachine.js";

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/api/logs").all(logs);
app.route("/api/state").all(state);
app.route("/api/transaction").post(transaction);
app.route("/api/set").post(set);
app.route("/api/timemachine").all(timemachine);

export default app;
