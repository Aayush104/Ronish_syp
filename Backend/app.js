const express = require('express');
const app = express();
const cors = require('cors');
const { QueryTypes } = require('sequelize');
const { sequelize, users, reviews } = require('./Model/Index');
const bcrypt = require('bcrypt')
const { Review } = require('./Model/Index'); // Adjust the path as necessary

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
    // console.log("hello from server side");
    const { username, email, password } = req.body;

    try {


        if(!username || !email ||!password ){
           return  res.status(401).json({error: "Please fill all the fields!"})
        }


        const checkEmail = await users.findAll({
            where: {
                Email: email
            }
        });

        const pass = bcrypt.hashSync(password, 10)

        if (checkEmail.length > 0) {
            console.log("email already exists");
            return res.status(400).send("email exists");
        }

        await sequelize.query('INSERT INTO users (UserName,Email,Password) VALUES (?, ?, ?)', {
            type: QueryTypes.INSERT,
            replacements: [username, email, pass]
        });

        res.status(200).json("success");
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "Internal server error" });
    }

});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) { 
        return res.status(400).json({ error: "fill input" }); 
    }

    const user = await users.findOne({
        where: {
            Email: email
        }
    });

    if (!user) {
        return res.status(401).json({ error: "User does not exist." });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.Password);

    if (!isPasswordValid) {
        return res.status(401).json({ error: "Incorrect password." });
    }
    return res.status(200).json({ message: "Login successful." });
});


app.post('/review', async (req, res) => {
    const { comment, rating } = req.body;

    try {
        if (!comment || !rating) {
            console.log("invalid");
            return res.status(400).json({ error: "Please fill all input" }); // Sending error message along with 400 status
        }

        const addData = await reviews.create({
            rating: rating,
            Comment: comment
        });

        console.log(addData);
        res.status(200).send("Review added successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/reviewData', async(req,res)=>{

    try {
        
        const getdata = await reviews.findAll()
        
        res.status(200).json(getdata)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

app.delete('/deleteReview/:id', async (req, res) => {
    try {
        const id = req.params.id; // Extracting the id from the request parameters
        console.log(id)

        // Assuming reviews is your Sequelize model
        const deletedReview = await reviews.destroy({
            where: {
                ID: id
            }
        });

        // Check if any review was deleted
        if (deletedReview === 0) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(3000, () => {
    console.log("The server is running");
});

