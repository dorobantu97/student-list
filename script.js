//todo:load cards
//functie ce creaza un card
//primeste ca paramtru  o persoana si returneaza un card

//===============FUNCTIONS=========================

function loadUsers(users) {
   let container = document.querySelector(".student-list");
   container.innerHTML = ``;
   let usersDisplay = pagination(users);
   usersDisplay.forEach(user => {
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
          </div>
          <div class="joined-details">
            <span class="date">${user.registered.date}</span>
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

//===============SELECTORS & EVENT LISTENERS=========================

let card = document.querySelector(".student-item");
let searchBtn = document.querySelector("#search-btn");
let searchInpt = document.querySelector("#search-inpt");
let btn = document.querySelector(".button");
let ul = document.querySelector(".link-list");
let page = 1;
let usersPerPage = 5;

loadUsers(data);

buttons(data);

searchInpt.addEventListener("input", () => {
   
   loadUsers(searchStudents(data, searchInpt.value));
});

ul.addEventListener("click", (e) => {
  
   let obj = e.target;

   page = obj.textContent;

   loadUsers(data);
});
