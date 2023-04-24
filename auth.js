//用parentElement[''子元素id]這種方式找底下的元素更方便
const signUpForm = document.getElementById("sign-up-form");
const loginForm = document.getElementById("login-form");
let headerText = document.querySelector(".header-text");
let logout = document.querySelector(".logout");
let management = document.querySelector(".management");
let addNewCardBtn = document.querySelector(".add-new-card");
let errorMessage= document.querySelector(".error-message");

auth.onAuthStateChanged(user =>{
    console.log(user);
    if(user){
        let userName =user.email.match(/.+(?=@)/i);
        loginForm.reset();
        loginForm.style.display="none";
        logout.style.display='inline';
        management.style.display='flex';
        addNewCardBtn.style.display='inline';
        headerText.innerText=`Welcome ${userName}!`;
        headerText.style.fontSize='60px';
    }else{
        logout.style.display='none';
        management.style.display='none';
        loginForm.style.display='flex';
        addNewCardBtn.style.display='none';
        headerText.innerText='Woopass';
    }
})

signUpForm.addEventListener("submit",e=>{
    e.preventDefault();
    const email = signUpForm["sign-account"].value;
    const password = signUpForm["sign-password"].value;
    
    auth.createUserWithEmailAndPassword(email,password).then(()=>{
        let dialog = document.querySelector(".sign-up-modal");
        dialog.close();
        signUpForm.reset();
        /*logout.style.display='inline';
        management.style.display="flex";
        headerText.innerText=`Welcome ${userName}!`;
        headerText.style.fontSize='60px';*/
    }).catch((error)=>{
        console.log(error.message);
        errorMessage.innerText=error.message;
    })
})

logout.addEventListener("click",e =>{
    e.preventDefault();
    auth.signOut();
})

loginForm.addEventListener("submit",e =>{
    e.preventDefault();
    const email = loginForm["login-account"].value;
    const password = loginForm["login-password"].value;

    auth.signInWithEmailAndPassword(email,password);
        //找@前的字串當名字
     
})

addNewCardBtn.addEventListener("click",e=>{
    e.preventDefault();
    let dialog = document.querySelector(".add-new-card-modal");
    dialog.showModal();
})

