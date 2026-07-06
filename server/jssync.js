function register(cb){
        setTimeout(()=>{
            console.log('Register Here');
            cb();
        },8000)
    
}

function sendEmail(cb){
    setTimeout(()=>{
        console.log('Send Email');
        cb();
    },2000)
}

function login(cb){
    setTimeout(()=>{
    console.log('Login Here');
    cb();
    },1500)
}

function getData(cb){
    setTimeout(()=>{
        console.log('Fetch Data');
        cb();
    },4000)
    
}

function displayData(){
    setTimeout(()=>{
        console.log('Display Data');
    },3000)
}


register(()=>{
    sendEmail(()=>{
            login(()=>{
                getData(()=>{
                    displayData();
                })
            });
    });
});

console.log('Call other apps');