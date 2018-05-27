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
        if(e.target.tagName == 'SPAN') removeTodo(e.target.closest('li'));
        else if (e.target.tagName == 'LI') updateTodo(e.target);
    })

    const addTodos = (todos) => todos.forEach((todo) => addTodo(todo));

    const addTodo = (todo) => {
            let newTodo = document.createElement('li');
            let span = document.createElement('span');
            span.innerText = 'X';
            newTodo.innerText = todo.name;
            newTodo.append(span);
            newTodo.classList.add('task');
            newTodo.setAttribute('data-id',todo._id);
            if(todo.completed) newTodo.classList.add('done');
            ul.append(newTodo);
        }

    const createTodo = () => {
        let newInput = document.querySelector('#todoInput');
        axios.post('/api/todo', {name: newInput.value})
        .then((newTodo) => {
            addTodo(newTodo.data);
            newInput.value = '';
        })
        .catch((err) => console.log(err));
    }

    const removeTodo = (el) => {
            let todoId = el.dataset.id;
            axios.delete('/api/todo/'+ todoId)
            .then((del) => el.parentNode.removeChild(el))
            .catch((err) => {console.log(err)})
    }

    const updateTodo = (el) => {
            let url = '/api/todo/' + el.dataset.id;
            axios.get(url)
            .then((res) => res.data.completed)
            .then((done) => axios.put(url, {completed: !done}))
            .then(() => el.classList.toggle('done'))
        }
}

}());