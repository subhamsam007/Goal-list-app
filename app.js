const goalform = document.querySelector("form");
const goalinput = document.getElementById("todo-input");
const goalullist = document.getElementById("todolist");

let alltask = getGoals();
updateGoals();

goalform.addEventListener("submit", (e) => {
    e.preventDefault();
    addgoals();
    saveGoals();
    updateGoals();
});

// Adding a function for a goal
function addgoals() {
    const inputvalue = goalinput.value.trim();
    if (inputvalue.length > 0) {
        const goalsobject={
            text:inputvalue,
            completed:false
        }
        alltask.push(goalsobject);
        goalinput.value = '';
        saveGoals();
        updateGoals();
    }
}

// Update goals in the NEW LIST
function updateGoals() {
    goalullist.innerHTML = ""; // Clear the list
    alltask.forEach((todo, todoindex) => {
        const todoItem = createGoalitem(todo, todoindex);
        goalullist.append(todoItem); // Append to the ul element
    });
}

function createGoalitem(todo, todoindex) {
    const todoId="todo-"+todoindex;
    const todoText=todo.text;
    const newitem = document.createElement("li");
    newitem.className="todo";
    newitem.innerHTML=`<input type="checkbox" name="" id="${todoId}">
                        <label for="${todoId}" class=" custom-checkbox">
                            <svg fill="transperent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                        </label>
                        <label for="${todoId}" class="todo-text">${todoText}</label>
                        <button class="delete-button">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EFEFEF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                        </button>`
    const deleteGoals=newitem.querySelector(".delete-button");
    deleteGoals.addEventListener("click",()=>{
        deleteGoalsAll(todoindex);
    });
    const tickbox=newitem.querySelector("input");
    tickbox.addEventListener("change",()=>{
        alltask[todoindex].completed= tickbox.checked;
        saveGoals();
    });
    tickbox.checked=todo.completed;                   
    return newitem;
}
//now make a function where we can delete the task we wwant 
function deleteGoalsAll(todoindex){
    alltask=alltask.filter((_,i)=> i!==todoindex);
    saveGoals();
    updateGoals();
}
// now to save in the local storage 
function saveGoals(){
    const changestring=JSON.stringify(alltask);
    localStorage.setItem("goals",changestring);
}
// now to get the save task from the local storage ;
function getGoals(){
    return JSON.parse(localStorage.getItem("goals") || '[]');
    
}


///for color to change inthe background when clicked

const button=document.querySelector(".btn")
const body=document.querySelector("#main-body")
const r=document.querySelector(".rgb")

const randomColour=function(){
   const red= Math.floor(Math.random()*256)
   const green= Math.floor(Math.random()*256)
   const blue= Math.floor(Math.random()*256)
   const random= `rgb(${red},${blue},${green})`
   return random
}
button.addEventListener("click",function(){
    const randoms1=randomColour();
    const randoms2=randomColour();
    const deg=Math.floor(Math.random()*361)
    const grident=`linear-gradient(${deg}deg, ${randoms1},${randoms2})`;

    body.style.background=grident;
    // r.textContent=grident
});
