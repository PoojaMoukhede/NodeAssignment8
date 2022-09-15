const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const studentArray = require('./InitialData');
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
// connect to the initalData

const studentData=require("./InitialData");

//export express-validator module
const {body, validationResult} =require("express-validator")


//get 
app.get("/api/student",async(req,res)=>{ 
    res.send(studentData)
})

// get by id
app.get("/api/student/:id",(req,res)=>{   
    const ID = req.params.id;
    const find_id= studentData.find(find_id => find_id.id === parseInt(ID))
    if(!find_id) return res.status(404).send("Invalid id")
    res.send(find_id)
})    


//post

app.post('/api/student', [body("name").isLength({min:1}),body("currentClass").isLength({min:1,max:2}),body("division").isLength({min:1})],(req, res) => {
    // res.writeHead(200,{'content-type':'application/x-www-form-urlencoded'})
   const error = validationResult(req);  
   if(!error.isEmpty()){
    return res.status(400).json({error:error.array()})
   }
   const find_id ={
    id:studentData.length+1,
    name:req.body.name,
    currentClass:req.body.currentClass,
    division:req.body.division
   }
   studentData.push(find_id)
   res.send(find_id)
  });

//push

app.put('/api/student/:id', async (req, res) => {  
    
    const ID = req.params.id;
    const find_id= studentData.find(find_id => find_id.id === parseInt(ID))
    if(!find_id) return res.status(400).send("Given id does not exixt")
    
    find_id.name=req.body.name,
    find_id.currentClass=req.body.currentClass,
    find_id.division=req.body.division

    res.send(find_id)
    
});

//delete
app.delete("/api/student/:id",(req,res)=>{   
    const ID = req.params.id;
    const find_id= studentData.find(find_id => find_id.id === parseInt(ID))
    if(!find_id) return res.status(404).send("Invalid id")
    const index = studentData.indexOf(ID)
    studentData.splice(index,1)
    res.send(find_id)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   