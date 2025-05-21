import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { fetchMe, login, logout } from "../store/authSlice";

export function useAuth() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { token, user, status, error } = useAppSelector(s => s.auth);

    useEffect(() => {
        if (token && !user && status === 'idle') {
            dispatch(fetchMe());
        }
    }, [token, user, status, dispatch]);

    const signIn = async (email: string, password: string) => {
        const result = await dispatch(login({ email, password }));
        if (login.fulfilled.match(result)) {
            await dispatch(fetchMe());
            navigate('/dashboard');
        } else {
            console.log("login failed:", result.payload);
        }
    };

    const signOut = () => {
        dispatch(logout());
        navigate('/login');
    };

    return { token, user, status, error, signIn, signOut };
}