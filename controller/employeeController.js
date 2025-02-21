import Employee from "../models/employeeModel.js";
export const addEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    return res
      .status(200)
      .send({
        success: true,
        message: "Employee created successfully",
        employee,
      });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.destroy({ where: { id: req.params.id } });
    if(!employee){
      return res.status(404).send({ success: false, message: "Employee not found please provide valid employee id"});
     }
    return res
      .status(200)
      .send({
        success: true,
        message: "Employee deleted successfully",
        employee,
      });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.update(req.body, {
      where: { id: req.params.id },
    });
     if(!employee){
      return res.status(404).send({ success: false, message: "Employee not found please provide valid employee id"});
     }
    return res
      .status(200)
      .send({
        success: true,
        message: "Employee updated successfully",
        employee,
      });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employee = await Employee.findAll({
      // offset: parseInt(req.query.page - 1) * parseInt(req.query.limit),
      // limit: parseInt(req.query.limit),
    });

    return res
      .status(200)
      .send({
        success: true,
        message: "Employee retrived successfully",
        employee,
      });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};




