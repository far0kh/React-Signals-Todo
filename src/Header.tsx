import { todos, TodoType } from "./Todos.jsx";
import { computed } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const completedTodos = computed(() => todos.value.filter((todo: TodoType) => todo.isCompleted))

const Header = () => {
  useSignals();

  console.log("Header rerendered");
  return (
    <header className="header">
      <div className="flex-between-center">
        <div className="logo">To-Do List</div>
        <div className="completed-todos">Completed Todos: {completedTodos.value.length}</div>
      </div>
    </header>
  );
};

export default Header;
