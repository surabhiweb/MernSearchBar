const path = require("path");
const fs = require("fs");


const ads = require("../models/ads");
const company = require("../models/company");

exports.getAds = ( req, res,next) => {

  // console.log(req);
   const searchFor = req.params.searchFor;
  // ads.find({ $text: { $search : searchFor , $caseSensitive: false} }
  // // , (err, response, res) => {
  // //   console.log(err);
  // //   console.log(response);
  // //   console.log(res);
  // // }
  // )
  ads.aggregate([  
    {
      $match: {
      $text: { $search : searchFor, $caseSensitive : false }
    },
  },

    {
      $lookup:{
        from: "companies",  // parent table
        localField: "companyId",  // in child table
        foreignField: "_id",
        as: "companyDetails" // output as
      }
    },
    {$unwind: { path:"$companyDetails" }},
    {$project: {
      "companyId":0,
      "primaryText":0,
      "headline":0,
      "description":0,
      "CTA":0,
      "__v":0,
      "_id":0,
      "companyDetails._id":0,
      "companyDetails.__v":0
    }},
  ])
  .then((response) => {
    if (!response) {
      const error = new Error(
        "Could not find any ads with the given searchText"
      );
      error.statusCode = 404;
      throw error;
    }
    console.log(response);
    res
      .set('Access-Control-Allow-Origin', 'http://localhost:3000')
      .status(200)
      .json({ message: "Ads fetched successfully", ads: response });
  })
  .catch((err) => {
    if (!err.statusCode) err.statusCode = 500;
      next(err);
  });
  // ads.findOne({})
  //   .then((ads) => {
  //     if (!ads) {
  //       const error = new Error(
  //         "Could not find any ads with the given searchText"
  //       );
  //       error.statusCode = 404;
  //       throw error;
  //     }
  //     res
  //       .status(200)
  //       .json({ message: "Ads fetched successfully", ads: ads });
  //   })
  //   .catch((err) => {
  //     if (!err.statusCode) err.statusCode = 500;
  //     next(err);
  //   });
};





