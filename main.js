const todos = JSON.parse (localStorage.getItem('todos')) || []; /* localstorage es para que no desaparezca. JSON.parse para convertir lo que añadamos en [] */

const render = () =>{
    const todoList = document.getElementById('todo-list');
    const todosTemplate = todos.map(t =>  '<li>' + t + '</li>'); /* map lo que hace es transformar lo que le introducimos por lo que este dentro del parentesis */
    todoList.innerHTML = todosTemplate.join('');
    const elementos = document.querySelectorAll('#todo-list li') /* para seleccionar los elementos que buscamos */
    elementos.forEach ((elemento, i) => {
      elemento.addEventListener('click', ()=> {
        elemento.parentNode.removeChild(elemento);/* para eliminar el hijo del elemento que clickemos */
        todos.splice(i, 1) /* eliminar el elemento del array para que cuando añadamos otra tarea no aparezca de nuevo */
        actualizaTodos(todos);/* para que no haya duplicidad y se repita las ordenes creamos la funcion */
        render();/* se llama de nuevo a la funcion para que cuando se ejecute se actualice todo */
      })
    })
}

const actualizaTodos = (todos) =>{
    const todoStrings = JSON.stringify(todos); /* esto para convertir lo añadido en un string */
    localStorage.setItem('todos',todoStrings);
    render();
}

window.onload= () =>{
  render(); /* este render es para que se renderice la pag nada mas entrar y asi todos los items del [todos] se muestren en pantalla */
  const form = document.getElementById('todo-form');
  form.onsubmit = (e) => {
    e.preventDefault();
    const todo = document.getElementById('todo');
    const todoText = todo.value;
    todo.value = '';
    todos.push(todoText);
    console.log(todoText);
    actualizaTodos(todos);

    render();

  }

}

render(); /* este render es para que se renderice la pag nada mas entrar y asi todos los items del [todos] se muestren en pantalla */
