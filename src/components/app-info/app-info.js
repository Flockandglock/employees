import { useSelector } from "react-redux";


import "./app-info.css";

const AppInfo = () => {

    const {employees} = useSelector(state => state.employees);

    const allEmpls = employees.length;
    const willIncrease = employees.filter(empl => empl.increase).length;

    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании HZCompany</h1>
            <h2>Общее число сосутрудников(рабов): {allEmpls}</h2>
            <h2>Премию получат, наверное... : {willIncrease}</h2>
        </div>
    )
}

export default AppInfo;