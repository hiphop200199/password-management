const signInBtn = document.getElementById("sign-btn");
const addNewCardForm = document.getElementById("add-form");
let dialog = document.querySelector(".sign-up-modal");



signInBtn.addEventListener("click",()=>dialog.showModal())


addNewCardBtn.addEventListener("click",e=>{
    e.preventDefault();
    let dialog = document.querySelector(".add-new-card-modal");
    dialog.showModal();
})



addNewCardForm.addEventListener("submit",e =>{
    e.preventDefault();
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
    db.collection("cards").doc(service).set({
        service:service,
        account:email,
        password:password
    });
})


function ok(cardId){
    let account = cardId.children[1].children[0];
    let password = cardId.children[2].children[0];
        account.setAttribute("disabled","true");
        password.setAttribute("disabled","true");
        cardId.children[3].style.display='none';
        cardId.children[4].style.display='inline';
        db.collection("cards").doc(cardId.id).update({
            account:account.value,
            password:password.value
        })
}
function editCard(cardId){
    let account = cardId.children[1].children[0];
    let password = cardId.children[2].children[0];
        account.removeAttribute("disabled");
        password.removeAttribute("disabled");
        cardId.children[4].style.display='none';
        cardId.children[3].style.display='inline';
}

function deleteCard(cardId){
    //management.removeChild(cardId);
    db.collection("cards").doc(cardId.id).delete();
}

function mapCardsToUI(data){
    management.innerHTML=data.map(doc =>{
        let {service,account,password} = doc.data();
        return(`
        
        <div class="card" id="${doc.id}">
          <h2 class="service">${service}</h2>
          <label>account:<input type="text" disabled value="${account}" /></label>
          <label>password:<input type="password" disabled value="${password}" /></label>
          <button data-type="ok" onclick="ok(${doc.id})">Ok!!</button>
          <button data-type="edit" onclick="editCard(${doc.id})">Edit</button>
          <button data-type="delete" onclick="deleteCard(${doc.id})">Delete</button>
        </div>
        
        `)
    }).join("")
}