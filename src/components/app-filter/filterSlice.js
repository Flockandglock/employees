import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useFetching} from '../../hooks/useFetching';


// Удаляем uceCallback в хуке useFetching. Этак фун-ия возвращает нам промис, который мы обрабатываем в extraReducers
export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useFetching();
        return request('http://localhost:3001/filters');
    }
);

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    query: '',
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // теперь эти 3 редьюсера перешли в extraReducers. Удаляем их отсюда, потому что больше мы их нигде не используем
        activeFilterChanged: (state, actions) => {
            state.activeFilter = actions.payload;
        },
        getQuery: (state, actions) => {
            state.query = actions.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {
                state.filtersLoadingStatus = 'loading';
            })
            .addCase(fetchFilters.fulfilled, (state, actions) => {
                state.filtersLoadingStatus = 'idle';
                state.filters = actions.payload;
            })
            .addCase(fetchFilters.rejected, state => {
                state.filtersLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filterSlice;

export default reducer;
export const {
    activeFilterChanged,
    getQuery
} = actions;