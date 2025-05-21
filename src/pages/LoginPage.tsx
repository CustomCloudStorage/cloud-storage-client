import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
    const { signIn, status, error } = useAuth();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <LoginForm
                onSubmit={signIn}
                loading={status === 'loading'}
                error={error}
            />
        </div>
    );
};

export default LoginPage;