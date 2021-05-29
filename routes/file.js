const { MongoClient } = require('mongoat')
const mongo = require('mongoat')
exports.module.saveFile = async function saveFile(request, response, next) {
    //take file and save in db- to connect db we need driver

    const db = await dbConnect();

    db.collection("files").save(request.body)
    response.send("fileSaved")
}

function dbConnect() {

    //will return client to connect to db
    const monoClient = new mongo.MongoClient("mongodb://localhost:27017/fileDb")// arg local url mongodb , connection timeout, socket timeout


    new Promise((res, rej) => {
        monoClient.connect((error, client) => {
            res(client.db())// returns object to write query
        })
    });

}

exports.module.getFile = async function getFile(request, response, next) {
    //fetch query param from req
    const fileId = request.query && request.query.param && request.query.param.fileId
    const db = await dbConnect();

    const file = await db.collection("files").findOne({ _id: mongo.ObjectID(fileId) });
    response.send(file)
}