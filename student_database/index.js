const express=require('express');
const dbConnect = require('./mongodb');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/student')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const studentsSchema = new mongoose.Schema({
    first_name:"String",
    last_name:"String",
    rollnumber:"String",
    gender:"String"
});

const studdata = mongoose.model('stud_details',studentsSchema);

app.get('/getstudents', async (req,resp)=>{
  try {
    let data = await dbConnect();
    data = await data.find().toArray();
    //resp.send(data)
    if (data.length === 0) {
      return resp.status(404).send({ error: "No students found" });
    }
    resp.status(200).send(data);
  } catch (error) {
    resp.status(500).send({ error: "Internal Server Error" });
  } 
});

app.post('/insertstudents', async (req,resp)=>{
    try {
      let data = await dbConnect();
    data = await data.insertOne(req.body);
    resp.status(200).send(data);
    } catch (error) {
      resp.status(500).send({ error: "Internal Server Error" });
    }
});

app.delete('/deletestudent/:id', async (req,resp)=>{
  try {
    const result = await studdata.deleteOne({_id:req.params.id});
    resp.status(200).send(result);
  } catch (error) {
    resp.status(500).send({ error: "Internal Server Error" });
  }
      
})

app.listen(5000);