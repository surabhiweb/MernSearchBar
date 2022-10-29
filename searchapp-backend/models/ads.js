const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// companyId	primaryText	headline	description	CTA	imageUrl
const ads = new Schema(
  {
    companyId: { type: Number, required: true, ref:  "company.companyId"}, //  value reference to parent
    primaryText:{
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    CTA: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    }
  }
);

ads.index({ primaryText : 'text', headline : 'text' , description : 'text', CTA : 'text'});

ads.index({primaryText: "text"});


module.exports = mongoose.model("Ads", ads);
