import type React from "react";
import { useState, type FormEvent } from "react";

type Props = {
    onSubmit: (email: string, password: string) => void;
    loading: boolean;
    error?: string | null;
}

export const LoginForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto p-6 bg-white rounded shadow"
        >
            <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
            {error && <div className="text-red-600 mb2">{error}</div>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
            />
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Signing in…' : 'Sign In'}
            </button>
        </form>
    )
}