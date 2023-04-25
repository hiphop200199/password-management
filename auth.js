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
        db.collection("users").doc(user.uid).collection("cards").onSnapshot(snapshot =>{
            mapCardsToUI(snapshot.docs)
            let okBtns = document.querySelectorAll("[data-type=ok]");
            let deleteBtns = document.querySelectorAll("[data-type=delete]");
            
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
                       okBtns[i].style.display='none';
                        okBtns[i].nextElementSibling.style.display='inline';
                }

                

               
            } 
            for(let i=0;i<deleteBtns.length;i++){
                deleteBtns[i].onclick=function(){
                    db.collection("users").doc(user.uid).collection("cards").doc(deleteBtns[i].parentElement.id).delete()
                }

                

               
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
        
        addNewCardForm.addEventListener("submit",e =>{
            e.preventDefault();
            console.log(user.uid);
            const service = addNewCardForm["new-service"].value;
            const email = addNewCardForm["new-account"].value;
            const password = addNewCardForm["new-password"].value;
            /*let card = document.createElement("div");
            let serviceName = document.createElement("h2");
            let accountLabel = document.createElement("label");
            let passwordLabel = document.createElement("label");
            let accountValue = document.createElement("input");
            let passwordValue = document.createElement("input");
            let editBtn = document.createElement("button");
            let deleteBtn = document.createElement("button");
            let okBtn =document.createElement("button");
            let accountText =document.createTextNode('account:');
            let passwordText =document.createTextNode('password:');
            card.classList.add("card");
            card.id=service;
            serviceName.classList.add("service");
            serviceName.innerText=service;
            accountValue.setAttribute("type","text");
            accountValue.setAttribute("disabled","true");
            accountValue.value=email;
            accountLabel.append(accountText,accountValue);
            passwordValue.setAttribute("type","password");
            passwordValue.setAttribute("disabled","true");
            passwordValue.value=password;
            passwordLabel.append(passwordText,passwordValue);
            editBtn.innerText='Edit';
            editBtn.setAttribute("data-type","edit");
            editBtn.setAttribute("onclick",`editCard(${service})`);
            deleteBtn.innerText='Delete';
            deleteBtn.setAttribute("data-type","delete");
            deleteBtn.setAttribute("onclick",`deleteCard(${service})`);
            okBtn.innerText='Ok!!';
            okBtn.setAttribute("data-type","ok");
            okBtn.setAttribute("onclick",`ok(${service})`);
            card.append(serviceName,accountLabel,passwordLabel,okBtn,editBtn,deleteBtn);
            management.append(card);*/
            addNewCardForm.reset();
            let dialog = document.querySelector(".add-new-card-modal");
            dialog.close();
         return   db.collection("users").doc(user.uid).collection("cards").doc(service).set({
                service:service,
                account:email,
                password:password
            });
        })
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



