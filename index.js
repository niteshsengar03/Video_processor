import express from "express"
import cors from "cors"
import multer from "multer"
import {v4 as uuidv4} from "uuid"
import path from "path"

const app = express();
const port = 8000;
app.use(
    cors({
        origin:["http://localhost:3000"]
    })
)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// from this folder file will be served
app.use("/uploads",express.static("uploads"));

// multer mildware to upload files
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+uuidv4()+path.extname(file.originalname))
    }
})

// multer confrigation
const upload = multer({storage:storage})

// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*");
// })

app.get('/',function(req,res){
    res.json({message:"hello world"})
})

app.post("/upload",upload.single('file') , function(req,res){
    res.json({
        msg:"file uploaded"
    })
    // console.log("");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })