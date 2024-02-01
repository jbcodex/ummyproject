const mongoose = require('mongoose');
const DBUser = process.env.DB_USER;
const DBPassword = process.env.DB_PASS;

const conn = async () =>{
    try {
        const dbConn = await mongoose.connect(
            `mongodb+srv://${DBUser}:${DBPassword}@cluster0.unnerms.mongodb.net/
            ?retryWrites=true&w=majority`
            );
        console.log("Application connected on database!");
        return dbConn;
    } catch (error) {
        console.log(error);
    }
}
conn();
module.exports = conn; 
