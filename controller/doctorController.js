import Doctor from "../models/doctorModel.js";

export const addDoctor = async (req, res) => {
  try {
   await Doctor.create(req.body);

    return res
      .status(201)
      .send({
        success: true,
        message: "Data added successfully",
      });
  }
   catch (error) {
    console.log(error)
   return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getDoctor = async(req, res) =>{    
    try {
        const doctor = await Doctor.findAll({
          where:{
              "status": "active"
          },
          attributes:["id",["doctorname", "name"]],
          });
      return  res.status(200).send(doctor);
    }
    catch (error) {
      return  res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};


export const updateDoctor = async(req,res)=>{
    try {

      if(!req.params.id){
        return res.status(400).send({
          success: false,
          message: "Id is required",
        });
      }
    const doctor = await Doctor.findByPk(req.params.id);
 if(doctor){
   await doctor.update(req.body);
   return res.status(200).send({
        success: true,
        message: "Doctor updated successfully"
      });
 }
return res.status(404).send({
        success: false,
        message: "Doctor not found",
      }
    );

    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });


    } 

}


export const deleteDoctor = async(req,res)=>{
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if(doctor){
          await doctor.update({status:"inactive"});
          return res.status(200).send({
            success: true,
            message: "Doctor deleted successfully",
          });
        }
        return res.status(404).send({
            success: false,
            message: "Doctor not found",
          });
          
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
}