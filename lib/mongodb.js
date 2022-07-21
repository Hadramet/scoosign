import { MongoClient } from "mongodb";

const uri = "mongodb+srv://hadramet:WuM812lccOjqSSk6@todo-app-nextjs.stlpl.mongodb.net"

let client
let clientPromise

if (!global._mongoClientPromise) {

    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()

}

clientPromise = global._mongoClientPromise

export default clientPromise
