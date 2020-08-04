const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    date: String,
    title: String,
    content: String,
    BIM_report_list: [Schema.Types.ObjectId]
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Report_data", DataSchema);