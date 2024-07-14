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
        actualTarget = actualTarget.parentNode 
    }
    moveColumn(data,actualTarget.id.slice(-1))
    actualTarget.appendChild(draggedElement);
}


function moveColumn(ID,column){
    console.log(ID)
    const moveData = new FormData();

    moveData.append('id',ID);
    moveData.append('state',column);
    // uses fetch api to submit a php post request for the account information
    fetch("moveTask.php", {
        method: "post",
        body: moveData
    })    
}

function deleteTask(ID){
    console.log(ID)
    const toDelete = new FormData();

    toDelete.append('id',ID);
    // uses fetch api to submit a php post request for the account information
    fetch("deleteTask.php", {
        method: "post",
        body: toDelete
    })
}

async function postTask(name,details,state){
    // post to create a blank task

    const newTask = new FormData();

    newTask.append('name',name);
    newTask.append('details',details);
    newTask.append('state',state);
    newTask.append('created',new Date().toJSON().slice(0, 10));

    // uses fetch api to submit a php post request for the account information
    const response = await fetch("postTask.php", {
        method: "post",
        body: newTask
    })
    if (!response.ok){
        console.log(await response.text);
    }

    ID = await response.json();
    return ID
}

function createTask(colID,name,ID){
    const container = document.getElementById(colID);
    const taskBox = document.createElement("div")
    taskBox.className = "task";
    // replaces by creating database element
    taskBox.id = ID
    // then needs to assign input data to 
    taskBox.draggable = "true";
    taskBox.ondragstart = function(event){
        event.dataTransfer.setData("text/plain", event.target.id);
    }

    

    const task = document.createElement("p");
    task.textContent = name;
    
    taskBox.appendChild(task);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        deleteTask(taskBox.id)
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
        taskID = null
        postTask(inputBox.value,"work in progress",1).then(tID =>{
            taskID = tID
            createTask("col1",inputBox.value,taskID)
            inputBox.value = "";
            inputBox.classList.remove('red-placeholder');
            inputBox.placeholder = "New task";
        })

    };



}

async function fetchTasks(){
   // create a form to store user ID
 
    const response = await fetch('getTasks.php', {
    
        method: "post",
        body: ""
    });

    if (!response.ok){
        console.log(await response.text());
    }

    tasks = await response.json();
    return tasks
}

fetchTasks().then(tasks =>{
    for (task in tasks){
        taskData = tasks[task]
        cn = String(taskData.state)
        createTask("col"+cn,taskData.Name,taskData.taskID)
    }
})




