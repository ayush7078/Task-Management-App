 // Header.js
import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { Button, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => {
  const { user, logout } = useContext(AppContext);
 console.log("hello",  logout)
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ color: 'white', fontSize: '16px' }}>Welcome, {user?.name}</div>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Header>
  );
};

export default AppHeader;
