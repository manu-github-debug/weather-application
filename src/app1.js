const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')


const app=express()// Assigning express to another const variable

//To handle the html pages node.js provides two functions

console.log(__dirname)
console.log(__filename)

const publicDirectoryPath=path.join(__dirname,'../public')// this is the function given by the core module called path
const viewsPath=path.join(__dirname,'../templates/views')
const partialViews=path.join(__dirname,'../templates/partials')
console.log(publicDirectoryPath)

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialViews)

app.use(express.static(publicDirectoryPath))// in this we are telling express.js to take that path as static
//This is the root of the application, when app.use is not used

//To render dynamic pages,we use


app.get('',(req,res)=>{

    res.render('index',{// here render means give,we are telling to express use this dynamic web content
        title:'Web Application',
        name:'Sai Manoj',
        header:'Weather Application'
        
    })
})


// this is after the root page,when app.use is not used
app.get('/about',(req,res)=>{

    res.render('about',{
        title: 'About',
        name:'Sai Manoj',
        header:'About Me'
    })
})


//serving html and json,when app.use is not used

//1.html
app.get('/details',(req,res)=>{

    res.send('<h1>This is the header of the details page</h1>')

})


//2.JSON PAGE,when app.use is not used
app.get('/jsonPage',(req,res)=>{

    res.send({

       name:'Sai Manoj',
       age:25,
       empId:80996

    })
})

//3.Array of objects

app.get('/arrayOfJsonObjects',(req,res)=>{

    res.send([{
      
        name:'sai',
        age:25

    },
{

    name:'Manoj',
    age:26
}                   
])

})

// this is the weather application for Query String END POINTS
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode.geocode(req.query.address,(error,{ latitude,longitude,place_name}={})=>{

        if(error){

           return res.send({error})
            
        }

        geocode.forecast(latitude,longitude,(error,forecast)=>{

            
        if(error){

            return res.send({error})
             
         }

         res.send({

            forecast:forecast,
            address:req.query.address,
            location:place_name


          })
        })
    })
})

//This is another end point for Query String
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*',(req,res)=>{

    res.render('404',{

        title:'Page not found',
        name:'Sai Manoj'
    })
})


app.get('/about/*',(req,res)=>{

    res.render('404',{

        title:'Invalid Page',
        name:'Sai Manoj'
    })
})

// For starting an server this is mandatory
app.listen(4000,()=>{// 2 inputs 1 is the port and the other is the callback function
    console.log('Server Started')
})