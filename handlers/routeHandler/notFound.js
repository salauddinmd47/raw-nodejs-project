const handler = {}

handler.notFound= (requestProperties, callback)=>{
    callback(404, {
        message:'your requested url not found'
    })
}

module.exports = handler