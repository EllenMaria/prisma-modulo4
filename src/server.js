import express from "express";

import { usersRouters } from "./routes/user.routes.js";
import { agendamentosRouters } from "./routes/agendamento.routes.js";

const app = express();

app.use(express.json());

app.use(usersRouters, agendamentosRouters);

app.listen(3030, () => console.log("Server listening on port 3030"));
