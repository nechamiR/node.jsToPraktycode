const request = require('request')

const apiRequests = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (err, res, data) => {
            if (data) {
                resolve(data)
            }
            if (err) {
                reject(err)
            }
        })
    })
}

module.exports = getToDoList = (req, res) => {
    apiRequests('https://jsonplaceholder.typicode.com/todos')
        .then(body => {
        return    res.status(200).send({ data: JSON.parse(body) })
        })
        .catch(err => {
         return   res.status(500).send({ error: err.message })
        })
}