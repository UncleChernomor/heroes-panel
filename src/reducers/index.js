const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'ADD_HERO':
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        case 'REMOVE_HERO_BY_ID':
            return {
                ...state,
                heroes: state.heroes.filter(hero => {
                    if(action.payload === hero.id) {
                        return null;
                    }

                    return hero;
                })
            }
        case 'FILTER_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading',
            }
            case 'FILTER_FETCHED':
            return {
                    ...state,
                    filters: action.payload.map((filter) => {
                        console.log(filter);
                        const key = Object.keys(filter)[0];
                    
                        return {
                            key,
                            label: filter[key],
                            active:  key ==='all' ?? false
                        };
                    }),
                    filtersLoadingStatus: 'idle'
            }
            case 'FILTER_FETCHED_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
            case 'FILTER_SET_ACTIVE':
            return {
                ...state,
                filters: state.filters.map(filter => {
                    return {...filter, active: filter.key === action.payload ? true : false}
                })
            }

        default: return state
    }
}

export default reducer;