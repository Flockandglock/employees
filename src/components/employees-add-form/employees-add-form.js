import { v4 } from 'uuid';
import { useFetching } from '../../hooks/useFetching';
import { useDispatch } from 'react-redux';
import {addEmployees} from '../employees-list/emplSlice';
import { Field, Formik, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

import './employees-add-form.css';


const EmployeesAddForm = () => {

    const {request} = useFetching();
    const dispatch = useDispatch();

    // отправляет наш, новы объект, в стейт редакса и на сервер
    const onSubmit = (value, actions) => {
        const newEmpl = {
            id: v4(),
            name: value.name,
            salary: value.salary,
            increase: false,
            rise: false,
            moreThen1000: value.salary >= 1000 ? true : false
        };

        request("http://localhost:3001/employees", "POST", JSON.stringify(newEmpl))
            .then(dispatch(addEmployees(newEmpl)))
            .catch(err => console.log(err));
        
        // отчищает форму Formik, после отправки данных
        actions.resetForm({value: {
            name: '',
            salary: '',
        }})
    };


    return (
        <div className="app-add-form">
            <h3>Добавьте нового сотрудника</h3>
            <Formik  initialValues={{ name: '', salary: ''}}
                    validationSchema = {Yup.object({
                        name: Yup.string()
                                .min(2, 'Минимум 2 символа')
                                .required('Ага щас, ничего не забыл?'),
                        salary: Yup.number()
                                    .min(100, 'Не меньше сотки бро, ты же не хочешь бедных работников?!')
                                    .max(10000, 'Не многовато ли?')
                                    .required('Ага щас, ничего не забыл?')
                    })}
                     onSubmit={(value, actions) => onSubmit(value, actions)}>
                <Form className="add-form d-flex">
                    <Field type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?" 
                        name='name'
                        />
                    <ErrorMessage name='name'>{msg => <div>{msg}</div>}</ErrorMessage>
                    <Field type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?" 
                        name='salary'
                        />
                    <ErrorMessage name='salary'>{msg => <div>{msg}</div>}</ErrorMessage>
                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </Form>
            </Formik>
        </div>
    )
}

export default EmployeesAddForm;