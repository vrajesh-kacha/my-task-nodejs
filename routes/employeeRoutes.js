import express from "express";
import {
  addEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../controller/employeeController.js";
import { verifytoken } from "../middelware/verifytoken.js";

const router = express.Router();

router.post("/add-employee", verifytoken, addEmployee);
router.delete("/delete-employee/:id", verifytoken, deleteEmployee);
router.put("/update-employee/:id", verifytoken, updateEmployee);
router.get("/get-employees",verifytoken,getEmployees);


export default router;
