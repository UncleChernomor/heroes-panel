
import { useDispatch, useSelector } from "react-redux";

import { useHttp } from "../../hooks/http.hook";
import { filterFetching, filterFetched, filterFetchedError, filterSetActive } from "../../actions";
import { useEffect } from "react";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных +++
// Фильтры должны отображать только нужных героев при выборе +++
// Активный фильтр имеет класс active +++
// Изменять json-файл для удобства МОЖНО! 
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const { filters, filtersLoadingStatus } = useSelector(state => state);
    const dispatch = useDispatch();

    const { request } = useHttp();

    useEffect(() => {
        dispatch(filterFetching());

        request("http://localhost:3001/filters")
            .then(data => {
                dispatch(filterFetched(data))
            })
            .catch(() => dispatch(filterFetchedError()))

        // eslint-disable-next-line
    }, []);

    const handleChangeFilter = (keyFilter) => {
        dispatch(filterSetActive(keyFilter));
    }

    if (filtersLoadingStatus === 'loading') {
        return (
            <div className="card shadow-lg mt-4">
                <p>Filters Loading ...</p>
            </div>
        )
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {
                        filters.map(({ key, label, active }) => {
                            let classes = 'btn';
                            switch (key) {
                                case 'all':
                                    classes += ' btn-outline-dark';
                                    break;
                                case 'fire':
                                    classes += ' btn-danger';
                                    break;
                                case 'water':
                                    classes += ' btn-primary';
                                    break;
                                case 'wind':
                                    classes += ' btn-success';
                                    break;
                                case 'earth':
                                    classes += ' btn-secondary';
                                    break;
                                default: ;
                            }

                            classes += active ? ' active' : '';

                            return (<button key={key} className={classes} onClick={() => handleChangeFilter(key)}>
                                {key !== 'all' ? label : label.split(' ')[0]}
                            </button>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;