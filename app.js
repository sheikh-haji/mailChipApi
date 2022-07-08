const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const http=require("https");
const app=express();

// app.listen(3000,function(){console.log("listening to 3000")});
app.listen(process.env.PORT || 3000, function(){
console.log("Server is running in port 3000")
});
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"))
app.get("/",function(req,res){
      res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  var fName=req.body.FirstName;
  var lName=req.body.LastName;
  var email=req.body.Email;
  console.log("firstname->"+fName);
  console.log("lastname->"+lName);
  console.log("email->"+email);
   var data={
   members:[{
    email_address:email,
    status:"subscribed",
    merge_fields: {
                FNAME: fName,
                LNAME: lName}}]
  }
  const jsondata=JSON.stringify(data);
  const url="";
  const options={
    method:"POST",
    Auth:""
  }
  const request=http.request(url,options,function(response){
    console.log(response.statusCode);
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.send(__dirname+"/failure.html");
    }
     response.on("data",function(data){
       var data=JSON.parse(data);
       console.log(data);
     });
  });
  request.write(jsondata);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
// 
// https://<dc>.api.mailchimp.com/3.0/

// hu
