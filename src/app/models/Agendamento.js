import Sequelize, { Model } from 'sequelize';
import {isBefore, subHours} from "date-fns";


class Agendamento extends Model {
    static init(sequelize) {
        super.init({
                date: Sequelize.DATE,
                canceledAt: Sequelize.DATE,
                past: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return isBefore(this.date, new Date());
                    }
                },
            cancelable: {
                    type: Sequelize.VIRTUAL,
                get() {
                        //verifica se o horario é passível de cancelamento em relação a antecedencia mínima
                        return isBefore(new Date(), subHours(this.date, 2))
                }
            },

            }, {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user'})
        this.belongsTo(models.User, { foreignKey: 'recursoId', as: 'recurso'})
    }
}

export default Agendamento;