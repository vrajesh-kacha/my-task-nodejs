import Email from "../models/emailModel.js";
import SMS from "../models/smsModal.js";
import whatsapp from "../models/whatsAppModal.js";


export const smsController=async(req,res)=>{
try { 
    await SMS.create(req.body);
    return res.status(200).send({message:"SMS sent successfully"});
} 
catch (error)
{
return res.status(500).send({message:error.message});     
}
}
export const emailController=async(req,res)=>{
    try { 
    await Email.create(req.body);
   return res.status(200).send({message:"Email sent successfully"});
} catch (error) {
return res.status(500).send({message:error.message});     
}

}

export const whatsappController=async(req,res)=>{
    try {
        await whatsapp.create(req.body);
        return res.status(200).send({message:"Whatsapp message sent successfully"});
        
    } catch (error) {
        return res.status(500).send({message:error.message});     
    }
}

export const getMessages=async(req,res)=>{
    try {
        const messages=await SMS.findOne({where:{nodeid:req.query.id}});

        return res.status(200).send(messages);
        
    } catch (error) {
        return res.status(500).send({message:error.message});     
    }
}
export const getEmail=async(req,res)=>{
       try {
          const email = await Email.findOne({where:{nodeid:req.query.id}});
          return res.status(200).send(email);
       } catch (error) {
        return res.status(500).send({message:error.message});
       }
}
export const getWhatsapp=async(req,res)=>{
    try {
        const whatsApp = await whatsapp.findOne({where:{nodeid:req.query.id}});
        return res.status(200).send(whatsApp);
     } catch (error) 
     {
        return res.status(500).send({message:error.message});
    }
}

export const updateMessage=async (req,res)=>{
    try {
        const data=await SMS.findOne({where:{nodeid:req.query.id}});
        
        const message=await data.update(req.body);
        return res.status(200).send(message);
    } 
    catch (error) 
    {
       
    return res.status(500).send({"message":error.message});
    }
}

export const updateEmail= async (req,res)=>{
try {
    const email = await Email.findOne({where:{nodeid:req.query.id}});
    const data= await email.update(req.body);
    return res.status(200).send(data);
} catch (error) {
    return res.status(500).send({"error": error.message})
}
}

export const updateWhatsapp=async(req,res) =>{
    try {
        const data = await whatsapp.findOne({where:{nodeid:req.query.id}});
        const whatsApp = await data.update(req.body);
        return res.status(200).send(whatsApp);
    } catch (error) {
        console.log(error);
        return res.status(500).send({"error":error.message});
    }
}

