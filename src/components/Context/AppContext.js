import React, { createContext, useState, useEffect } from 'react';
import { mockAPI } from '../../mockAPI/mockAPI';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      mockAPI.getTasks().then(setTasks);
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const user = await mockAPI.login(email, password);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      throw new Error(error);
    }
  };

  const register = async (userData) => {
    try {
      await mockAPI.register(userData);
      return "Registration successful";
    } catch (error) {
      throw new Error(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addTask = async (task) => {
    await mockAPI.addTask(task);
    setTasks([...tasks, task]);
  };

  const updateTask = async (taskId, updatedTask) => {
    await mockAPI.updateTask(taskId, updatedTask);
    setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
  };

  const deleteTask = async (taskId) => {
    await mockAPI.deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        tasks,
        login,
        register,
        logout, // Ensure logout is being passed in the context
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
