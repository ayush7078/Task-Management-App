// App.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import AuthForm from './components/Auth/AutnForm';
import TaskList from './components/TaskManager/TaskList';
import AddTask from './components/TaskManager/AddTask';
import AppHeader from './components/Layout/Header';
import { AppContext } from './components/Context/AppContext';

const { Content } = Layout;

const App = () => {
  const { user } = useContext(AppContext);

  return (
    <Layout>
      {user && <AppHeader />} {/* Show Header if user is logged in */}
      <Content style={{ padding: '50px' }}>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/tasks" /> : <AuthForm />} />
          <Route path="/tasks" element={user ? <TaskList /> : <Navigate to="/" />} />
          <Route path="/add-task" element={user ? <AddTask /> : <Navigate to="/" />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
