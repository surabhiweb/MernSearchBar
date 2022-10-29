const mongoose = require('mongoose');
// const route = require('./routes/ad')
const path = require("path");

const express = require("express");

const ads = require("./models/ads");
const company = require("./models/company");
const router = require('./routes/ad');

const DB = 'mongodb+srv://Surabhi:mOBz9bYNjy58@cluster0.x4iby2b.mongodb.net/mernstack?retryWrites=true&w=majority'


const app = express();


app.use(router)
const clients = {};

app.get('/', (req, res) => {
  res.send('hello world')
})

mongoose
  .connect(
    DB , {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then((result) => {
    console.log("Connected to db");

    const server = app.listen(3002, ()=>{
      console.log("Listening on port 3002");
    });
    
    app.get("/api", (req, res) => {
      res.json({ message: "Hello from server!" });
    });
    // const io = require("./util/socket").init(server);
    // io.on("connection", (socket) => {
    //   socket.on("add-company", (data) => {
    //     console.log("inside socket starting");
    //     clients[data.userId] = {
    //       socket: socket.id,
    //     };
    //   });

    //   //Removing the socket on disconnect
    //   socket.on("disconnect", () => {
    //     console.log("inside socket 2 removing");
    //     for (const userId in clients) {
    //       if (clients[userId].socket === socket.id) {
    //         delete clients[userId];
    //         break;
    //       }
    //     }
    //   });
    // });
  })
  .catch((err) => console.log(err));


  // Parent data insertion - 

  // const company1 = new company({
  //   _id: 1,
  //   name: "Levi's",
  //   url: "http://levis.com/"
  // });
  
  // company1.save(function (err, doc) {
  //   console.log(doc._id);
  // });


// child data insertion -  

// ads1.save(function (err, doc) {
//   console.log(doc._id);
// });

// ads.collection.find({ $text : { $search : "great" } }, (data) => {
//   console.log(data);
// });


// primaryText	headline	description	CTA

// company.index({ primaryText : 'text', headline : 'text' , description : 'text', CTA : 'text'});


// export function StoreDateInDB(){
//   const insertData = [
//     { _id: 1, name: "", description: "Coffee and cakes" },
//     { _id: 2, name: "Burger Buns", description: "Gourmet hamburgers" },
//     { _id: 3, name: "Coffee Shop", description: "Just coffee" },
//     { _id: 4, name: "Clothes Clothes Clothes", description: "Discount clothing" },
//     { _id: 5, name: "Java Shopping", description: "Indonesian goods" }
//   ]
  
//   ads.insertMany
// }

// const ads1 = new ads({
//   companyId: 1,
//   primaryText: "it is very great company",
//   headline: "hello this is my first company",
//   description: "can you please write the description of my great company",
//   CTA: "This is CTA",
//   imageUrl: "https://drive.google.com/file/d/17vrlQMchymHqlN35p4os23jYqQjFiUNq/view?usp=sharing"
// });






// exports.clients = clients;
