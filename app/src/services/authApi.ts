
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/user';

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ["Profile"],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://697f20ead1548030ab653955.mockapi.io',
    }),
    endpoints: (builder) => ({

        signup: builder.mutation<User, Omit<User, 'id'>>({
            query: (data) => ({
                url: 'users',
                method: 'POST',
                body: data,
            }),
        }),
        getUsers: builder.query<User[], void>({
            query: () => 'users',
        }),

        getProfile: builder.query<User, string>({
            query: (id) => `users/${id}`,
            providesTags: ["Profile"],
        }),

        updateProfile: builder.mutation<
            User,
            { id: string; data: Partial<User> }
        >({
            query: ({ id, data }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const {
    useSignupMutation,
    useLazyGetUsersQuery,
    useGetProfileQuery,
    useUpdateProfileMutation,
} = authApi;
