import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    removeHeroById,
} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния +++
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE +++

const HeroesList = () => {
    const { heroes, heroesLoadingStatus, filters } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const removeHero = useCallback( (id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(data => console.log(data, ': Deleted'))
            .then(dispatch(removeHeroById(id)))
            .catch(e => console.log(`error: ${e}`));
            
            // eslint-disable-next-line
    }, [request]);
    

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        const currentElement = filters.filter(item => item.active)[0] || false;

        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({ id, element, ...props }) => {

            if (currentElement?.hasOwnProperty('key') && currentElement.key === 'all') {
                return <HeroesListItem key={id} removeHero={() => removeHero(id)} element={element} {...props} />
            }

            if (currentElement?.hasOwnProperty('key') && element === currentElement.key) {
                return <HeroesListItem key={id} removeHero={() => removeHero(id)} element={element} {...props} />
            }

            return null;
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;