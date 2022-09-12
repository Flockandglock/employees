import { createAction } from "@reduxjs/toolkit";
import {employeesFetching, employeesFetched, employeesFetchingError,} from '../../components/employees-list/emplSlice';
import {filtersFetching, filtersFetched, filtersFetchingError,} from '../../components/app-filter/filterSlice';


// здесь отрабатывает redux-thunk
export const fetchEmpls = (request) => (dispatch) => {
    dispatch(employeesFetching());
    request("http://localhost:3001/employees")
        .then(data => dispatch(employeesFetched(data)))
        .catch(() => dispatch(employeesFetchingError()))
};

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
};

