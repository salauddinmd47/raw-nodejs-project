//  name:"Uptime testing api application ",
//  description:'It is mainly testing for client providing api up or down',
//  Author:'Md Salauddin (MERN Stack Developer)',

const http = require('http')

// application object 
const app = {}

// configuration 
app.config={
     port:4000
}

// server creation 

app.createServer = ()=>{
    const server = http.createServer(app.handleReqAndRes);
    server.listen(app.config.port, ()=>{
        console.log(`Server running on port ${app.config.port}`)
    })
}

app.handleReqAndRes= (req, res)=>{
    res.end("Hello programers what the hell are you doing")
}

app.createServer()