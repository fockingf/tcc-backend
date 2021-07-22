import { startOfDay, endOfDay, setHours, setMinutes, setSeconds, format, isAfter } from "date-fns";
import Agendamento from "../models/Agendamento";
import { Op } from "sequelize";


class DisponibilidadeController {
    async index(request, response) {
        const { date } = request.query;

        if (!date) {
            return response.status(400).json({error: "Data inválida"});
        }

        const searchDate = Number(date);

        const agendamentos = await Agendamento.findAll({
            where: {
                recursoId: request.params.recursoId,
                canceledAt: null,
                date: {
                    [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
                }
            }
        })

        const agenda = [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00'
        ]

        const disponivel = agenda.map(time => {
            const [hour, minute] = time.split(':');
            const value = setSeconds(setMinutes(setHours(searchDate, hour), minute), 0);

            return {
                time,
                // formata a data para UTC com timezone ex: 2020-06-01T10:00:00-03:00
                value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                disponivel:  isAfter(value, new Date()) && !agendamentos.find(a =>
                    format(a.date, 'HH:mm') === time)
            }
        })

        return response.json(disponivel);
    }

}

export default new DisponibilidadeController();