import { useFetching } from "../../hooks/useFetching";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {fetchFilters} from '../../redux/actions';
import {activeFilterChanged} from './filterSlice';

import "./app-filter.css";


const AppFilter = () => {

    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useFetching();

    useEffect(() => {
        dispatch(fetchFilters(request))
    }, [])

    if (filtersLoadingStatus === 'loading') {
        return <div>Загрузка фильтров</div>
    } else if(filtersLoadingStatus === 'error') {
        return <div>Ошибка загрузки</div>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <div>Фильтры не найдены</div>
        }

        return arr.map(({name, label, className}) => {

            let btnClass = className;

            if(activeFilter === name) {
                btnClass += ' btn-light'
            } else {
                btnClass += ' btn-outline-light'
            }

            return <button className={btnClass}
                    key={name}
                    id={name}
                    onClick={() => dispatch(activeFilterChanged(name))} >
                {label}
            </button>
        })
    };

    const element = renderFilters(filters);


    return (
        <div className="btn-group">
            {element}
        </div>
    );
};


// const AppFilter = ({filter, setFilter}) => {

//     const all = filter.sort === 'all' ? 'btn-light' : 'btn-outline-light';
//     const rise = filter.sort === 'rise' ? 'btn-light' : 'btn-outline-light';
//     const moreThen1000 = filter.sort === 'moreThen1000' ? 'btn-light' : 'btn-outline-light';

//     return (
//         <div className="btn-group">
//             <button type="button"
//                     className={`btn ${all}`}
//                     onClick={() => setFilter({...filter, sort: 'all'})} >
//                     Все сотрудники
//             </button>
//             <button type="button"
//                     className={`btn ${rise}`}
//                     onClick={() => setFilter({...filter, sort: 'rise'})} >
//                     На повышение
//             </button>
//             <button type="button"
//                     className={`btn ${moreThen1000}`}
//                     onClick={() => setFilter({...filter, sort: 'moreThen1000'})} >
//                     З/П больше 1000$
//             </button>
//         </div>
//     )
// }

export default AppFilter;