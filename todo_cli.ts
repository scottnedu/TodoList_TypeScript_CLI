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

  getTodoById(id: number): TodoItemWithDueDate | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  addTodo(task: string, dueDate: Date): void {
    const newTodo: TodoItemWithDueDate = {
      id: this.nextId++,
      task,
      completed: false,
      dueDate,
    };
    this.todos.push(newTodo);
    const greenText = '\x1b[32m';
    const resetText = '\x1b[0m';
    console.log('');
    console.log(`${greenText}Todo added successfully!${resetText}`);
    console.log('');
  }

  completeTodo(id: number): void {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = true;
      console.log('');
      console.log('Todo marked as completed ✅!');
      console.log('');
    } else {
       const redText = '\x1b[31m';
       const resetText = '\x1b[0m';
      console.log('');
      console.log(`${redText}Todo with ID ${id} not found.${resetText}`);
      console.log('');
    }
  }

  removeTodo(id: number): void {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id !== id);
    if (this.todos.length === initialLength) {
      const redText = '\x1b[31m';
      const resetText = '\x1b[0m';
      console.log('');
      console.log(`${redText}Todo with ID ${id} not found.${resetText}`);
      console.log('');
    } else {
      const greenText = '\x1b[32m';
      const resetText = '\x1b[0m';
      console.log('');
      console.log(`${greenText}Todo removed successfully!${resetText}`);
      console.log('');
    }
  }

   listTodos(): void {
    if (this.todos.length === 0) {
      const redText = '\x1b[31m';
      const resetText = '\x1b[0m';
      console.log('');
      console.log(`${redText}No Todo's Found!${resetText}`);
      console.log('');
    } else {
      const greenText = '\x1b[32m';
      const resetText = '\x1b[0m';
      console.log('');
      console.log(`${greenText}Your Todo's: ${resetText}`);
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
      const greenText = '\x1b[32m';
      const resetText = '\x1b[0m';
      console.log('');
      console.log(`${greenText}Todo updated successfully${resetText}`);
      console.log('');
    } else {
      const redText = '\x1b[31m';
      const resetText = '\x1b[0m';
      console.log('');
      console.log(`${redText}Todo with ID ${id} not found.${resetText}`);
      console.log('');
    }
  }

  clearCompletedTodos(): void {
    const completedTodos = this.todos.filter(todo => todo.completed);
    if (completedTodos.length === 0) {
      const redText = '\x1b[31m';
      const resetText = '\x1b[0m';
      console.log('');
      console.log(`${redText}No completed todos to clear.${resetText}`);
      console.log('');
      return;
    }
  
    this.todos = this.todos.filter(todo => !todo.completed);
    const greenText = '\x1b[32m';
    const resetText = '\x1b[0m';
    console.log('');
    console.log(`${greenText}Completed todos cleared successfully!${resetText}`);
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

async function addTodo() {
  const { task, dueDate } = await inquirer.prompt([
    {
      type: 'input',
      name: 'task',
      message: 'Enter the task:',
      validate: (input) => {
        if (typeof input !== 'string' || input.trim().length === 0) {
          return 'Task cannot be empty. Please enter a valid task.';
        }
        const stringRegex = /^[A-Za-z\s.,!?']+$/;
        if (!stringRegex.test(input)) {
          return 'Task must be a valid string (letters, spaces, and basic punctuation only).';
      }
      return true;
      },
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
  const { id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter the ID of the todo to update:',
    },
  ]);
  const todo = todoList.getTodoById(Number(id));
  if (!todo) {
    const redText = '\x1b[31m';
    const resetText = '\x1b[0m';
    console.log('');
    console.log(`${redText}Todo with ID ${id} not found.${resetText}`);
    console.log('');
    return;
  }
  const { newTask, newDueDate } = await inquirer.prompt([
    {
      type: 'input',
      name: 'newTask',
      message: 'Enter the new task (leave blank to keep current):',
      validate: (input) => {
        if (typeof input !== 'string' || input.trim().length === 0) {
          return 'Task cannot be empty. Please enter a valid task.';
        }
        const stringRegex = /^[A-Za-z\s.,!?']+$/;
        if (!stringRegex.test(input)) {
          return 'Task must be a valid string (letters, spaces, and basic punctuation only).';
      }
      return true;
      },
    },
    {
      type: 'input',
      name: 'newDueDate',
      message: 'Enter the new due date (YYYY-MM-DD, leave blank to keep current):',
      
    },
  ]);
  todoList.updateTodoTask(Number(id), newTask || undefined, newDueDate ? new Date(newDueDate) : undefined);
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
    console.log(`Goodbye! Please give me 10 nah, I have never had 10 before 🍻 🥂 `);
    process.exit(0);
  } else {
    mainMenu();
  }
}

mainMenu();