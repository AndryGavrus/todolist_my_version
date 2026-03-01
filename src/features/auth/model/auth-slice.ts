import { createAppSlice, handleServerAppError, handleServerNetworkError } from '@/common/utils'
import { LoginInputs } from '../lib/schemas'
import { setAppStatusAC } from '@/app/app-slice'
import { authApi } from '../api/authApi'
import { ResultCode } from '@/common/enums'
import { AUTH_TOKEN } from '@/common/constants'
import { clearDataAC } from '@/common/actions'

type AuthUser = {
    id: number | null
    email: string
    login: string
}

export const authSlice = createAppSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: {
            id: null,
            email: '',
            login: '',
        } as AuthUser,
    },
    selectors: {
        selectIsLoggedIn: (state) => state.isLoggedIn,
        selectUser: (state) => state.user,
    },
    reducers: (create) => ({
        loginTC: create.asyncThunk(
            async (data: LoginInputs, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await authApi.login(data)
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({ status: 'succeeded' }))
                        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
                        const meRes = await authApi.me()
                        if (meRes.data.resultCode === ResultCode.Success) {
                            return { isLoggedIn: true, user: meRes.data.data }
                        }
                        return {
                            isLoggedIn: true,
                            user: { id: null, email: '', login: '' },
                        }
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                    state.user = action.payload.user
                },
            },
        ),
        logoutTC: create.asyncThunk(
            async (_, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await authApi.logout()
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({ status: 'succeeded' }))
                        dispatch(clearDataAC())
                        localStorage.removeItem(AUTH_TOKEN)
                        return { isLoggedIn: false }
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error: any) {
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                    state.user = { id: null, email: '', login: '' }
                },
            },
        ),
        initializeAppTC: create.asyncThunk(
            async (_, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await authApi.me()
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return { isLoggedIn: true, user: res.data.data }
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error: any) {
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                    state.user = action.payload.user
                },
            },
        ),
    }),
})

export const { selectIsLoggedIn, selectUser } = authSlice.selectors
export const { loginTC, logoutTC, initializeAppTC } = authSlice.actions
export const authReducer = authSlice.reducer
