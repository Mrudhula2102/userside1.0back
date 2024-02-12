const express = require("express");
const cors = require("cors")

// const multer = require('multer')
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const usermodel= require("./model/user");
const trainmodel = require("./model/training");
const recruitmodel = require("./model/recruitment");
const employeemodel = require("./model/employee");
const guestusermodel = require("./model/guest");
const grimodel = require("./employeeside/grievance");
const newmodel = require("./employeeside/newuse/registration");
const loginemodel = require("./model/logine");





const app = new express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
//api creation
app.get('/', (request, response) => {
    response.send("hi database")
})
app.post('/logins', async (request, response) => {
    const { hrid, password } = request.body;
  
    try {
      const user = await usermodel.findOne({ hrid, password });
  
      if (user) {
        response.json({ success: true, message: 'Login successful' });
      } else {
        response.json({ success: false, message: 'Invalid HR ID or Password' });
      }
    } catch (error) {
      response.status(500).json({ success: false, message: 'Error during login' });
    }
  });
//login retrieving
app.get('/logins',async(request,response)=>{
    var data = await usermodel.find();
    response.send(data)
})

app.get('/trainingview',async(request,response)=>{
    var data = await trainmodel.find();
    response.send(data)
    })
app.get('/trainingview',async(request,response)=>{
     var data = await trainmodel.find();
     response.send(data)
     })    
        
app.put('/trainingedit/:id', async(request,response)=>{
let id = request.params.id
await trainmodel.findByIdAndUpdate(id,request.body)
response.send("Record Deleted")
})
//For Submit button
app.post('/new',(request,response)=>{
    console.log(request.body)
    new trainmodel(request.body).save();
    response.send("Record Sucessfully Saved")
    })



app.listen(4005, (request, response) => {
        console.log("port is running in 4005")
    })


//For Submit button
app.post('/new1',(request,response)=>{
    console.log(request.body)
    new recruitmodel(request.body).save();
    response.send("Record Sucessfully Saved")
    })
app.get('/recruitmentview',async(request,response)=>{
        var data = await recruitmodel.find();
        response.send(data)
        })
app.get('/recruitmentview',async(request,response)=>{
            var data = await recruitmodel.find();
            response.send(data)
            })
app.put('/recruitmentedit/:id', async(request,response)=>{
        let id = request.params.id
         await recruitmodel.findByIdAndUpdate(id,request.body)
        response.send("Record Deleted")
         })
/
//employee
app.post('/new2',(request,response)=>{
    console.log(request.body)
    new employeemodel(request.body).save();
    response.send("Record Sucessfully Saved")
    })
app.get('/employeeview',async(request,response)=>{
        var data = await employeemodel.find();
        response.send(data)
        })
app.get('/employeeview',async(request,response)=>{
            var data = await employeemodel.find();
            response.send(data)
            })
app.put('/employeeedit/:id', async(request,response)=>{
        let id = request.params.id
         await employeemodel.findByIdAndUpdate(id,request.body)
         response.send("Record Deleted")
          })
//guest
app.post('/new3',(request,response)=>{
  console.log(request.body)
  new guestusermodel(request.body).save();
  response.send("Record Sucessfully Saved")
  })
  app.get('/guestuserview',async(request,response)=>{
    var data = await guestusermodel.find();
    response.send(data)
    })
app.get('/guestuserview',async(request,response)=>{
var data = await guestusermodel.find();
response.send(data)
})
app.put('/guestuseredit/:id', async(request,response)=>{
let id = request.params.id
  await guestusermodel.findByIdAndUpdate(id,request.body)
 response.send("Record Deleted")
   })   

//emuser

app.post("/employeelogin", async (req, res) => {
  const { empid, password } = req.body;
  try {
    const userr = await loginemodel.findOne({ empid });

    if (userr) {
      if (userr.password === password) {
        // If the user authentication is successful, save login details to MongoDB
        const loginDetails = new loginemodel({
          empid,
          loginTime: new Date(),
        });
        await loginDetails.save();
        res.json("Success");
      } else {
        res.json("Password is incorrect");
      }
    } else {
      res.json("User not found");
    }
  } catch (error) {
    console.error("Error during user authentication:", error);
    res.status(500).json("Internal server error");
  }
});
// app.get('/employees',async(request,response)=>{
//   var data = await loginemodel.find();
//   response.send(data)
// })

//grievance
///save data button
app.post('/grievance',(request,response)=>{
  console.log(request.body)
  new grimodel(request.body).save();
  response.send("Record Sucessfully Saved")
  })
 


 //newuser
 //save button
 app.post('/newuserreg',(request,response)=>{
  console.log(request.body)
  new newmodel(request.body).save();
  response.send("Record Sucessfully Saved")
  })

