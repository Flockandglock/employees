import { useContext } from "react";
import { EmplsContext } from "../../context";

import "./app-info.css";

const AppInfo = () => {

    const {empls, setEmpls, loading} = useContext(EmplsContext);

    const allEmpls = empls.length;

    const willIncrease = empls.filter(empl => empl.increase).length;

    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {allEmpls}</h2>
            <h2>Премию получат: {willIncrease}</h2>
        </div>
    )
}

export default AppInfo;