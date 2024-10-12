/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("todoList test suite", () => {
  beforeAll(() => {
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
  });
  test("should add new todo", () => {
    const todoItemCounnt = all.length;
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoItemCounnt + 1);
  });
  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("should retrieve overdue item", () => {
    add({
      title: "overdue item",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    const overdueItem = overdue();
    expect(overdueItem.length).toBeGreaterThan(0);
    overdueItem.forEach((item) => {
      expect(item.dueDate < new Date().toISOString().slice(0, 10)).toBe(true);
    });
  });
  test("should retrieve due today item", () => {
    add({
      title: "due Today item",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    const dueTodayItem = dueToday();
    expect(dueTodayItem.length).toBeGreaterThan(0);
    dueTodayItem.forEach((item) => {
      expect(item.dueDate == new Date().toISOString().slice(0, 10)).toBe(true);
    });
  });
  test("should retrieve due later item", () => {
    add({
      title: "due later item",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });
    const dueLaterItem = dueLater();
    expect(dueLaterItem.length).toBeGreaterThan(0);
    dueLaterItem.forEach((item) => {
      expect(item.dueDate > new Date().toISOString().slice(0, 10)).toBe(true);
    });
  });
});
