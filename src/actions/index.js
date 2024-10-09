export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const addHero = (hero) => {
    return {
        type: 'ADD_HERO',
        payload: hero,
    }
}

export const removeHeroById = (id) => {
    return {
        type: 'REMOVE_HERO_BY_ID',
        payload: id,
    }
}

export const filterFetching = () => {
    return {
        type: 'FILTER_FETCHING',
    }
}

export const filterFetched = (filters) => {
    return {
        type: 'FILTER_FETCHED',
        payload: filters,
    }
}

export const filterFetchedError = () => {
    return {
        type: 'FILTER_FETCHING_ERROR',
    }
}

export const filterSetActive = (keyFilter) => {
    return {
        type: 'FILTER_SET_ACTIVE',
        payload: keyFilter
    }
}