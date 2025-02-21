import express from "express"
import { addDoctor, deleteDoctor, getDoctor, updateDoctor } from "../controller/doctorController.js";
import { emailController, getEmail, getMessages, getWhatsapp, smsController, updateEmail, updateMessage, updateWhatsapp, whatsappController } from "../controller/notificationController.js";

const router = express.Router()

// router.get("/get-doctor",getDoctor);
// router.post("/add-doctor",addDoctor); 
// router.put("/update-doctor/:id",updateDoctor);
// router.delete("/delete-doctor/:id",deleteDoctor);
router.post("/send-sms",smsController);
router.post("/send-email",emailController);
router.post("/send-whatsapp",whatsappController);
router.get("/get-messages",getMessages);
router.get("/get-email",getEmail);
router.get("/get-whatsapp",getWhatsapp);
router.put("/update-messages",updateMessage);
router.put("/update-email",updateEmail);
router.put("/update-whatsapp",updateWhatsapp);
export default router;
