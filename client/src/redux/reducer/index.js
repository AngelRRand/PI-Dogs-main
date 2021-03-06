const inicialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: [],
    pagination: [1]
}

function rootReducer(state = inicialState, action) {
    switch (action.type) {


        case 'GET_ALL_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case 'SEARCH_DOG':
            return {
                ...state,
                dogs: action.payload,
            }

        case 'DETAIL_DOG':
            console.log('se hizo un detail')
            return {
                ...state,
                detail: action.payload
            }

        case 'ALFABETIC_DOGS':
            const sortName = action.payload === 'asc' ?
                [...state.dogs].sort(function (a, b) {
                    if (a.name > b.name) { return 1 }
                    if (b.name > a.name) { return -1 }
                    return 0;
                }) :
                [...state.dogs].sort(function (a, b) {
                    if (a.name > b.name) { return -1; }
                    if (b.name > a.name) { return 1; }
                    return 0;
                })
            return {
                ...state,
                dogs: sortName
            }

        case 'WEIGTH_DOGS':
            const sortWeigth = action.payload === 'asc' ?
                [...state.dogs].sort((a, b) => {
                    if (a.weight_max > b.weight_max) { return 1 }
                    if (b.weight_max > a.weight_max) { return -1 }
                    return 0
                }) :
                [...state.dogs].sort((a, b) => {
                    if (a.weight_max > b.weight_max) { return -1 }
                    if (b.weight_max > a.weight_max) { return 1 }
                    return 0
                })
            return {
                ...state,
                dogs: sortWeigth
            }

        case 'LIST_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }
        case 'DOGS_BY_TEMP':
            console.log('activaste filter')
            return {
                ...state,
                dogs: action.payload,
            }
        case 'CREATED':
            const createdFilter = action.payload === 'inDB' ?
                state.allDogs.filter(dog => dog.createdInDB === true) :
                state.allDogs.filter(dog => !dog.createdInDB);
            return {
                ...state,
                dogs: createdFilter,
            }
        case 'POST_DOG':
            return {
                ...state
            }
        case 'DELETE_DETAILS':
            return {
                ...state,
                details: []
            }
        default:
            return state
    }
}
export default rootReducer