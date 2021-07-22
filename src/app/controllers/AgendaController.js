import {parseISO, startOfDay, endOfDay} from "date-fns";
import {Op} from "sequelize";
import User from "../models/User";
import Agendamento from "../models/Agendamento";


class AgendaController {
    async index(request, response) {
        const checkIfUserIsRecurso = await User.findOne({
            where: {
                id: request.userId, recurso: true
            },
        })

        if (!checkIfUserIsRecurso) {
            return response.status(401).json({ error: "Usuario não é um recurso"})
        }

        const { date } = request.query;
        const parsedDate = parseISO(date);

        const agendamentos = await Agendamento.findAll({
            where: {
                recursoId: request.userId,
                canceledAt: null,
                date: {
                    [Op.between]: [
                        startOfDay(parsedDate),
                        endOfDay(parsedDate)
                    ],
                }
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                }
            ],
            order: ['date'],
        })

        return response.json(agendamentos);
    }
}

export default new AgendaController();