import { useEffect, useState } from 'react';
import { findTodos } from '../api/todoApi';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const bootstrapAsync = async () => {
      const { data } = await findTodos();
      setTodos(data);
    };
    bootstrapAsync();
  }, []);
  return (
    <div>
      <h1>Admin</h1>
      <h2>Liste des tâches</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
