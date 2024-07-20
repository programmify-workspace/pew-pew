import React,{ useState } from "react";

export default function Todo({ todo, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleUpdate = () => {
        onUpdate(todo.id, newTitle, todo.completed);
        setIsEditing(false);
    };
    return (
        <tr>
            <td>{todo.id}</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                ) : (
                    todo.title
                )}
            </td>
            <td>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onUpdate(todo.id, newTitle, !todo.completed)}
                />
            </td>
            <td>
                {isEditing ? (
                    <button onClick={handleUpdate}>Save</button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
                <button onClick={() => onDelete(todo.id)}>Delete</button>
            </td>
        </tr>
    )
}