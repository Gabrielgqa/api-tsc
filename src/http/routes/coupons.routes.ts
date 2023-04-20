import { Router } from 'express';
import CouponController from '../../controllers/coupon.controller';

const couponsRouter = Router();
const couponController = new CouponController();

couponsRouter.post('/', couponController.create);
couponsRouter.get('/', couponController.findAll);
couponsRouter.get('/:id', couponController.find);
couponsRouter.put('/:id', couponController.update);
couponsRouter.delete('/:id', couponController.delete);

export default couponsRouter;