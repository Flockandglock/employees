import { getQuery } from '../app-filter/filterSlice';
import { useDispatch, useSelector } from 'react-redux';


import './search-panel.css';

const SearchPanel = () => {
  
    const {query} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    

    return (
        <input type="text"
                value={query}
                onChange={e => dispatch(getQuery(e.target.value))}
                className="form-control search-input"
                placeholder="Найти отца, в смысле сосутрудника..."/>
    )
}

export default SearchPanel;