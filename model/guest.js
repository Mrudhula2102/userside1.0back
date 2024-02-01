const mongoose=require("mongoose")

let sc=mongoose.Schema;
const guestuserschema = new sc({
    gid:String,
    gname:String,
    gage:Number,
    gaddress:String,
    gstatus:String,
    
});

var guestusermodel=mongoose.model("guestuser",guestuserschema)
module.exports =guestusermodel;