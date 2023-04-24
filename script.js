const signInBtn = document.getElementById("sign-btn");
const addNewCardForm = document.getElementById("add-form");
let dialog = document.querySelector(".sign-up-modal");


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
    accountLabel.append(accountText,accountValue);
    passwordValue.setAttribute("type","password");
    passwordValue.setAttribute("disabled","true");
    passwordValue.value=password;
    passwordLabel.append(passwordText,passwordValue);
    editBtn.innerText='Edit';
    editBtn.setAttribute("data-type","edit");
    editBtn.onclick=()=>{
        let account = editBtn.previousElementSibling.previousElementSibling.previousElementSibling.children[0];
        let password = editBtn.previousElementSibling.previousElementSibling.children[0];
        account.removeAttribute("disabled");
        password.removeAttribute("disabled");
        editBtn.style.display='none';
        okBtn.style.display='inline';
    }
    deleteBtn.innerText='Delete';
    deleteBtn.setAttribute("data-type","delete");
    deleteBtn.onclick=()=>{
        let card = deleteBtn.parentElement;
        management.removeChild(card);
    }
    okBtn.innerText='Ok!!';
    okBtn.setAttribute("data-type","ok");
    okBtn.onclick=()=>{
        let account = okBtn.previousElementSibling.previousElementSibling.children[0];
        let password = okBtn.previousElementSibling.children[0];
        account.setAttribute("disabled","true");
        password.setAttribute("disabled","true");
        okBtn.style.display='none';
        editBtn.style.display='inline';
    }
    card.append(serviceName,accountLabel,passwordLabel,okBtn,editBtn,deleteBtn);
    management.append(card);
    addNewCardForm.reset();
    let dialog = document.querySelector(".add-new-card-modal");
    dialog.close();
})





