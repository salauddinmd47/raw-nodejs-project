
const environments ={}

environments.staging={
    port:4000,
    envName:'staging',
    secretKey:'hjhjhjhj'
}

environments.production={
    port:5000,
    envName:'production',
    secretKey:'bjbjtjtj'
}

const currentEnvironments = typeof(process.env.NODE_ENV) === 'string'? process.env.NODE_ENV : 'staging'

const environmentToExport = typeof(environments[currentEnvironments]) === 'object'? environments[currentEnvironments] : environments.staging

module.exports = environmentToExport;