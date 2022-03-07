const express = require("express");
const app = express()
const data=require('./saral_data.json')
const fs = require("fs")
app.use(express.json())



app.get("/api",(req,res)=>{
    res.json(data)
})

app.post("/api/post",(req,res)=>{
    if(!req.body.name){
        res.status(400)
        return res.json({err:"name required"})
    }
    const course={
        id :data.length+1,
        name : req.body.name,
        logo: req.body.logo,
        notes: req.body.notes,
        days_to_complete: req.body.days_to_complete,
        short_description: req.body.short_description,
        type: req.body.type,
        course_type: req.body.course_type,
        lang_available: req.body.lang_available
    }
    data.push(course)
    fs.writeFileSync('./saral_data.json',JSON.stringify(data,null,3))
    res.json(course)
})

app.put("/put/:id",(req,res)=>{
    let id = req.params.id;
    let name = req.body.name
    let logo= req.body.logo
    let notes= req.body.notes
    let days_to_complete = req.body.days_to_complete
    let short_description = req.body.short_description
    let type = req.body.type
    let course_type = req.body.course_type
    let lang_available = req.body.lang_available

    let index = data.findIndex((dataa)=>{
        return(dataa.id==Number.parseInt(id))
    })
    if(index>=0){
        cour=data[index]
        cour.name = name
        cour.logo= logo
        cour.notes= notes
        cour.days_to_complete = days_to_complete
        cour.short_description = short_description
        cour.type = type
        cour.course_type = course_type
        cour.lang_available = lang_available
    console.log(cour);
    fs.writeFileSync('./saral_data.json',JSON.stringify(data,null,3))
    res.json(cour)

    }

    else{
        res.status(400)
    }

})


app.delete("/delete/:id",(req,res)=>{
    let id=req.params.id
    let index = data.findIndex((dataa)=>{
        return(dataa.id==Number.parseInt(id))
    })
    if(index>=0){
        cour=data[index]
        data.splice(index,1)
        fs.writeFileSync('./saral_data.json',JSON.stringify(data,null,3))
        res.send(data)
    }
    else{
        res.status(404)
    }

})

app.listen(8000,()=>{
    console.log("listen to the port");
})

app.get('/course/:id',(req,res)=>{
    let id=req.params.id
    let index = data.findIndex((dataa)=>{
        return(dataa.id==Number.parseInt(id))
    })
    if(index>=0){
        cour=data[index]
        res.send(cour)
    }
    else{
        res.status(404)
    }
})