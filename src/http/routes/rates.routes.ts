import { Router } from 'express';
import RateController from '../../controllers/rate.controller';

const ratesRouter = Router();
const rateController = new RateController();

ratesRouter.post('/', rateController.create);
ratesRouter.get('/', rateController.findAll);
ratesRouter.put('/:id', rateController.update);
ratesRouter.delete('/:id', rateController.delete);

export default ratesRouter;