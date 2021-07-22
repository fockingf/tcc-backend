import Notification from "../schemas/Notification";
import User from "../models/User";

class NotificationController {
    async index(request, response) {
        // checa se o cadastro é um recurso
        const isRecurso = await User.findOne({
            where: { id: request.userId, recurso: true },
        })
        if (!isRecurso) {
            return response.status(401).json({ error: "Apenas recursos podem carregar as notificações"})
        }

        const notifications = await Notification.find({
            user: request.userId,
        })
            .sort({createdAt: 'desc'})
            .limit(20);

        return response.json(notifications);
    }

    async update(request, response) {
        const notification = await Notification.findByIdAndUpdate(
            request.params.id,
            { read: true },
            { new: true });

        return response.json(notification);
    }

}

export default new NotificationController();