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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = [];
        this.nextId = 1;
    }
    TodoList.prototype.getTodoById = function (id) {
        return this.todos.find(function (todo) { return todo.id === id; });
    };
    TodoList.prototype.addTodo = function (task, dueDate) {
        var newTodo = {
            id: this.nextId++,
            task: task,
            completed: false,
            dueDate: dueDate,
        };
        this.todos.push(newTodo);
        var greenText = '\x1b[32m';
        var resetText = '\x1b[0m';
        console.log('');
        console.log("".concat(greenText, "Todo added successfully!").concat(resetText));
        console.log('');
    };
    TodoList.prototype.completeTodo = function (id) {
        var todo = this.todos.find(function (todo) { return todo.id === id; });
        if (todo) {
            todo.completed = true;
            console.log('');
            console.log('Todo marked as completed ✅!');
            console.log('');
        }
        else {
            var redText = '\x1b[31m';
            var resetText = '\x1b[0m';
            console.log('');
            console.log("".concat(redText, "Todo with ID ").concat(id, " not found.").concat(resetText));
            console.log('');
        }
    };
    TodoList.prototype.removeTodo = function (id) {
        var initialLength = this.todos.length;
        this.todos = this.todos.filter(function (todo) { return todo.id !== id; });
        if (this.todos.length === initialLength) {
            var redText = '\x1b[31m';
            var resetText = '\x1b[0m';
            console.log('');
            console.log("".concat(redText, "Todo with ID ").concat(id, " not found.").concat(resetText));
            console.log('');
        }
        else {
            var greenText = '\x1b[32m';
            var resetText = '\x1b[0m';
            console.log('');
            console.log("".concat(greenText, "Todo removed successfully!").concat(resetText));
            console.log('');
        }
    };
    TodoList.prototype.listTodos = function () {
        if (this.todos.length === 0) {
            var redText = '\x1b[31m';
            var resetText = '\x1b[0m';
            console.log('');
            console.log("".concat(redText, "No Todo's Found!").concat(resetText));
            console.log('');
        }
        else {
            var greenText = '\x1b[32m';
            var resetText = '\x1b[0m';
            console.log('');
            console.log("".concat(greenText, "Your Todo's: ").concat(resetText));
            console.log('');
            this.todos.forEach(function (todo) {
                console.log("ID: ".concat(todo.id, ", Task: ").concat(todo.task, ", Completed: ").concat(todo.completed, ", Due Date: ").concat(todo.dueDate.toISOString().split('T')[0]));
            });
        }
        console.log('');
    };
    TodoList.prototype.filterTodos = function (completed) {
        return this.todos.filter(function (todo) { return todo.completed === completed; });
    };
    TodoList.prototype.updateTodoTask = function (id, newTask, newDueDate) {
        var todo = this.todos.find(function (todo) { return todo.id === id; });
        if (todo) {
            if (newTask)
                todo.task = newTask;
            if (newDueDate)
                todo.dueDate = newDueDate;
            var greenText = '\x1b[32m';
            var resetText = '\x1b[0m';
            console.log('');
            console.log("".concat(greenText, "Todo updated successfully").concat(resetText));
            console.log('');
        }
        else {
            var redText = '\x1b[31m';
            var resetText = '\x1b[0m';
            console.log('');
            console.log("".concat(redText, "Todo with ID ").concat(id, " not found.").concat(resetText));
            console.log('');
        }
    };
    TodoList.prototype.clearCompletedTodos = function () {
        this.todos = this.todos.filter(function (todo) { return !todo.completed; });
        var greenText = '\x1b[32m';
        var resetText = '\x1b[0m';
        console.log('');
        console.log("".concat(greenText, "Complete Todos cleared successfully").concat(resetText));
        console.log('');
    };
    return TodoList;
}());
var todoList = new TodoList();
function mainMenu() {
    return __awaiter(this, void 0, void 0, function () {
        var action, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('What would you like to do?');
                    console.log('1. Add Todo');
                    console.log('2. Complete Todo');
                    console.log('3. Remove Todo');
                    console.log('4. List Todos');
                    console.log('5. Filter Todos (Completed/Incomplete)');
                    console.log('6. Update Todo');
                    console.log('7. Clear Completed Todos');
                    console.log('8. Exit\n');
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'number',
                                name: 'action',
                                message: 'Enter the number of your choice:',
                            },
                        ])];
                case 1:
                    action = (_b.sent()).action;
                    _a = action;
                    switch (_a) {
                        case 1: return [3 /*break*/, 2];
                        case 2: return [3 /*break*/, 4];
                        case 3: return [3 /*break*/, 6];
                        case 4: return [3 /*break*/, 8];
                        case 5: return [3 /*break*/, 9];
                        case 6: return [3 /*break*/, 11];
                        case 7: return [3 /*break*/, 13];
                        case 8: return [3 /*break*/, 14];
                    }
                    return [3 /*break*/, 16];
                case 2: return [4 /*yield*/, addTodo()];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 4: return [4 /*yield*/, completeTodo()];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 6: return [4 /*yield*/, removeTodo()];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 8:
                    todoList.listTodos();
                    return [3 /*break*/, 16];
                case 9: return [4 /*yield*/, filterTodos()];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 11: return [4 /*yield*/, updateTodo()];
                case 12:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 13:
                    todoList.clearCompletedTodos();
                    return [3 /*break*/, 16];
                case 14: return [4 /*yield*/, confirmExit()];
                case 15:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 16:
                    mainMenu();
                    return [2 /*return*/];
            }
        });
    });
}
function addTodo() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, task, dueDate;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
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
                    ])];
                case 1:
                    _a = _b.sent(), task = _a.task, dueDate = _a.dueDate;
                    todoList.addTodo(task, new Date(dueDate));
                    return [2 /*return*/];
            }
        });
    });
}
function completeTodo() {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'input',
                            name: 'id',
                            message: 'Enter the ID of the todo to complete:',
                        },
                    ])];
                case 1:
                    id = (_a.sent()).id;
                    todoList.completeTodo(Number(id));
                    return [2 /*return*/];
            }
        });
    });
}
function removeTodo() {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'input',
                            name: 'id',
                            message: 'Enter the ID of the todo to remove:',
                        },
                    ])];
                case 1:
                    id = (_a.sent()).id;
                    todoList.removeTodo(Number(id));
                    return [2 /*return*/];
            }
        });
    });
}
function filterTodos() {
    return __awaiter(this, void 0, void 0, function () {
        var filterType, completed, filteredTodos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'list',
                            name: 'filterType',
                            message: 'Filter by:',
                            choices: ['Completed', 'Incomplete'],
                        },
                    ])];
                case 1:
                    filterType = (_a.sent()).filterType;
                    completed = filterType === 'Completed';
                    filteredTodos = todoList.filterTodos(completed);
                    if (filteredTodos.length === 0) {
                        console.log("No ".concat(filterType.toLowerCase(), " todos found."));
                    }
                    else {
                        console.log("".concat(filterType, " Todos:"));
                        filteredTodos.forEach(function (todo) {
                            console.log("ID: ".concat(todo.id, ", Task: ").concat(todo.task, ", Completed: ").concat(todo.completed, ", Due Date: ").concat(todo.dueDate.toISOString().split('T')[0]));
                        });
                    }
                    console.log('');
                    return [2 /*return*/];
            }
        });
    });
}
function updateTodo() {
    return __awaiter(this, void 0, void 0, function () {
        var id, todo, redText, resetText, _a, newTask, newDueDate;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'input',
                            name: 'id',
                            message: 'Enter the ID of the todo to update:',
                        },
                    ])];
                case 1:
                    id = (_b.sent()).id;
                    todo = todoList.getTodoById(Number(id));
                    if (!todo) {
                        redText = '\x1b[31m';
                        resetText = '\x1b[0m';
                        console.log('');
                        console.log("".concat(redText, "Todo with ID ").concat(id, " not found.").concat(resetText));
                        console.log('');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, inquirer_1.default.prompt([
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
                        ])];
                case 2:
                    _a = _b.sent(), newTask = _a.newTask, newDueDate = _a.newDueDate;
                    todoList.updateTodoTask(Number(id), newTask || undefined, newDueDate ? new Date(newDueDate) : undefined);
                    return [2 /*return*/];
            }
        });
    });
}
function confirmExit() {
    return __awaiter(this, void 0, void 0, function () {
        var confirm;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'confirm',
                            name: 'confirm',
                            message: 'Are you sure you want to exit?',
                            default: false,
                        },
                    ])];
                case 1:
                    confirm = (_a.sent()).confirm;
                    if (confirm) {
                        console.log("Goodbye! Please give me 10 nah, I have never had 10 before \uD83C\uDF7B \uD83E\uDD42 ");
                        process.exit(0);
                    }
                    else {
                        mainMenu();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
mainMenu();
