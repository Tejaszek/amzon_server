//import from packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//imports from other files
const authRouter =require('./routes/auth');


//initialize
const PORT = 3000;
const app = express();
const DB ="mongodb+srv://tejaskare0:tejas123@cluster0.btxwoax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//middleware
app.use(cors());
app.use(express.json());
app.use(authRouter);



//connecttions

mongoose.connect(DB).then(()=> {
    console.log("connection Sucessful");
}).catch(e =>{
    console.log(e);
})




app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected to port ${PORT} `)
});

