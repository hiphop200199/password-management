const signInBtn = document.getElementById("sign-btn");
const addNewCardForm = document.getElementById("add-form");
let dialog = document.querySelector("#sign-up-modal");
let editButton = document.querySelectorAll("[data-type=edit]");
let deleteButton = document.querySelectorAll("[data-type=delete]");
let okButton = document.querySelectorAll("[data-type=ok]");

signInBtn.addEventListener("click",()=>{
    dialog.showModal();
})

addNewCardForm.addEventListener("submit",e =>{
    e.preventDefault();
    const service = addNewCardForm["new-service"].value;
    const email = addNewCardForm["new-account"].value;
    const password = addNewCardForm["new-password"].value;
    let card = document.createElement("div");
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
    serviceName.classList.add("service");
    serviceName.innerText=service;
    accountValue.setAttribute("type","text");
    accountValue.setAttribute("disabled","true");
    accountValue.value=email;
    accountValue.onblur=()=>{
        this.setAttribute("disabled","true");
    }
    accountLabel.append(accountText,accountValue);
    passwordValue.setAttribute("type","password");
    passwordValue.setAttribute("disabled","true");
    passwordValue.value=password;
    passwordValue.onblur=()=>{
        this.setAttribute("disabled","true");
    }
    passwordLabel.append(passwordText,passwordValue);
    editBtn.innerText='Edit';
    editBtn.setAttribute("data-type","edit");
    deleteBtn.innerText='Delete';
    deleteBtn.setAttribute("data-type","delete");
    okBtn.innerText='Ok!';
    okBtn.setAttribute("data-type","ok");
    card.append(serviceName,accountLabel,passwordLabel,okBtn,editBtn,deleteBtn);
    management.append(card);
    addNewCardForm.reset();
    let dialog = document.querySelector(".add-new-card-modal");
    dialog.close();
})

for (let i=0;i<deleteButton.length;i++){
    deleteButton[i].addEventListener("click",()=>{
        let card = deleteButton[i].parentElement;
        management.removeChild(card);
    })
}

for (let i=0;i<editButton.length;i++){
    editButton[i].addEventListener("click",()=>{
        let account = editButton[i].previousElementSibling.previousElementSibling.previousElementSibling.children[0];
        let password = editButton[i].previousElementSibling.previousElementSibling.children[0];
        account.removeAttribute("disabled");
        password.removeAttribute("disabled");
        editButton[i].style.display='none';
        okButton[i].style.display='inline';
    })
}

for(let i=0;i<okButton.length;i++){
    okButton[i].addEventListener("click",()=>{
        let account = okButton[i].previousElementSibling.previousElementSibling.children[0];
        let password = okButton[i].previousElementSibling.children[0];
        account.setAttribute("disabled","true");
        password.setAttribute("disabled","true");
        okButton[i].style.display='none';
        editButton[i].style.display='inline';
    })
}