import http from "http";
import os from "os";
const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    if(url=="/msg" && method == "GET"){
        res.write("Welcome User");
        res.end(); // It is used to get the output
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