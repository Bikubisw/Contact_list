const express = require('express');
const port = 8000;
const path = require('path');
const db = require("./config/mongoose");
const Contact = require("./models/contact");
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));
// multiple middleware
// app.use((req, res, next) => {
//     //console.log(req, "Type is:", typeof req);

//     req.Myname = "Bikram";
//     next();

// });
// app.use((req, res, next) => {
//     //console.log("My name is :", req.Myname);
//     console.log("Middle2 is called");
//     next();
// });
var contactlist = [{
        name: "Bikram Biswas",
        phone: "8541456622"
    },
    {
        name: "Sanchita Biswas",
        phone: "4815622054"
    },
    {
        name: "saikat Mitra",
        phone: "8514086314"
    }

]

app.get('/', (req, res) => {
    // console.log(__dirname);
    Contact.find({}, function(err, contacts) {
        if (err) {
            console.log("Error in fetching contacts");
            return;
        }
        return res.render('home', {

            title: "My contact list",
            contact_list: contacts

        });

    });

});
app.get('/practise', (req, res) => {
    return res.render('practise', {
        title: "Playground"

    });

});
app.post('/contactList', (req, res) => {
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, (err, newContact) => {
        if (err) {
            console.log("Error in creating a contact");
            return;
        }
        console.log("************", newContact);
        return res.redirect('/');

    });
});
app.get('/delete-contact/', (req, res) => {
    console.log(req.query);
    let id = req.query.id;
    console.log(id);
    Contact.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log("There is some error to delete the data from the mongodb");
            return;
        }
        return res.redirect('/');

    });
    // let Contactindex = contactlist.findIndex(contact => contact.phone == phone);
    // if (Contactindex != -1) {
    //     contactlist.splice(Contactindex, 1);

    // }

});
app.listen(port, function(err) {
    if (err) {
        console.log("My server is not running", err);
    }
    console.log("My express server is running on port ", port);
});