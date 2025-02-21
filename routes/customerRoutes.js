import express from 'express';
import { addCustomer, deleteCustomer, getCustomer, updateCustomer } from '../controller/customerController.js';
// import { verifytoken } from '../middelware/verifytoken.js';

const router = express.Router();
router.post('/add-customer',addCustomer);
router.get('/get-customer',getCustomer);
router.put('/update-customer/:id',updateCustomer);
router.delete("/delete-customer/:id",deleteCustomer);
export default router;