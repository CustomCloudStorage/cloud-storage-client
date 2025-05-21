import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../api/auth';
import type { LoginPayload, MeResponse } from '../types/api/auth';
import {
    setToken as saveToken,
    clearToken,
    getToken as loadToken,
} from '../utils/authStorage';

interface AuthState {
    token: string | null;
    user: MeResponse['user'] | null;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    token: loadToken(),
    user: null,
    status: 'idle',
    error: null,
}

export const login = createAsyncThunk<string, LoginPayload, { rejectValue: string }>('auth/login', async (payload, { rejectWithValue }) => {
    try {
        const res = await authApi.login(payload);
        const token = res.data.token;
        saveToken(token);
        return token;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.error || err.message);
    }
});

export const fetchMe = createAsyncThunk<MeResponse['user'], void, { rejectValue: string }>('auth/me', async (_, { rejectWithValue }) => {
    try {
        const res = await authApi.me();
        return res.data.user;
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.error || err.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            clearToken();
            state.token = null;
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'idle';
                state.token = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Login falied';
            })
            .addCase(fetchMe.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchMe.fulfilled, (state, action: PayloadAction<MeResponse['user']>) => {
                state.status = 'idle';
                state.user = action.payload;
            })
            .addCase(fetchMe.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Fetch user failed';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;