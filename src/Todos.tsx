import { signal, effect } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 11);
};

const getData = () => {
  const value = localStorage.getItem("todos");
  if (value === null) return [];
  return JSON.parse(value);
};

export const todos = signal(getData());
const inputValue = signal("");

effect(() => {
  localStorage.setItem("todos", JSON.stringify(todos.value));
});

export type TodoType = {
  id: string,
  name: string,
  isCompleted: boolean
}

export const setInputValue = (value: string) => {
  inputValue.value = value;
}

const addTodo = (e: React.MouseEvent) => {
  if (inputValue.value === "") return;
  e.preventDefault();
  todos.value = [
    ...todos.value,
    { id: generateUniqueId(), name: inputValue.value, isCompleted: false },
  ];
  inputValue.value = "";
};

const deleteTodo = (id: string) => {
  todos.value = todos.value.filter((todo: TodoType) => todo.id !== id);
}

const onTodoChange = (e: React.ChangeEvent<HTMLInputElement>, todo: TodoType) => {
  const isCompleted = e.target.checked;
  todos.value = todos.value.map((t: TodoType) => {
    if (t.id === todo.id) {
      return { ...t, isCompleted };
    }
    return t;
  });
};

const Todos = () => {
  useSignals();

  console.log("Todos rerenderd");
  return (
    <>
      <div className="max-w-500 flex-center gap-5">
        <div>
          <label className="label">
            <span className="label-text">Enter Todo</span>
          </label>
          <input
            className="input"
            type="text"
            value={inputValue.value}
            onChange={(e) => (inputValue.value = e.target.value)}
          />
        </div>
        <button className={`submit-btn ${!inputValue.value && "disabled"}`} onClick={addTodo}>
          Add
        </button>
      </div>

      <h2>Todos</h2>
      {todos.value.map((todo: TodoType) => (
        <div key={todo.id} className="flex-center">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={(e) => onTodoChange(e, todo)}
          />
          <p>{todo.name}</p>
          <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
            X
          </button>
        </div>
      ))}
    </>
  );
};

export default Todos;
