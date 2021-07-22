import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import FileController from "./app/controllers/FileController";
import RecursoController from "./app/controllers/RecursoController";
import authMiddleware from "./app/middlewares/auth";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import AgendamentoController from "./app/controllers/AgendamentoController";
import AgendaController from "./app/controllers/AgendaController";
import NotificationController from "./app/controllers/NotificationController";
import DisponibilidadeController from "./app/controllers/DisponibilidadeController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// a partir daqui, apenas usuarios autenticados tem acesso a essas rotas.
routes.use(authMiddleware);

routes.put('/users', UserController.update);

//rotas de acesso aos recursos
routes.get('/recursos', RecursoController.index);
routes.get('/recursos/:recursoId/disponibilidade', DisponibilidadeController.index);

//rotas de acesso aos agendamentos
routes.get('/agendamentos', AgendamentoController.index);
routes.post('/agendamentos', AgendamentoController.store);
routes.delete('/agendamentos/:id', AgendamentoController.delete);

//rotas de acesso à agenda
routes.get('/agenda', AgendaController.index);

//rotas de acesso às notificações
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

//rotas de acesso aos arquivos enviados pelo usuario
routes.post('/files', upload.single('file'), FileController.store);

export default routes;