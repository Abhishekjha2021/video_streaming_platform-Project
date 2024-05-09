//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
//code copied from official documentation of multer------------------------

import multer from "multer";

//humne yha disk storage lia hai ..but we have many other options also like memory storage and all
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")     //temorary stored file ko hame uthana kaha se hai ..public ke temp folder se------
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage: storage, 
})