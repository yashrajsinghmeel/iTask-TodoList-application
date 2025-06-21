import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [todo, setTodo] = useState(""); // This is a input text, which is being created or edited.
  const [todos, setTodos] = useState([]); // This is an array of all the todo.
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  // Only save to localStorage when todos actually exist and after initial load
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h1 className="font-bold text-center text-xl">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-white w-full rounded-lg px-5 py-2"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm text-white rounded-md"
            disabled={todo.length <= 3}
          >
            Save
          </button>
        </div>
        <input
        className="my-4"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          name=""
          id=""
        />{" "}
        Show Finished
        <hr />
        <h2 className="text-lg font-bold my-4">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo my-3 flex  justify-between"
                >
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm text-white rounded-md mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
