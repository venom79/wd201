const todoList = require("../todo");

const {all,markAsComplete,add} = todoList();

describe("todoList test suite",()=>{
    beforeAll(()=>{
        add({
            title : "test todo",
            completed : false,
            dueDate : new Date().toISOString().slice(0,10),
        });
    })
    test("should add new todo",()=>{
        const todoItemCounnt = all.length;
        add({
            title : "test todo",
            completed : false,
            dueDate : new Date().toISOString().slice(0,10),
        });
        expect(all.length).toBe(todoItemCounnt+1);
    })
    test("should mark a todo as complete",()=>{
        expect(all[0].completed).toBe(false);        
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    })
})