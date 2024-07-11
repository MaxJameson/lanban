function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id); 
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement);
}


function addTask(){
    const container = document.getElementById("col1");
    const task = document.createElement("p");
    console.log(document.getElementById("Input").value);
    task.textContent = document.getElementById("Input").value;
    task.className = "draggable-item";
    task.id = Math.floor(Math.random() * (1000 - 1) + 1).toString();
    task.draggable = "true";
    task.ondragstart = function(event){
        event.dataTransfer.setData("text/plain", event.target.id);
    };


    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {

        task.parentNode.removeChild(task);
    };

    task.appendChild(deleteButton);
    container.appendChild(task)
}


