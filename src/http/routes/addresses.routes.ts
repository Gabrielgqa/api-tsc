import { Router } from 'express';
import AddressController from '../../controllers/address.controller';

const addressesRouter = Router();
const addressController = new AddressController();

addressesRouter.post('/', addressController.create);
addressesRouter.get('/', addressController.findAll);
addressesRouter.get('/:id', addressController.find);
addressesRouter.put('/:id', addressController.update);
addressesRouter.delete('/:id', addressController.delete);

export default addressesRouter;