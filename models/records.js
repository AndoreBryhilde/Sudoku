///引入套件
const mongoose = require('mongoose');

///該資料表的格式設定
const sudokurecords = new mongoose.Schema({
    Id:{//Id
      type:String, //設定該欄位的格式
      required:true //設定該欄位是否必填
    },
    type:{ //難度
        type:String,
        required:true
    },
    costtime:{ //花費的時間
      type:Number,
      required:true
    },
    createdDate:{ //新增時的時間
        type: Date,
        default: Date.now,
        required:true
    }
})
//匯出該資料表
module.exports = mongoose.model("sudokurecords" , sudokurecords);