import { useEffect, useState, useContext, useCallback, useMemo } from "react";
import { EmplsContext } from "../../context";
import { useFetching } from "../../hooks/useFetching";
import { getAllEmpls } from "../../API/EmplService";
import { deleteEmpl } from "../../API/EmplService";

import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';


const EmployeesList = () => {

    const {empls, setEmpls, loading} = useContext(EmplsContext);
    // const [empls, setEmpls] = useState([]);

    // Меняем свойство rise/increase. Колбэком прокидываем в EmployeesListItem.
    const onToggleProp = (id, prop) => {
        const prevEmpl = (emplss) => {
            return emplss.map(item => 
                    item.id === id ?
                    {
                        ...item,
                        [prop]: !item[prop]
                    }
                    : item
                )
        };
        setEmpls(prevEmpl)
        // console.log('setEmpls')
    };

    // Удаляем работника. Оборачиваем в Callback, чтобы не было перерендеров дочернего компонента. Сперва удаляется с сервера, потом фильтруем сосояние по id
    const removeEmpl = useCallback(async (id) => {
        await deleteEmpl(id)

        setEmpls(empls => {
            return empls.filter(item => item.id !== id)
        })
    }, []);
    

    const renderEmplList = useCallback((arr) => {
        if (arr.length === 0) {
            return <h5>Работников пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
           return <EmployeesListItem key={id} 
                                    {...props} 
                                    onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                                    removeEmpl={() => removeEmpl(id)} />
        })
    }, [empls])

    const elements = renderEmplList(empls)


    return (
            <ul className="app-list list-group">
                {loading ?
                    <div>Сотрудники загружаются</div>
                : elements
                }
            </ul>
    )
}

export default EmployeesList;