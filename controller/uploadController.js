import Upload from "../models/uploadModal.js"

export const uploadFile=async(req,res)=>{
   try {
    // const upload=await Upload.create(req.body); 
    
    
    return res.status(200).send({
      success: true,
      message: "Image uploaded successfully",
      upload
    });

} catch (error) {
  return res.status(500).send({
    success: false,
    message: error.message,
  });
}     


}