let tasks;

async function getData(){
    let response = await fetch('/arr');
    let data = await response.json();
    tasks = data;
    console.log(tasks);
}

function creatTable(arr){
    
    let line = "";
    for(let item of arr){
        if(item != null){
            line += "<tr>";
        for(let index in item){
            line += `<td>${item[index]}</td>`;

        }
        
        
        line += `<td><button onclick="deleteRow(${item.id})"> D </button></td>`;
        line += `<td><button onclick="editName(${item.id})"> E </button></td>`;

        line += "</tr>";
    }
    
    document.getElementById("list").innerHTML = line;
}
}



getData();
creatTable(tasks);