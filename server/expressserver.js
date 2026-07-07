import express from "express"
import dotenv from "dotenv"
dotenv.config();
const port = process.env.PORT || 3002;
const app = express();

const userdata = [{
    id:1,
    name: "Arvind",
    email:"karvind08@gmail.com"
},
{
    id:10,
    name: "Yuvaan",
    email:"Yuvaan07@gmail.com"
}]


app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Welcome User"
    })
})

app.use(express.json());
// To get the list of users
app.get("/users",(req,res)=>{
    try{
        res.status(200).json({message: "Data Received",userdata})
    }
    catch(err){
        console.error("Error:",err.message)
    }
    
})

// User 
app.get("/user/:id",(req,res)=>{
    try{
        const id = req.params.id;
        const user = userdata.find((u)=>u.id==id);
        if(!user){
            return res.status(400).json({message: "User not found"})
        }
        res.status(200).json({message: "Data Received",user})
    }
    catch(err){
        console.error("Error:",err.message)
    }
    
})

// Create 
// app.post("/create", (req, res) => {
//     try {
//         // const name = req.body.name;
//         const { name, email } = req.body;  // destructuring
//         const newUser = {
//             id: userdata.length+1,
//             name,
//             email
//         }
//         userdata.push(newUser);
//         res.status(201).json({message: "User Created successfully",newUser})
//     }
    
// catch (error) {
//         console.error("Error:",err.message)
//     }
// })

// by Jyoti Sharma Developer

app.post("/create", (req, res) => {
try {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
        return res.status(400).json({
        message: "Name and Email are required",
    });
    }

    // Check duplicate email
    const existingUser = userdata.find((u) => u.email === email);

    if (existingUser) {
        return res.status(409).json({
        message: "Email already exists",
        });
    }

    // Create new user
    const newUser = {
        id: userdata.length + 1,
        name,
        email,
    };

    userdata.push(newUser);

    res.status(201).json({
    message: "User created successfully",
    user: newUser,
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({
    message: "Internal Server Error",
    });
    }
});

app.listen(port,()=>{
    console.log(`Server is running on Port ${port}`)
})