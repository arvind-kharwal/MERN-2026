import http from "http";
import os from "os";

const userdata = [
    {
        id: 101,
        Name: "Arvind",
        Email: "karvind08@gmail.com"
    },
    {
        id: 102,
        Name: "Yuvaan",
        Email: "Yuvaan07@gmail.com"
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
    else{
        res.statusCode=404;
        res.end("Error Page");
    }
})

server.listen(3001,()=>{
    console.log('Server is running on 3001');
})