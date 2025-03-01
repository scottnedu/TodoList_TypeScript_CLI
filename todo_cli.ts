import inquirer from 'inquirer';

interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

interface TodoItemWithDueDate extends TodoItem {
  dueDate: Date;
}

class TodoList {
  private todos: TodoItemWithDueDate[] = [];
  private nextId: number = 1;

  addTodo(task: string, dueDate: Date): void {
    const newTodo: TodoItemWithDueDate = {
      id: this.nextId++,
      task,
      completed: false,
      dueDate,
    };
    this.todos.push(newTodo);
    console.log('Todo added successfully!');
    console.log('');
  }

  completeTodo(id: number): void {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = true;
      console.log('Todo marked as completed ✅!');
      console.log('');
    } else {
      console.log(`Todo with ID ${id} not found.`);
      console.log('');
    }
  }

  removeTodo(id: number): void {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id !== id);
    if (this.todos.length === initialLength) {
      console.log(`Todo with ID ${id} not found.`);
      console.log('');
    } else {
      console.log('Todo removed successfully!');
      console.log('');
    }
  }

   listTodos(): void {
    if (this.todos.length === 0) {
      console.log('No todos found.');
      console.log('');
    } else {
      console.log('Your Todos:');
      console.log('');
      this.todos.forEach(todo => {
        console.log(
          `ID: ${todo.id}, Task: ${todo.task}, Completed: ${todo.completed}, Due Date: ${todo.dueDate.toISOString().split('T')[0]}`
        );
      });
    }
    console.log(''); 
  }

   filterTodos(completed: boolean): TodoItemWithDueDate[] {
    return this.todos.filter(todo => todo.completed === completed);
  }

  updateTodoTask(id: number, newTask?: string, newDueDate?: Date): void {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      if (newTask) todo.task = newTask;
      if (newDueDate) todo.dueDate = newDueDate;
      console.log('Todo updated successfully!');
      console.log('');
    } else {
      console.log(`Todo with ID ${id} not found.`);
      console.log('');
    }
  }

  clearCompletedTodos(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    console.log('Completed todos cleared!');
    console.log('');
  }
}

const todoList = new TodoList();

async function mainMenu() {
    console.log('What would you like to do?');
    console.log('1. Add Todo');
    console.log('2. Complete Todo');
    console.log('3. Remove Todo'); 
    console.log('4. List Todos'); 
    console.log('5. Filter Todos (Completed/Incomplete)'); 
    console.log('6. Update Todo');
    console.log('7. Clear Completed Todos');
    console.log('8. Exit\n');
  
    const { action } = await inquirer.prompt([
      {
        type: 'number',
        name: 'action',
        message: 'Enter the number of your choice:',
      },
    ]);

  switch (action) {
    case 1:
      await addTodo();
      break;
    case 2:
      await completeTodo();
      break;
    case 3:
      await removeTodo();
      break;
    case 4:
      todoList.listTodos();
      break;
    case 5:
      await filterTodos();
      break;
    case 6:
      await updateTodo();
      break;
    case 7:
      todoList.clearCompletedTodos();
      break;
    case 8:
      await confirmExit();
      break;
  }
  mainMenu();
}

async function confirmExit() {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you sure you want to exit?',
      default: false,
    },
  ]);

  if (confirm) {
    console.log('Goodbye! See you later.');
    process.exit(0);
  } else {
    mainMenu();
  }
}

async function addTodo() {
  const { task, dueDate } = await inquirer.prompt([
    {
      type: 'input',
      name: 'task',
      message: 'Enter the task:',
    },
    {
      type: 'input',
      name: 'dueDate',
      message: 'Enter the due date (YYYY-MM-DD):',
    },
  ]);
  todoList.addTodo(task, new Date(dueDate));
}

async function completeTodo() {
  const { id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID of the todo to complete:',
    },
  ]);
  todoList.completeTodo(Number(id));
}

async function removeTodo() {
    const { id } = await inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Enter the ID of the todo to remove:',
      },
    ]);
    todoList.removeTodo(Number(id));
  }

  async function filterTodos() {
    const { filterType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'filterType',
        message: 'Filter by:',
        choices: ['Completed', 'Incomplete'],
      },
    ]);
    const completed = filterType === 'Completed';
    const filteredTodos = todoList.filterTodos(completed);
  
    if (filteredTodos.length === 0) {
      console.log(`No ${filterType.toLowerCase()} todos found.`);
    } else {
      console.log(`${filterType} Todos:`);
      filteredTodos.forEach(todo => {
        console.log(
          `ID: ${todo.id}, Task: ${todo.task}, Completed: ${todo.completed}, Due Date: ${todo.dueDate.toISOString().split('T')[0]}`
        );
      });
    }
    console.log('');
  }

async function updateTodo() {
  const { id, newTask, newDueDate } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID of the todo to update:',
    },
    {
      type: 'input',
      name: 'newTask',
      message: 'Enter the new task (leave blank to keep current):',
    },
    {
      type: 'input',
      name: 'newDueDate',
      message: 'Enter the new due date (YYYY-MM-DD, leave blank to keep current):',
    },
  ]);
  const newDueDateParsed = newDueDate ? new Date(newDueDate) : undefined;
  todoList.updateTodoTask(Number(id), newTask || undefined, newDueDateParsed);
}

mainMenu();