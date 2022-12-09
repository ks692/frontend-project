import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    createUser,
    deleteUser,
    findAllUsers,
    findUserById,
    login,
    logout,
    profile,
    register,
    update
} from "./users-service";




export const logoutThunk = createAsyncThunk(
    'logout',
    async () => await logout()
)

export const profileThunk = createAsyncThunk(
    'profile',
    async () => await profile()
)

export const findUserByIdThunk = createAsyncThunk(
    'findUserById',
    async (uid) => await findUserById(uid)
)

export const loginThunk = createAsyncThunk(
    'login',
    async (user) => await login(user)
)

export const updateThunk = createAsyncThunk(
    'update',
    async (user) => await update(user)
)

export const deleteThunk = createAsyncThunk(
    'delete',
    async (user) => await deleteUser(user)
)

export const registerThunk = createAsyncThunk(
    'register',
    async (user) => await register(user)
)

export const findAllUsersThunk = createAsyncThunk(
    'findAllUsers',
    async () => await findAllUsers()
)

export const createUserThunk = createAsyncThunk(
    'createUser',
    async () => await createUser()
)