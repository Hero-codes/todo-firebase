import React, { useEffect } from 'react';
import { db, auth } from "../firebase"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {

    const navigate = useNavigate();

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [todos, setTodos] = React.useState([]);

    const ref = collection(db, "todos")

    const addBtn = async () => {
        try {
            if (title && description) {
                await addDoc(ref, {
                    title,
                    description,
                    createdAt: serverTimestamp(),
                    author: {
                        name: auth.currentUser.email,
                        id: auth.currentUser.uid
                    }
                })
                setDescription("");
                setTitle("");
            } else {
                alert("Fill In The Values first!")
            }
        } catch (error) {
            console.log(error);
        };
    };

    const deletebtn = async (id) => {
        try {
            const deleteref = doc(db, "todos", id);
            await deleteDoc(deleteref)
        } catch (error) {
            console.log(error);
        }
    };

    const q = query(ref, orderBy('createdAt'));

    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
    }, []);

    useEffect(() => {
        if (props.isAuth === false) {
            navigate("/signup")
        }
    }, [])

    return (
        <div className='homePage'>
            <div className="addtodo">
                <h3>Add Your Todo</h3>
                <input
                    type="text"
                    placeholder='Title...'
                    value={title}
                    onChange={e => setTitle(e.target.value)} />
                <textarea
                    type="text"
                    placeholder='Description...'
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
                <button onClick={addBtn}>Add To Do</button>
            </div>

            <div className="display-todos">
                {
                    todos.map((todo, index) => {
                        return (
                            props.isAuth && todo.author.id === auth.currentUser.uid && (
                                <div key={index} className="todo">
                                    <h3>{todo.title}</h3>
                                    <p>{todo.description}</p>
                                    {
                                        props.isAuth && todo.author.id === auth.currentUser.uid && (<footer onClick={() => deletebtn(todo.id)}>&#128465;</footer>)
                                    }
                                </div>
                            )
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home