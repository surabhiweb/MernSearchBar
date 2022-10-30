const path = require("path");
const ads = require("../models/ads");
const company = require("../models/company");

exports.getAds = ( req, res,next) => {
  const searchFor = req.params.searchFor;

  
  company.aggregate([{
    "$lookup": {
      "from": "ads",
      "localField": "_id",
      "foreignField": "companyId",
      "as": "a"
    }
  },{
    "$unwind": {
      "path": "$a",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$match": {
      "$or": [
        {
          "name": {
            "$regex": "(?i)^.*"+searchFor+".*$" 
          }
        },
        {
          "a.primaryText": {
            "$regex": "(?i)^.*"+searchFor+".*$" 
          }
        },
        {
          "a.headline": {
            "$regex": "(?i)^.*"+searchFor+".*$" 
          }
        },
        {
          "a.description": {
            "$regex": "(?i)^.*"+searchFor+".*$" 
          }
        },
        {
          "a.CTA": {
            "$regex": "(?i)^.*"+searchFor+".*$" 
          }
        }
      ]
    }
  }
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
 
};





