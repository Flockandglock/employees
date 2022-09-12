import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useFetching} from '../../hooks/useFetching';


// Удаляем uceCallback в хуке useFetching
export const fetchEmpls = createAsyncThunk(
    'employees/fetchEmpls',
    () => {
        const {request} = useFetching();
        return request('http://localhost:3001/employees');
    }
);

const initialState = {
    employees: [],
    emplsLoadingStatus: 'idle',
};

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        // теперь эти 3 редьюсера перешли в extraReducers. Удаляем их отсюда, потому что больше мы их нигде не используем
        addEmployees: (state, actions) => {
            state.employees.push(actions.payload);
        },
        employeesDeleted: (state, actions) => {
            state.employees = state.employees.filter(item => item.id !== actions.payload);
        },
        togglePropEmpl: (state, actions) => {
            state.employees = actions.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmpls.pending, state => {
                state.emplsLoadingStatus = 'loading';
            })
            .addCase(fetchEmpls.fulfilled, (state, actions) => {
                state.emplsLoadingStatus = 'idle';
                state.employees = actions.payload;
            })
            .addCase(fetchEmpls.rejected, state => {
                state.emplsLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = employeesSlice;

export default reducer;
export const {
    addEmployees,
    employeesDeleted,
    togglePropEmpl
} = actions;