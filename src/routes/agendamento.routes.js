import { Router } from "express";

import AgendamentoController from "../controllers/AgendamentoController";

const agendamentosRouters = Router();

agendamentosRouters.post(
  "/agendamento/user/:id",
  AgendamentoController.createAgendamento
);
agendamentosRouters.get(
  "/agendamentos",
  AgendamentoController.FindAllAgendamentos
);
agendamentosRouters.put(
  "/agendamento/:id",
  AgendamentoController.UpdateAgendamento
);
agendamentosRouters.delete(
  "/agendamento/:id",
  AgendamentoController.deleteAgendamento
);

export { agendamentosRouters };
