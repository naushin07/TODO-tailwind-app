import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) setTodos(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput("");
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "All") return true;
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
  });

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl p-8 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-md border border-white/40 text-black">
        <h1 className="text-4xl font-extrabold text-center mb-8">🚀 Manage Your Todos</h1>

        {/* Input & Add Button */}
        <div className="flex flex-col sm:flex-row mb-6 gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-4 text-xl rounded-xl bg-white shadow-inner text-black placeholder-gray-500 border border-gray-300"
            placeholder="Write your task here..."
          />
          <button
            onClick={addTodo}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl hover:from-green-500 hover:to-green-700 transition duration-300 shadow-lg"
          >
            Add Task
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {["All", "Active", "Completed"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === f
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-green-700 hover:bg-green-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <ul className="space-y-3">
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-4 rounded-xl shadow-md transition ${
                todo.completed
                  ? "bg-green-100 line-through text-gray-600"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                  className="w-5 h-5 accent-green-600"
                />
                <span className="text-lg">{todo.text}</span>
              </div>
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500 hover:text-red-700 text-xl"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
