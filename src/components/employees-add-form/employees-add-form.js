import { useState } from 'react';
import { v4 } from 'uuid';
import { postEmpl } from '../../API/EmplService';
import './employees-add-form.css';

const EmployeesAddForm = ({addEmpl}) => {

    const [name, setName] = useState('');
    const [salary, setSalary] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()
        const newEmpl = {
            id: v4(),
            name,
            salary,
            increase: false,
            rise: false,
            moreThen1000: salary >= 1000 ? true : false
        };
        postEmpl(newEmpl)
        addEmpl(newEmpl)

        setName('');
        setSalary('');
    };

    return (
        <div className="app-add-form">
            <h3>Добавьте нового сотрудника</h3>
            <form
                className="add-form d-flex" onSubmit={onSubmit}>
                <input type="text"
                    className="form-control new-post-label"
                    placeholder="Как его зовут?" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name='name'
                    />
                <input type="number"
                    className="form-control new-post-label"
                    placeholder="З/П в $?" 
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    name='salary'
                    />

                <button type="submit"
                        className="btn btn-outline-light">Добавить</button>
            </form>
        </div>
    )
}

export default EmployeesAddForm;