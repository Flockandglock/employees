import { createAction } from "@reduxjs/toolkit";


// здесь отрабатывает redux-thunk
export const fetchEmpls = (request) => (dispatch) => {
    dispatch(emplsFetching());
    request("http://localhost:3001/employees")
        .then(data => dispatch(emplsFetched(data)))
        .catch(() => dispatch(emplsFetchingError()))
};

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
};


export const emplsFetching = createAction('EMPLS_FETCHING');

export const emplsFetched = createAction('EMPLS_FETCHED');

export const emplsFetchingError = createAction('EMPLS_FETCHING_ERROR');

export const togglePropEmpl = createAction('TOGGLE_PROP');

export const addEmpl = createAction('ADD_EMPL');

export const emplDeleted = createAction('EMPL_DELETED');


export const filtersFetching = createAction('FILTERS_FETCHING');

export const filtersFetched = createAction('FILTERS_FETCHED');

export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR');

export const getQuery = createAction('GET_QUERY');

export const activeFilterChanged  = createAction('ACTIVE_FILTER_CHANGED');

