//  name:"Uptime testing api application ",
//  description:'It is mainly testing for client providing api up or down',
//  Author:'Md Salauddin (MERN Stack Developer)',

const http = require('http');
const environment  = require('./helpers/environments');
const {handleReqAndRes} = require('./helpers/handleReqAndRes')
const data = require('./lib/data')

// application object 
const app = {}

// testing file system 
// @TODO erased will be later 

// data.delete('test','newFile',  (err )=>{
//     console.log(err )
// })

// server creation 

app.createServer = ()=>{
    const server = http.createServer(app.handleReqAndRes);
    server.listen( environment.port,  ()=>{ 
        console.log(`Server running on port ${environment.port}`)
    })
}


// handle req and res 
app.handleReqAndRes= handleReqAndRes

// start server 
app.createServer()