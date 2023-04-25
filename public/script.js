const signInBtn = document.getElementById("sign-btn");
let dialog = document.querySelector(".sign-up-modal");



signInBtn.addEventListener("click",()=>dialog.showModal())


addNewCardBtn.addEventListener("click",e=>{
    e.preventDefault();
    let dialog = document.querySelector(".add-new-card-modal");
    dialog.showModal();
})







function editCard(cardId){
    let account = cardId.children[1].children[0];
    let password = cardId.children[2].children[0];
        account.removeAttribute("disabled");
        password.removeAttribute("disabled");
        cardId.children[4].style.display='none';
        cardId.children[3].style.display='inline';
}




function mapCardsToUI(data){
    management.innerHTML=data.map(doc =>{
        let {service,account,password} = doc.data();
        return(`
        
        <div class="card" id="${doc.id}">
          <h2 class="service">${service}</h2>
          <label>account:<input type="text" disabled value="${account}" /></label>
          <label>password:<input type="password" disabled value="${password}" /></label>
          <button data-type="ok">Ok!!</button>
          <button data-type="edit" onclick="editCard(${doc.id})">Edit</button>
          <button data-type="delete">Delete</button>
        </div>
        
        `)
    }).join("")
}