import { useState } from 'react';
import './App.css';

function App() {

    // define todos and dones arrays
    const [todos, setTodos] = useState(["todo 1", "todo 2"])
    const [dones, setDones] = useState(["done 1", "done 2"])

    // input value in from
    const [inputValue, setInputValue] = useState("")

    // filter for listing todos or dones or both 
    const [filter, setFilter] = useState("")

    // handling form submit
    const handleSubmit = (e) => {
        e.preventDefault()  // do not refresh the page
        if (inputValue) {
            setTodos([...todos, inputValue])
            setInputValue("")
        }
    }

    const removeFromTodos = (todo) => {
        if(todos.includes(todo)){
            setTodos([...todos.filter(x => x !== todo)])  // the todo item removed todos
        } else {
            setDones([...dones.filter(x => x !== todo)])  // the done item removed dones
        }
    }

    const toggle = (item) => {
        if(todos.includes(item)){
            setTodos([...todos.filter(x => item !== x)])  // the todo item removed todos
            setDones([item, ...dones])  // the todo item added dones
        } else {
            setDones([...dones.filter(x => item !== x)])  // the done item removed dones
            setTodos([...todos, item])     // the done item added todos
        }
    }


    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Yapılacakalar</h2>
                    <i id="todo-filter" className="far fa-square"></i>
                </div>

                <div className="card-body">
                    <ul className="todo-list">
                        {filter !== "dones" && todos.map(todo => {
                            return (
                                <div className='todo-item'>
                                    {todo}
                                    <div>
                                        <i className='fas fa-square' onClick={() => toggle(todo)}></i>
                                        <i className='fas fa-trash-alt'onClick={() => removeFromTodos(todo)} ></i>
                                    </div>
                                </div>
                            )
                        })}
                        {filter !== "actives" && dones.map(todo => {
                            return (
                                <div className='todo-item done'>
                                    {todo}
                                    <div>
                                        <i className='fas fa-square' onClick={() => toggle(todo)}></i>
                                        <i className='fas fa-trash-alt'onClick={() => removeFromTodos(todo)} ></i>
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="card-footer">
                        <input id="todo-input" type="text" placeholder="Yeni yapılacak.." className="todo-input" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                        <button type='submit' id="todo-button"><i className="fas fa-plus"></i></button>
                    </div>
                </form>

                <div className='filter'>
                    <div className={`all ${filter === "" && "selected-filter"}`} onClick={() => setFilter("")}>All</div>
                    <div className={`actives ${filter === "actives" && "selected-filter"}`} onClick={() => setFilter("actives")}>Actives</div>
                    <div className={`dones ${filter === "dones" && "selected-filter"}`} onClick={() => setFilter("dones")}>Dones</div>
                </div>
            </div>
        </div>
    );

}
export default App;
