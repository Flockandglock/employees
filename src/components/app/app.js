import { useState, useEffect } from 'react';
import { EmplsContext } from '../../context';
import { useFetching } from "../../hooks/useFetching";
import { getAllEmpls } from "../../API/EmplService";

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';


function App() {

	const [empls, setEmpls] = useState([]);

	const {error, loading, fetchEmpls} = useFetching(async() => {
        const empls = await getAllEmpls();
            setEmpls(empls)
    })

    useEffect(() => {
        // console.log('отработал useEffect')
        fetchEmpls()
    }, [])

	const addEmpl = (empl) => {
		setEmpls([...empls,empl])
	};

	return (
		<EmplsContext.Provider value={{empls, setEmpls, loading}}>
			<div className="app">
				<AppInfo />
				<div className="search-panel">
					<SearchPanel/>
					<AppFilter/>
				</div>
				<EmployeesList/>
				<EmployeesAddForm addEmpl={addEmpl} />
			</div>
		</EmplsContext.Provider>
	);
}

export default App;
