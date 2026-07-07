import http from "http";
import os from "os";

const userdata = [
    {
        id: 101,
        name: "Arvind",
        email: "karvind08@gmail.com"
    },
    {
        id: 102,
        name: "Yuvaan",
        email: "Yuvaan07@gmail.com"
    }
];
const server = http.createServer((req,res)=>{
    const url = req.url;
    console.log(url);
    const method = req.method;
    if(url=="/msg" && method == "GET"){
        res.write("Welcome User");
        res.end(); // It is used to get the output
    }
    else if(url=="/users" && method == "GET"){
        res.end(JSON.stringify(userdata));
    }

    else if(url.startsWith("/user/") && method == "GET"){
        const id = url.split("/")[2];
        const user = userdata.find((u)=>u.id==id)
        if(!user){
            return res.end("User not found");
        }
        res.end(JSON.stringify(user));
            
    }
    else if(url=="/system" && method == "GET"){
        const sysdata = {
            platform: os.platform(),
            arch:os.arch(),
            CPU:os.cpus().length,
            IP:os.networkInterfaces(),
            TotalMemory:(os.totalmem()/1024**3).toFixed(2)+"GB",
            FreeMemory:(os.freemem()/1024**3).toFixed(2)+"GB",
        }
        res.end(JSON.stringify(sysdata)); // It is used to get the output
    }
    else if(url=="/create" && method == "POST"){
        let body ="";
        req.on("data",(chunk)=>{
            body+=chunk;
        });
        req.on("end",()=>{
            const data = JSON.parse(body);
            const newUser = {
            id: data.id,
            name: data.name,
            email: data.email
        }
        userdata.push(newUser);
        })        
        res.statusCode = 201;
        res.end("User Created Successfully!")
    }
    else if (url.startsWith("/delete/") && method == "DELETE"){
        const id = url.split("/")[2];
        const userIndex = userdata.findIndex((u)=>u.id==id);
        if(userIndex==-1){
            return res.end("User not found")
        }
        userdata.splice(userIndex,1);
        res.end("User Deleted Sucessfully")
    }
    else if(url.startsWith("/edit/") && method == "PUT"){
            const id = url.split("/")[2];
            const userIndex = userdata.findIndex((u)=>u.id == id);
            if(userIndex==-1){
                return res.end("User not found")
            }
            let body = "";
            req.on("data",(chunk)=>{
                body+=chunk;
            })
            req.on("end",()=>{
                const newdata = JSON.parse(body);
                userdata[userIndex] = {
                    id,
                    name: newdata.name,
                    email:newdata.email
                }
            })
            res.end("User Updated Sucessfully!")
    }
    else{
        res.statusCode=404;
        res.end("Error Page");
    }
})

server.listen(3001,()=>{
    console.log('Server is running on 3001');
})