import { baseApi } from '@/app/baseApi'
import { instance } from '@/common/instance'
import type { BaseResponse } from '@/common/types'
import type { LoginInputs } from '@/features/auth/lib/schemas'

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      me: builder.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
        query: () => 'auth/me',
      }),
        login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
            query: (payload) => ({ url: 'auth/login', method: 'POST', body: payload }),
        }),
        logout: builder.mutation<BaseResponse, void>({
          query: () => ({ url: 'auth/login', method: 'DELETE' }),
        })
    }),
})

export const {useMeQuery, useLoginMutation, useLogoutMutation} = authApi

export const _authApi = {
    login(payload: LoginInputs) {
        return instance.post<BaseResponse<{ userId: number; token: string }>>('auth/login', payload)
    },
    logout() {
        return instance.delete<BaseResponse>('auth/login')
    },
    me() {
        return instance.get<BaseResponse<{ id: number; email: string; login: string }>>('auth/me')
    },
}
