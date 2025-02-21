import Customer from "../models/customerModel.js";

export const addCustomer = async (req, res) => {
  try {
   await Customer.create(req.body);

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

export const getCustomer = async(req, res) =>{    
    try {
        const customer = await Customer.findAll({
          where:{
              "status": "active"
          },
          attributes: ["id",["customername","name"]]
          })
      return  res.status(200).send(customer);
    } 
    catch (error) {
      return  res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};


export const updateCustomer =async(req,res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).send({ success: false, message: "Customer not found" });
    }
    await customer.update(req.body);
    return res.status(200).send({ success: true, message: "Customer updated successfully" });

  } catch (error) {
    return res.status(500).send({ success: false, message:error.message });
  }
}


export const deleteCustomer = async(req,res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).send({ success: false, message: "Customer not found" });
    }
    await customer.update({ status: "inactive" });

    return res.status(200).send({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message:error.message});
    }
    }