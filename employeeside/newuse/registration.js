const mongoose =require("mongoose")
mongoose.connect("mongodb+srv://talenthrm2003:talent2004@cluster0.hmx7ags.mongodb.net/hrm?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));


let sc=mongoose.Schema;
const newschema=new sc({
    ename:String,
    idd:String,
    enumber: Number,
    equalification:String,
    egender:String,
    eexperience:String,
    edob: String,
    enationality:String,
    eaddress:String,
    pass:String,
    reenter:String
});

var newmodel=mongoose.model("Registration",newschema)
module.exports=newmodel;