import { Router,Request,Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUSerController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController"

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";

import { AddItemController } from "./controllers/order/AddItemController"
import { RemoveItemController } from "./controllers/order/RemoveItemController";

import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";


import multer from "multer";
import uploadConfig from './config/multer'
import { FinishOrderController } from "./controllers/order/FinishOrderController";





const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

router.get('/teste',(req:Request, res:Response)=>{
    //throw new Error('Erro na requisiçao');
    return res.json({ok:true});
});

//Users Routes
router.post('/users', new CreateUserController().handle)
router.post('/login', new AuthUserController().handle)
router.get('/profile',isAuthenticated, new Detai`lUserController().handle)

//Categories Routes
router.post('/category',isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

//Products Routes
router.post('/product',isAuthenticated,upload.single('banner'),new CreateProductController().handle)
router.get('/category/products',isAuthenticated,new ListByCategoryController().handle)

//Order Routes
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order',isAuthenticated, new RemoveOrderController().handle)

//Items Routes
router.post('/order/add',isAuthenticated, new AddItemController().handle)
router.delete('/order/remove',isAuthenticated, new RemoveItemController().handle)
router.put('/order/send',isAuthenticated, new SendOrderController().handle)

router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
router.put('/order/finish',isAuthenticated, new FinishOrderController().handle)

export {router}; 