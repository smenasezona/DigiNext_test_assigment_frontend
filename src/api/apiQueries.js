import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://diginext-test-app-gsu.koyeb.app'}),
    endpoints: (builder) => ({
        getEntities: builder.query({
            query: () => '/entities',
        }),
        getEntity: builder.query({
            query: (name) => `/entities/${name}`,
        }),
        createEntity: builder.mutation({
            query: ({name, coordinate, labels}) => ({
                url: '/entities',
                method: 'POST',
                body: {name, coordinate, labels},
            }),
        }),
        updateEntity: builder.mutation({
            query: ({name, coordinate, labels}) => ({
                url: `/entities/${name}`,
                method: 'PUT',
                body: {coordinate, labels},
            }),
        }),
        deleteEntity: builder.mutation({
            query: (name) => ({
                url: `/entities/${name}`,
                method: 'DELETE',
            }),
        }),
        filterEntities: builder.query({
            query: (label) => `/entities/filter/${label}`,
        }),
        getCoordinates: builder.query({
            query: () => '/coordinates',
        }),
    }),
})



export const {
    useGetEntitiesQuery,
    useGetEntityQuery,
    useCreateEntityMutation,
    useUpdateEntityMutation,
    useDeleteEntityMutation,
    useFilterEntitiesQuery,
    useGetCoordinatesQuery,
} = api


