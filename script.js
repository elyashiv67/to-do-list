let tasks;

async function getData(){
    let response = await fetch('/arr');
    let data = await response.json();
    tasks = data;
    creatTable(tasks);
}

function creatTable(arr){
    
    let line = "";
    for(let item of arr){
        if(item != null){
            line += "<tr>";
        // line += `<td>${item.id}</td>`;
        // line += `<td>${item.task}</td>`;
        // line += `<td>${item.description}</td>`;
        for(let index in item){
            if(index === "isDone") continue;
            line += `<td>${item[index]}</td>`;
        }
        line += `<td><button onclick="deleteRow(${item.id})"> 🗑 </button></td>`;
        line += `<td><button onclick="editTask(${item.id})"> ✏ </button></td>`;

        line += "</tr>";
    }
    
    document.getElementById("list").innerHTML = line;
}
}

async function addToData(){
    try{

        let task = document.getElementById("task").value;
        let description = document.getElementById("description").value;
        let obj = {task,description};
        let response = await fetch('/add',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(obj)
        });
        getData();
        document.getElementById("task").value = "";
        document.getElementById("description").value = "";
    }catch(err){
        alert(err)
    }
}

document.getElementById('add').addEventListener("click",btnChoose);

getData();


async function deleteRow(id){
    try{
        let response = await fetch('/delete',{
            method:'DELETE',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({id})
        });
        getData();


    // persons = persons.filter(obj=>obj.id != id);
    // addToTable(persons);
    // console.log(persons);

    }catch(err){
        alert(err);
    }
    
}


async function editTask(id){
    let response = await fetch(`/get/${id}`);
    let obj = await response.json();
    document.getElementById("id").value = obj.id;
    document.getElementById("task").value = obj.task;
    document.getElementById("description").value = obj.description;
}


async function BtnEdit(){
let id = document.getElementById("id").value;
let task = document.getElementById("task").value;
let description = document.getElementById("description").value;
let obj = {id,task,description};

let response = await fetch('/update',{
    method:'PATCH',
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({id,task,description})
});
console.log(JSON.stringify(obj));

getData();
document.getElementById("id").value = "";
document.getElementById("task").value = "";
document.getElementById("description").value = "";
}

function btnChoose(){
    if(document.getElementById("id").value == ""){
        addToData();
    }else{
        BtnEdit();

    }
}

