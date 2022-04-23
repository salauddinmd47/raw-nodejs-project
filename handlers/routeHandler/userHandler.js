const { hash, parseJSON } = require('../../helpers/utilities');
const data = require('../../lib/data')
const handler = {}

handler.userHandler= (requestProperties, callback)=>{
      const acceptMethods = ['get', 'post', 'put', 'delete'];
      console.log(requestProperties.method)
      if(acceptMethods.indexOf(requestProperties.method) > -1){
            handler._user[requestProperties.method](requestProperties, callback)
      }else{
          callback(405)
      }
}

handler._user = {}

handler._user.post = (requestProperties, callback)=>{
     const firstName = typeof(requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false

     const lastName = typeof(requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false

     const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false

     const phone = typeof(requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length ===11 ? requestProperties.body.phone : false

      const tosAgreement =  typeof(requestProperties.body.tosAgreement) ==='boolean' ?requestProperties.body.tosAgreement : false

     if(firstName, lastName, password, tosAgreement){
        data.read('users', 'phone', (err, user)=>{
            if(err){
                const userObject = {
                    firstName, 
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement
                }
                data.create('users', phone,userObject,(err)=>{
                    if(!err){
                        callback(200, {
                            message:'user was created successfully'
                        })
                    }else{
                        callback(400, {
                            error:'user could not created!'
                        })
                    }
                })
            }else{
                callback(500, {
                    error:'Server error'
                })
            }

        })
     }
     else{
         callback(400, {
             error:"you have problem in your request"
         })
     }
}
handler._user.get = (requestProperties, callback)=>{
    const phone = typeof(requestProperties.queryStringObject.phone) === 'string' && requestProperties.queryStringObject.phone.trim().length ===11 ? requestProperties.queryStringObject.phone : false
    if(phone){
        data.read('users', phone, (err, u)=>{
            const user = {...parseJSON(u)}
            if(!err && user){
                delete user.password 
                callback(200, user)
            }else{
                callback(404, {
                    Error:"User not found"
                })
            }
        })
    }else{
        callback(404, {
            Error:"User not found"
        })
    }
}
handler._user.put = (requestProperties, callback)=>{}
handler._user.delete = (requestProperties, callback)=>{}

module.exports = handler