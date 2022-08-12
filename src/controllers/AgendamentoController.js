import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  // ----- [CRIAR] AGENDAMENTO ----- //

  async createAgendamento(req, res) {
    const { date, descricao } = req.body;
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.json({ message: "Usuário inexistente!" });
      }

      const agendamento = await prisma.agendamento.create({
        data: {
          date,
          descricao,
          userId: user.id,
        },
        include: {
          cliente: true,
        },
      });
      return res.json(agendamento);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  // ----- [LISTAR] TODOS OS AGENDAMENTO ----- //

  async FindAllAgendamentos(req, res) {
    try {
      const agendamentos = await prisma.agendamento.findMany();

      return res.json(agendamentos);
    } catch (error) {
      return res.json(error);
    }
  },

  // ----- [ALTERAR] AGENDAMENTO ----- //

  async UpdateAgendamento(req, res) {
    const { id } = req.params;
    const { date, descricao } = req.body;

    try {
      const agendamento = await prisma.agendamento.findUnique({
        where: { id: Number(id) },
      });

      if (!agendamento) {
        return res.json({ message: "Agendamento inexistente!" });
      }

      await prisma.agendamento.update({
        where: { id: Number(id) },
        data: { date, descricao },
      });

      return res.json({ message: "Agendamento atualizado!" });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  // ----- [DELETAR] AGENDAMENTO ----- //

  async deleteAgendamento(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.json({ error: "Agendamento não existe!" });

      await prisma.user.delete({ where: { id: Number(id) } });

      return res.json({ message: "Agendamento deletado!" });
    } catch (error) {
      return res.json({ error });
    }
  },
};
