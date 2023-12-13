const express = require("express");

const app = express();
app.use(express.json());

const multer = require("multer");
const path = require("path");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/cat");

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://abhishekk13:abhishekk13@cluster0.credekz.mongodb.net/?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://virendramore:virendramore@cluster0.xvkrmlb.mongodb.net/?retryWrites=true&w=majority')
.then(console.log("Connection successfull"))
.catch((err) => console.log("Not connected to mongodb" + err));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/cat', catRoute);

app.use("/images", express.static(path.join(__dirname, "/images")))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name)
    }
})
const upload = multer({storage: storage});
app.post('/api/upload', upload.single("file"), (req, res)=>{
    res.status(200).json("File has been uploaded");
})


app.listen("5000", ()=>{
    console.log("Server run at port 5000")
})

// mongodb+srv://abhishekk13:<password>@cluster0.credekz.mongodb.net/?retryWrites=true&w=majority
