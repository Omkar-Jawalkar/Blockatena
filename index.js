const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const port = 4000;
const User = require('./models/user.model');
app.use(bodyParser.urlencoded({extended: true}));

// Using json to send file
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



if(mongoose.connect('mongodb://localhost:27017/Blockatena'), {useNewUrlParser: true}) {
    console.log('connected to mongodb');
}else{
    console.log("Error in MongoDB connection");
}



app.get('/', (req, res) => {
    res.render("sendData");
})

app.post('/saveData', async (req, res) => {
    try {
        console.log(req.body);
        if (req.body) {
            await User.create({
                name: req.body.name,
                walletAddress: req.body.walletAddress,
                email: req.body.email,
                discord: req.body.discord
            })
            res.json({status: "success", message: "Data saved successfully"});   
        }
        else {
            res.json({status: "error", message: "Data not saved"});
        }
}

    catch(error) {
        console.log(error);
    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})