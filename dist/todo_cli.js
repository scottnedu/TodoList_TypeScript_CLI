"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
class TodoList {
    constructor() {
        this.todos = [];
        this.nextId = 1;
    }
    // Add a new todo
    addTodo(task, dueDate) {
        const newTodo = {
            id: this.nextId++,
            task,
            completed: false,
            dueDate,
        };
        this.todos.push(newTodo);
        console.log('Todo added successfully!');
    }
    // Mark a todo as completed
    completeTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = true;
            console.log('Todo marked as completed!');
        }
        else {
            console.log(`Todo with ID ${id} not found.`);
        }
    }
    // Update a todo's task or due date
    updateTodoTask(id, newTask, newDueDate) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            if (newTask)
                todo.task = newTask;
            if (newDueDate)
                todo.dueDate = newDueDate;
            console.log('Todo updated successfully!');
        }
        else {
            console.log(`Todo with ID ${id} not found.`);
        }
    }
    // Remove a todo
    removeTodo(id) {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter(todo => todo.id !== id);
        if (this.todos.length === initialLength) {
            console.log(`Todo with ID ${id} not found.`);
        }
        else {
            console.log('Todo removed successfully!');
        }
    }
    // Filter todos by completion status
    filterTodos(completed) {
        return this.todos.filter(todo => todo.completed === completed);
    }
    // Clear completed todos
    clearCompletedTodos() {
        this.todos = this.todos.filter(todo => !todo.completed);
        console.log('Completed todos cleared!');
    }
    // Display all todos
    getTodos() {
        if (this.todos.length === 0) {
            console.log('No todos found.');
        }
        else {
            console.log('Your Todos:');
            this.todos.forEach(todo => {
                console.log(`ID: ${todo.id}, Task: ${todo.task}, Completed: ${todo.completed}, Due Date: ${todo.dueDate.toISOString().split('T')[0]}`);
            });
        }
        console.log(''); // Add a line space
    }
}
// Create an instance of TodoList
const todoList = new TodoList();
// Main menu
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const { action } = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View Todos',
                    'Add Todo',
                    'Complete Todo',
                    'Update Todo',
                    'Remove Todo',
                    'Filter Todos (Completed/Incomplete)',
                    'Clear Completed Todos',
                    'Exit',
                ],
            },
        ]);
        switch (action) {
            case 'View Todos':
                todoList.getTodos();
                break;
            case 'Add Todo':
                yield addTodo();
                break;
            case 'Complete Todo':
                yield completeTodo();
                break;
            case 'Update Todo':
                yield updateTodo();
                break;
            case 'Remove Todo':
                yield removeTodo();
                break;
            case 'Filter Todos (Completed/Incomplete)':
                yield filterTodos();
                break;
            case 'Clear Completed Todos':
                todoList.clearCompletedTodos();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit(0);
        }
        mainMenu(); // Show the menu again
    });
}
// Add a todo
function addTodo() {
    return __awaiter(this, void 0, void 0, function* () {
        const { task, dueDate } = yield inquirer_1.default.prompt([
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
    });
}
// Complete a todo
function completeTodo() {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the ID of the todo to complete:',
            },
        ]);
        todoList.completeTodo(Number(id));
    });
}
// Update a todo
function updateTodo() {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, newTask, newDueDate } = yield inquirer_1.default.prompt([
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
    });
}
// Remove a todo
function removeTodo() {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the ID of the todo to remove:',
            },
        ]);
        todoList.removeTodo(Number(id));
    });
}
// Filter todos
function filterTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        const { filterType } = yield inquirer_1.default.prompt([
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
        }
        else {
            console.log(`${filterType} Todos:`);
            filteredTodos.forEach(todo => {
                console.log(`ID: ${todo.id}, Task: ${todo.task}, Completed: ${todo.completed}, Due Date: ${todo.dueDate.toISOString().split('T')[0]}`);
            });
        }
        console.log(''); // Add a line space
    });
}
// Start the CLI app
mainMenu();
