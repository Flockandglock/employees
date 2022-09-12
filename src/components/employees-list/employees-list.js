import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useSorted } from "../../hooks/useSorted";
import { togglePropEmpl, employeesDeleted, fetchEmpls } from "../employees-list/emplSlice";
import { useFetching } from "../../hooks/useFetching";

import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';


const EmployeesList = () => {

    const {employees, emplsLoadingStatus} = useSelector(state => state.employees);
    const {activeFilter, query} = useSelector(state => state.filters);
    const sortedAndSearchedPost = useSorted(employees, activeFilter, query);
    
    const dispatch = useDispatch();
    const {request} = useFetching();

    // все та же первоначальная загрузка данных в стейт редакса и на сервак
    useEffect(() => {
        dispatch(fetchEmpls());
    }, []);

    // Меняем свойство rise/increase. Колбэком прокидываем в EmployeesListItem.
    const onToggleProp = (id, prop) => {

        // эта фун-ия принимает массив с объектами и меняет свойство 1 объекта на противоположное, а остальные объекты остаются неизменными
        const prevEmpl = (empls) => {
            return empls.map(item => 
                    item.id === id ?
                    {
                        ...item,
                        [prop]: !item[prop]
                    }
                    : item
                )
        };
        // передаем наших работников, а результат работы диспатчим в наш стейт
        const getPrevEmpl = prevEmpl(employees);
        dispatch(togglePropEmpl(getPrevEmpl));

        // request("http://localhost:3001/employees", "UPDATE", JSON.stringify(getPrevEmpl))
        //     .then(dispatch(addEmpl(getPrevEmpl)))
        //     .catch(err => console.log(err));
        
    };

    // Удаляем работника. Оборачиваем в Callback, чтобы не было перерендеров дочернего компонента. Сперва удаляется с сервера, потом фильтруем сосояние по id
    const removeEmpl = useCallback((id) => {
        request(`http://localhost:3001/employees/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(employeesDeleted(id)))
            .catch(err => console.log(err));
    }, []);
    
    // формируем массив наших работников{объетов}
    const renderEmplList = (arr) => {
        if (arr.length === 0) {
            return <h5>Работников пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
           return <EmployeesListItem key={id} 
                                    {...props} 
                                    onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                                    removeEmpl={() => removeEmpl(id)} />
        });
    };

    const elements = renderEmplList(sortedAndSearchedPost);


    return (
            <ul className="app-list list-group">
                {emplsLoadingStatus === 'loading' ?
                    <div>Сотрудники загружаются</div>
                : elements
                }
            </ul>
    )
}

export default EmployeesList;