(function() {
document.addEventListener("DOMContentLoaded",function() {init();});
function init (){
    axios.get('/api/todo')
    .then((res) => addTodos(res.data))

    const ul = document.querySelector('.list');

    document.addEventListener('keypress', (e) => { 
        if (e.which == 13) {
            createTodo();
        }
    });

    document.addEventListener('click', (e) => {
        if(e.target.tagName != 'SPAN') return;
        let deletedTodo = e.target.closest('li');
        console.log(deletedTodo.id);
        let todoId = deletedTodo.id;
        axios.delete('/api/todo/'+ deletedTodo.id)
        .then((del) => deletedTodo.parentNode.removeChild(deletedTodo));
    })

    function addTodos(todos) {
        todos.forEach((todo) => addTodo(todo));
    }

    const addTodo = (todo) => {
            let newTodo = document.createElement('li');
            let span = document.createElement('span');
            span.innerText = 'X';
            newTodo.innerText = todo.name;
            newTodo.append(span);
            newTodo.classList.add('task');
            newTodo.setAttribute('id',todo._id);
            if (todo.completed) {
                newTodo.classList.add('done');
            }
            ul.append(newTodo);
        }

    function createTodo() {
        let newInput = document.querySelector('#todoInput');
        axios.post('/api/todo', {name: newInput.value})
        .then((newTodo) => {
            addTodo(newTodo.data);
            newInput.value = '';
        })
        .catch((err) => console.log(err));
    }
}

}());