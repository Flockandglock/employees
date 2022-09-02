import "./app-filter.css";

const AppFilter = ({filter, setFilter}) => {

    const all = filter.sort === 'all' ? 'btn-light' : 'btn-outline-light';
    const rise = filter.sort === 'rise' ? 'btn-light' : 'btn-outline-light';
    const moreThen1000 = filter.sort === 'moreThen1000' ? 'btn-light' : 'btn-outline-light';

    return (
        <div className="btn-group">
            <button type="button"
                    className={`btn ${all}`}
                    onClick={() => setFilter({...filter, sort: 'all'})} >
                    Все сотрудники
            </button>
            <button type="button"
                    className={`btn ${rise}`}
                    onClick={() => setFilter({...filter, sort: 'rise'})} >
                    На повышение
            </button>
            <button type="button"
                    className={`btn ${moreThen1000}`}
                    onClick={() => setFilter({...filter, sort: 'moreThen1000'})} >
                    З/П больше 1000$
            </button>
        </div>
    )
}

export default AppFilter;