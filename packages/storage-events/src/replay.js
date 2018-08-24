function replay(events) {
  const todos = events.reduce((todos, event) => {
    if (event.event === "ADDED_TODO") {
      return addTodo(todos, event.data);
    } else if (event.event === "REMOVED_TODO") {
      return removeTodo(todos, event.data);
    } else if (event.event === "CHANGED_TODO") {
      return changedTodo(todos, event.data);
    }
    return todos;
  }, []);
  return { todos };
}

function addTodo(todos, todoToAdd) {
  if (todoToAdd.parentId) {
    return todos.map(todo => appendChild(todo, todoToAdd));
  }
  return [...todos, todoToAdd];
}

function appendChild(todo, todoToAdd) {
  if (todoToAdd.parentId === todo.id) {
    return {
      ...todo,
      children: [...(todo.children || []), todoToAdd]
    };
  } else if (todo.children && todo.children.length) {
    const mappedChildren = todo.children.map(child => appendChild(child, todoToAdd));
    return {
      ...todo,
      children: [...mappedChildren]
    };
  }
  return todo;
}

function changedTodo(todos, data) {
  return todos.map(todo => {
    if (data.id === todo.id) {
      return editTodo(todo, data);
    } else {
      return {
        ...todo,
        children: changedTodo(todo.children, data)
      };
    }
  });
}

function editTodo(todo, data) {
  return {
    ...todo,
    ...data
  };
}

function removeTodo(todos, data) {
  return todos.reduce(removeTodoInListOrChildren, []);

  function removeTodoInListOrChildren(todos, todo) {
    if (todo.id === data.id) {
      return todos;
    }
    if (todo.children) {
      todo.children = todo.children.reduce(removeTodoInListOrChildren, []);
    }
    return [...todos, todo];
  }
}

module.exports = replay;
