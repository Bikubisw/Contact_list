//requre the libary
const mongoose = require('mongoose');
//connect to the database
mongoose.connect('mongodb://localhost/contact_list_db');
//aquire the connection to check it is coonected or not 
const db = mongoose.connection;
// error
db.on('error', console.error.bind(console, 'connection error:'));
// up and then print the meassage
db.once('open', function() {
    console.log("We are connected");
});
module.exports = db;