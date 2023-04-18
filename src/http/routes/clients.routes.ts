import { Router } from 'express';
import ClientController from '../../controllers/client.controller';

const clientsRouter = Router();
const clientController = new ClientController();

clientsRouter.post('/', clientController.create);
clientsRouter.get('/', clientController.findAll);
clientsRouter.get('/:id', clientController.find);
clientsRouter.put('/:id', clientController.update);
clientsRouter.delete('/:id', clientController.delete);

export default clientsRouter;