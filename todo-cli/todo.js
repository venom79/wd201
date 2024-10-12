const todoList = () => {
  let all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter((item) => item.dueDate <= yesterday);
  };

  const dueToday = () => {
    return all.filter((item) => item.dueDate === today);
  };

  const dueLater = () => {
    return all.filter((item) => item.dueDate >= tomorrow);
  };

  const toDisplayableList = (list) => {
    return list
      .map((item) => {
        const status = item.completed ? "[x]" : "[ ]";
        return `${status} ${item.title} ${item.dueDate === today ? "" : item.dueDate}`;
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1)),
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1)),
);

const todos = todoList();
const list = [
  { title: "Task 1", completed: true, dueDate: today },
  { title: "Task 2", completed: false, dueDate: tomorrow },
  { title: "Task 3", completed: false, dueDate: yesterday },
];
console.log(todos.toDisplayableList(list));

module.exports = todoList;
