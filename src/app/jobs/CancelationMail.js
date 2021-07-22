import Mail from "../../lib/Mail";
import {format, parseISO } from "date-fns";
import ptbr from "date-fns/locale/pt-BR";

class CancelationMail {
    get key() {
        return 'CancelationMail';
    }

    async handle({ data }) {
        const { agendamento } = data;

        console.log("fila funcionando");

        await Mail.sendMail({
            to: `${agendamento.recurso.name} <${agendamento.recurso.email}>`,
            subject: 'Agendamento Cancelado',
            template: 'cancelamento',
            context: {
                recurso: agendamento.recurso.name,
                user: agendamento.user.name,
                date: format(parseISO(agendamento.date), "dd 'de' MMMM', às' H:mm'h'",
                    { locale: ptbr}),
            },
        })
    }

}

export default new CancelationMail();