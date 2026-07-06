function register(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
       console.log("Register Here");
       resolve();
    },8000)
    }) 
}
function sendEmail(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
      console.log("Send Email");
      resolve();
    },2000)
    }) 
    
}
function login(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
       console.log("Login Here");
       reject("Login Failed");
    },1500)
    })
  
}
function getData(){
    return new Promise((resolve,reject)=>{
       setTimeout(()=>{
console.log("fetch data");
resolve();
    },4000)
    })
    
}
function displayData(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
    console.log("Display Data");
    resolve();
    },3000)
    })
    
}

register().then(sendEmail)
        .then(login)
        .then(getData)
        .then(displayData)
        // .catch((err)=>{
        //     console.log("Error",err);
       // })
console.log("call other Application");