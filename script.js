//===============FUNCTIONS=========================

function loadUsers(users) {
   let container = document.querySelector(".student-list");
   container.innerHTML = ``;
   let usersDisplay = pagination(users);
   usersDisplay.forEach(user => {
      if(user)
   container.appendChild(createCard(user));
   })
}
function createCard(user) {
   let li = document.createElement("li");
   li.classList.add("student-item");
   li.classList.add("cf");

   li.innerHTML = `
   
   <div class="student-details">

         <img class="avatar" src="${user.picture.thumbnail}" alt="Profile Picture">
         <h3>${user.name.first} ${user.name.last}</h3>
         <span class="email">${user.email}</span>

         <div class="joined-details">
            <span class="date">${user.registered.date}</span>
         </div>
         
   </div>
   `;
   return li;
}
//functie ce primeste ca paramteru o lista de studenti si returneaza o lista cu 
//cu toti studentii ce verifica proprietatea 
function searchStudents(users,name) {
   name = name.trim();
   name = name.toLowerCase();
   let data=users.filter(user=>user.name.last.toLowerCase().includes(name)||user.name.first.toLowerCase().includes(name))
   return data;

}
function pagination(users) {
   
   let arr = []; ///////////// filtrare
   let start = (page - 1) * usersPerPage;
   let end = start + usersPerPage;
 
   for (let i = start; i < end; i++){
      
      arr.push(users[i]);
   }

   return arr;
}
function buttons() {

   let nrBtn = Math.ceil(data.length / usersPerPage);

   for (let i = 1; i <= nrBtn; i++){
    
      ul.appendChild(createButton(i));
   }}
function createButton( nr) {

   let li = document.createElement("li");
   let btn = document.createElement('button');

   btn.textContent = nr;

   btn.classList.add("button");

   li.appendChild(btn);
   return li;
}
//functie ce primeste ca parametru numele userului si returneaza obiectul din data
function findUser(first,last) {
   
   for (let i = 0; i < data.length; i++){
      if (data[i].name.first === first&&data[i].name.last===last) {  ///////////////////////// apelam name ->first & last name
         return data[i];
      }
   }
   return {};
}
//functie ce primeste ca parametru first si last si returneaza pozitia din data
function findUserPosition (first, last){
   for (let i = 0; i < data.length; i++){
      if (data[i].name.first === first && data[i].name.last === last) {
         return i;
      }
   }
   return -1;
}
function attachModal(user) {
   containerModal.innerHTML="";
   let div = document.createElement("div");
   div.classList.add("modal");
   div.innerHTML = `

      <div class="modal-content">        
          <i class="fa-solid fa-arrow-left back"></i>
          
          <li class="student-item cf profile-mod">
          

          <button class="closed"><i class="fa-solid fa-xmark"></i></button>

          <div class="student-details" >

              <img class="avatar" src="${user.picture.thumbnail}" alt="Profile Picture">
              <h3   class="name">${user.name.first} ${user.name.last}</h3>
              <span class="email">${user.email}</span>
            </div>

          <div class="joined-details">

            <span class="date">${user.registered.date}</span>
          </div>

          <div class="buttons-modal">
          
          <button class="deleteMod"><i class="fa-solid fa-trash"></i></button>
          <button class="editMod"><i class="fa-solid fa-user-pen"></i></button>

          </div>

        </li>

        <i class="fa-solid fa-arrow-right next"></i>

      </div>
 
      `;
   
   containerModal.appendChild(div);
}
function closeModal() {
   containerModal.innerHTML = "";
}


//===============SELECTORS & EVENT LISTENERS=========================

let containerModal = document.querySelector("#modal-container");
let card = document.querySelector(".student-item");
let container = document.querySelector(".student-list");
let searchBtn = document.querySelector("#search-btn");
let searchInpt = document.querySelector("#search-inpt");
let content = document.querySelector(".modal-content");
let btn = document.querySelector(".button");
let ul = document.querySelector(".link-list");
let closed = document.querySelector(".closed");
let deleteCard = document.querySelector(".delete");
let editCard = document.querySelector(".edit");
let emc = document.querySelector(".buttons-modal");
let page = 1;
let usersPerPage = 5;

loadUsers(data);
buttons(data);

searchInpt.addEventListener("input", () => {
   
   loadUsers(searchStudents(data, searchInpt.value));
});

ul.addEventListener("click", (e) => {
  
   let obj = e.target;
   if (obj.tagName == "BUTTON") {
      
      console.log(obj.textContent);
      page = +obj.textContent
      console.log(page);
      loadUsers(data);
   }
});

container.addEventListener("click", (e) => {
   let index = e.target;

   if (index.tagName == "H3") {
      console.log(index.textContent.split(" "));
      let first = index.textContent.split(" ")[0];
      let last = index.textContent.split(" ")[1];
      let user = findUser(first, last);
   
      attachModal(user);
   }
   
});

containerModal.addEventListener("click", (e) => {

   let arrow = e.target;

   if (arrow.classList.contains("next")) {
     let name = containerModal.querySelector(".name").textContent;
     let fname = name.split(" ")[0];
     let lname = name.split(" ")[1];
     let poz = findUserPosition(fname, lname);
     attachModal(data[poz + 1]);
   } else if (arrow.classList.contains("back")) {
     let name = containerModal.querySelector(".name").textContent;
     let fname = name.split(" ")[0];
     let lname = name.split(" ")[1];
     let left = findUserPosition(fname, lname);
     if (left > 0) {
       attachModal(data[left - 1]);
     }
   } else if (arrow.classList.contains("closed")) {
     closeModal();
   } else if (arrow.classList.contains("deleteMod")) {
     console.log("test-delete")
   } else if (arrow.classList.contains("editMod")) {
     console.log("test-edit")
   }
});

