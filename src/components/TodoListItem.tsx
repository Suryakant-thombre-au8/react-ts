import React, {useState, useRef, useEffect} from 'react'
import { Todo } from '../models'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';



type Props = {
    todo: Todo,
    todos: Todo[]
    setTodos: (todos: Todo[]) => void
}

const TodoListItem:React.FC<Props> = ({todo, setTodos, todos}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      inputRef.current?.focus()
    }, [edit])
    
    const handleDone = (id: number) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
          )
        );
      };

      const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
          todos.map((todo) =>
            todo.id === id? {
            ...todo,
              todo: editTodo
            } : todo
          )
        );
        setEdit(false);
      }

      const handleDelete = (id: number) => {
        setTodos(
          todos.filter((todo) => todo.id!== id)
        );
      };

  return (
    <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
        {
            edit? (
                <input
                ref={inputRef}
                className='todos__single--text'
                type='text'
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                />
            ) : (
                
                    todo.isDone? (
                        <s className='todos__single--text'>{todo.todo}</s>
                        ) : (
                    <span className='todos__single--text'>{todo.todo}</span>
                    )  
                
            )   
        }
        
        <div>
            <span className="icon" 
            onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
                <AiFillEdit />
            </span>
            <span className="icon" onClick={()=>handleDelete(todo.id)}>
                <AiFillDelete />
            </span>
            <span className="icon" onClick={()=>handleDone(todo.id)}>
                <MdDone />
            </span>
        </div>
    </form>
  )
}

export default TodoListItem