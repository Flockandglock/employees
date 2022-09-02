import { useMemo } from "react";

// Этот хук нужен, чтобы использовать его в купе с последним. Данный хук у нас сортирует список по выбранному фильтру
export const useFilter = (empls, filter) => {

    const filterEmpls = useMemo(() => {
        switch (filter) {
            case 'rise':
                return empls.filter(empl => empl.rise)
            case 'increase':
                return empls.filter(empl => empl.increase)
            case 'moreThen1000':
                return empls.filter(empl => empl.moreThen1000)
            default:
                return empls
        }
    }, [empls, filter]);

    return filterEmpls
};

// Здесь мы сортируем массив с уже отфильтроваными объектами по приходящей строке, т.е. осуществляем поиск
export const useSorted = (empls, filter, query) => {

    const filtered = useFilter(empls, filter);

    const sortedAndSearchedPost = useMemo(() => {
        return filtered.filter(empl => empl.name.indexOf(query) > -1)
    }, [query, filtered]);

    return sortedAndSearchedPost
};