//用下面這種方式找底下的元素更方便
const signUpForm = document.getElementById("sign-up-form");
let logout = document.querySelector(".logout");
let management = document.querySelector(".management");
signUpForm.addEventListener("submit",e=>{
    e.preventDefault();
    const email = signUpForm["sign-account"].value;
    const password = signUpForm["sign-password"].value;
    
    auth.createUserWithEmailAndPassword(email,password).then(cred=>{
        console.log(cred.user);
        let dialog = document.querySelector("dialog");
        dialog.close();
        signUpForm.reset();
        logout.style.display='inline';
        management.style.display="flex";
    })
})
logout.addEventListener("click",e =>{
    e.preventDefault();
    auth.signOut().then(()=>{
        logout.style.display='none';
        management.style.display='none';
    })
})