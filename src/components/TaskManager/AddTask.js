import React, { useState, useContext } from 'react';
import { AppContext } from '../Context/AppContext';

const AddTask = () => {
  const { addTask } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    const newTask = { id: Date.now(), title, description, completed: false };
    await addTask(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
