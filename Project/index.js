let todoList = [];
function addTask(task) {
    const todo = {
        task,
        status: false,
        id: function() {
            for (let i = 0; i < id.length; i++) {
                return id[i]++;
            }
        }
    };
    todoList.push(todo);
    console.log(todo);
}
