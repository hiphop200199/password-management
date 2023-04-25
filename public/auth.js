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
        //用onSnapshot即時監聽資料庫變化
        
        db.collection("users").doc(`${user.uid}`).collection("cards").onSnapshot(snapshot =>{
            mapCardsToUI(snapshot.docs)
            let okBtns = document.querySelectorAll("[data-type=ok]");
            let deleteBtns = document.querySelectorAll("[data-type=delete]");
            let addNewCardForm = document.getElementById("add-form");  
            for(let i=0;i<okBtns.length;i++){
                okBtns[i].onclick=function(){
                    let account = okBtns[i].parentElement.children[1].children[0];
                    let password = okBtns[i].parentElement.children[2].children[0];
                    db.collection("users").doc(user.uid).collection("cards").doc(okBtns[i].parentElement.id).update({
                        account:account.value,
                        password:password.value
                    })
                    
                        account.setAttribute("disabled","true");
                        password.setAttribute("disabled","true");
                        password.setAttribute("type","password");
                       okBtns[i].style.display='none';
                        okBtns[i].nextElementSibling.style.display='inline';
                }

                

               
            } 
            for(let i=0;i<deleteBtns.length;i++){
                deleteBtns[i].onclick=function(){
                    db.collection("users").doc(user.uid).collection("cards").doc(deleteBtns[i].parentElement.id).delete()
                }

                

               
            } 
            addNewCardForm.onsubmit=function(e){
                e.preventDefault();
                const service = addNewCardForm["new-service"].value;
                const email = addNewCardForm["new-account"].value;
                const password = addNewCardForm["new-password"].value;
                db.collection("users").doc(`${user.uid}`).collection("cards").doc(`${service}`).set({
                    service:service,
                    account:email,
                    password:password
                }).then(()=>{
                    addNewCardForm.reset();
                    let dialog = document.querySelector(".add-new-card-modal");
                    dialog.close();
                })
            }    
         })
        let userName =user.email.match(/.+(?=@)/i);
        loginForm.reset();
        loginForm.style.display="none";
        logout.style.display='inline';
        management.style.display='flex';
        addNewCardBtn.style.display='inline';
        headerText.innerText=`Welcome ${userName}!`;
        headerText.style.fontSize='60px';      
    }else{
        mapCardsToUI([])
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
    
    auth.createUserWithEmailAndPassword(email,password).then(user=>{
        db.collection("users").doc(user.user.uid).set({
            username:user.user.email.match(/.+(?=@)/i).toString()
        }).then(()=>{
                let dialog = document.querySelector(".sign-up-modal");
                dialog.close();
                signUpForm.reset();
            })
           
          
       
      
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



