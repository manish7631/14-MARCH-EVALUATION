const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())


const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/EVALUATION")
}

  
const userSchema = new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      middleName: { type: String, required: false },
      lastName: { type: String, required: false },
      age:{type:Number, required:true},
      email: { type: String, required: true },
      address: { type: String, required: true },
      gender: { type: String, required: true },
     
    },
    {
      versionKey: false,
      timestamps: true, // createdAt, updatedAt
    }
  );
  
 
  const User = mongoose.model("evalData", userSchema); 

  
  const branchSchemas = new mongoose.Schema(
    {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    adress: { type: String, required: true },
    IFSC: { type: String, required: true },
    MICR: { type: Number, required: true },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "evalData",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

 
const Branch = mongoose.model("branch_details", branchSchemas);

const MasterSchemas = new mongoose.Schema(
    {
      id: { type: Number, required: true },
      balance: { type: Number, required: true },
      branchinfo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branch_details",
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
 
  const master_account = mongoose.model("master", MasterSchemas);

  const savingSchemas = new mongoose.Schema(
    {
      id: { type: Number, required: true },
      accountnumber: { type: Number, required: true, unique: true },
      balance: { type: Number, required: true },
      intrestRate: { type: Number, required: true },
      master_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "master",
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
 
  const Saving_account = mongoose.model("saving", savingSchemas);


  
  const fixedSchemas = new mongoose.Schema(
    {
      id: { type: Number, required: true },
      accountnumber: { type: Number, required: true, unique: true },
      balance: { type: Number, required: true },
      intrestRate: { type: Number, required: true },
      startDate: { type: Number, required: true },
      maturityDate: { type: Number, required: true },
      savingac_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "saving",
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  
  const fixed_account = mongoose.model("fixed", fixedSchemas);
  


  


  app.get("/user", async (res, req) => {
    try {
        const users = await User.find().lean().exec();
        return res.statu(201).send(users)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

app.post("/user", async (res, req) => {
    try {
        const users = await User.create(req.body);
        return res.statu(201).send(users)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

app.patch("/user/:id", async (res, req) => {
    try {
        const users = await User.findByIdAndDelete(req.params.id, req.body,
            {
                new: true
            }
        ).lean().exec();
        return res.statu(201).send(users)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

app.delete("/user/:id", async (res, req) => {
    try {
        const users = await User.deleteMany({balance:0}).lean().exec();
        return res.statu(201).send(users)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})


// --------------------------BRANCH--------------------------------



app.get("/branch", async (res, req) => {
  try {
      const details = await Branch.find().lean().exec();
      return res.statu(201).send(details)
  }
  catch(e) {
      return res.statusCode(500).send(e.message)
  }
})


app.post("/branch", async (res, req) => {
  try {
      const details = await Branch.create(req.body);
      return res.statu(201).send(details)
  }
  catch(e) {
      return res.statusCode(500).send(e.message)
  }
})


app.patch("/branch/:id", async (res, req) => {
  try {
      const details = await Branch.findByIdAndUpdate(req.params.id, req.body,
          {
              new: true
          }
      ).lean().exec();
      return res.statu(201).send(details)
  }
  catch(e) {
      return res.statusCode(500).send(e.message)
  }
})


app.delete("/branch/:id", async (res, req) => {
  try {
      const details = await Branch.findByIdAndDelete(req.params.id).lean().exec();
      return res.statu(201).send(details)
  }
  catch(e) {
      return res.statusCode(500).send(e.message)
  }
})

// -----------------------MASTERACCOUNT--------------------------


app.get("/masteraccount", async (res, req) => {
  try {
      const details = await master_account.find().lean().exec();
      return res.statu(201).send(details)
  }
  catch(e) {
      return res.statusCode(500).send(e.message)
  }
})


app.post("/masteraccount", async (res, req) => {
  try {
      const details = await master_account.create(req.body);
      return res.statu(201).send(details)
  }
  catch(e) {
      return res.statusCode(500).send(e.message)
  }
})


app.patch("/masteraccount/:id", async (res, req) => {
  try {
      const details = await master_account.findByIdAndUpdate(req.params.id, req.body,
          {
              new: true
          }
      ).lean().exec();
      return res.statu(201).send(details)
  }
  catch(e) {
      return res.statusCode(500).send(e.message)
  }
})


app.delete("/masteraccount/:id", async (res, req) => {
  try {
      const details = await master_account.findByIdAndDelete(req.params.id).lean().exec();
      return res.statu(201).send(details)
  }
  catch (e) {
      return res.statusCode(500).send(e.message)
  }
});

//----------------------------SAVINGACCOUNT--------------------------




app.get("/savingaccount", async (res, req) => {
  try {
      const details = await Saving_account.find().lean().exec();
      return res.statu(201).send(details)
  }
  catch(e) {
      return res.statusCode(500).send(e.message)
  }
})

app.post("/savingaccount", async (res, req) => {
  try {
      const details = await Saving_account.create(req.body);
      return res.statu(201).send(details)
  }
  catch(e) {
      return res.statusCode(500).send(e.message)
  }
})


app.patch("/savingaccount/:id", async (res, req) => {
  try {
      const details = await Saving_account.findByIdAndUpdate(req.params.id, req.body,
          {
              new: true
          }
      ).lean().exec();
      return res.statu(201).send(details)
  }
  catch(e) {
      return res.statusCode(500).send(e.message)
  }
})


app.delete("/savingaccount/:id", async (res, req) => {
  try {
      const details = await Saving_account.findByIdAndDelete(req.params.id).lean().exec();
      return res.statu(201).send(details)
  }
  catch (e) {
      return res.statusCode(500).send(e.message)
  }
});



app.get("/fixedaccount", async (res, req) => {
  try {
      const details = await fixed_account.find().lean().exec();
      return res.statu(201).send(details)
  }
  catch(e) {
      return res.statusCode(500).send(e.message)
  }
})


app.post("/fixedaccount", async (res, req) => {
  try {
      const details = await fixed_account.create(req.body);
      return res.statu(201).send(details)
  }
  catch(e) {
      return res.statusCode(500).send(e.message)
  }
})


 

app.patch("/fixedaccount/:id", async (res, req) => {
  try {
      const details = await fixed_account.findByIdAndUpdate(req.params.id, req.body,
          {
              new: true
          }
      ).lean().exec();
      return res.statu(201).send(details)
  }
  catch(e) {
      return res.statusCode(500).send(e.message)
  }
})

// 4 delete
app.delete("/fixedaccount/:id", async (res, req) => {
  try {
      const details = await fixed_account.findByIdAndDelete(req.params.id).lean().exec();
      return res.statu(201).send(details)
  }
  catch (e) {
      return res.statusCode(500).send(e.message)
  }
});





 




app.listen(2000, async () => {
    try {
      await connect();
    } catch (err) {
      console.log(err);
    }
  
    console.log("listening on port 2000");
  });
  