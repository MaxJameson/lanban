cols = ["col1","col2","col3"]

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
    actualTarget = event.target

    // this can be better
    while (!cols.includes(actualTarget.id)){
        console.log("Not main column")
        console.log(actualTarget.parentNode)
        console.log(actualTarget.parentNode.id)
        actualTarget = actualTarget.parentNode 
    }

    actualTarget.appendChild(draggedElement);
}

function createTask(colID){
    const container = document.getElementById(colID);
    const taskBox = document.createElement("div")
    taskBox.className = "task";
    // replaces by creating database element
    taskBox.id = Math.floor(Math.random() * (1000 - 1) + 1).toString();
    // then needs to assign input data to 
    taskBox.draggable = "true";
    taskBox.ondragstart = function(event){
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    

    const task = document.createElement("p");
    task.textContent = inputBox.value;
    
    taskBox.appendChild(task);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {

        taskBox.parentNode.removeChild(taskBox);
    };
    taskBox.appendChild(deleteButton);
    
    container.appendChild(taskBox);
}

function addTask(){

    inputBox = document.getElementById("Input");
    


    if (inputBox.value == ""){
        inputBox.classList.add('red-placeholder')
        inputBox.placeholder = "Please write a task"
    }
    else{

        createTask("col1")
        inputBox.value = "";
        inputBox.classList.remove('red-placeholder');
        inputBox.placeholder = "New task";
    };



}


