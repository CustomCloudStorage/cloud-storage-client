import React, { type JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" replace />;
};

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <DashboardPage />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}