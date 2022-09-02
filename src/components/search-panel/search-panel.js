

import './search-panel.css';

const SearchPanel = ({filter, setFilter}) => {
  

    return (
        <input type="text"
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                className="form-control search-input"
                placeholder="Найти отца, в смысле сосутрудника..."/>
    )
}

export default SearchPanel;