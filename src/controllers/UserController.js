import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  // ----- [CRIAR] USUÁRIO ----- //

  async createUser(req, res) {
    try {
      const { name, email, age } = req.body;

      let user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        return res.json({ error: "Já existe um usuário com esse email." });
      }

      user = await prisma.user.create({
        data: {
          name,
          email,
          age,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },

  // ----- [LISTAR] TODOS OS USUÁRIOS ----- //

  async findAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      return res.json({ error });
    }
  },

  // ----- [LISTAR] USUÁRIO ----- //

  async findUser(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.json({ error: "Usuário não existe!" });
    } catch (error) {
      return res.json({ error });
    }
  },

  // ----- [ALTERAR] USUÁRIO ----- //

  async updateUser(req, res) {
    try {
      const { id } = req.params;

      const { name, email, age } = req.body;

      let user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.json({ error: "Usuário não existe!" });

      user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email, age },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },

  // ----- [DELETAR] USUÁRIO ----- //

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.json({ error: "Usuário não existe!" });

      await prisma.user.delete({ where: { id: Number(id) } });

      return res.json({ message: "Usuario deletado" });
    } catch (error) {
      return res.json({ error });
    }
  },
};
