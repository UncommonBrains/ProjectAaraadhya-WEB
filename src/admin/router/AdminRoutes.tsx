import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import AdminPrivateRoutes from './AdminPrivateRoutes';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route element={<AdminPrivateRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
