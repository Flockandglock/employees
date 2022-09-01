import { useEffect, useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import { getAllEmpls } from "../../API/EmplService";

import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = () => {

    const [empls, setEmpls] = useState([]);
    const {error, loading, fetchEmpls} = useFetching(async() => {
        const empls = await getAllEmpls();
            setEmpls(empls)
    })
    

    useEffect(() => {
        // console.log('отработал useEffect')
        fetchEmpls()
    }, [])

    // меняем свойство rise/increase. Колбэком прокидываем в EmployeesListItem.
    const onToggleProp = (id, prop) => {

        const prevEmpl = (emplss) => {
            console.log('prevEmpl')
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
        console.log('setEmpls')

        // setEmpls((prevEmpl) => 
        //     prevEmpl.map((item) => 
        //         item.id === id ?
        //         {
        //             ...item,
        //             [prop]: !item[prop]
        //         }
        //         : item
        //     )
        // )
    };

    const renderEmplList = (arr) => {
        if (arr.length === 0) {
            return <h5>Работников пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
           return <EmployeesListItem key={id} {...props} onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))} />
        })
    }

    const elements = renderEmplList(empls);

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