import { combineReducers } from "redux";

const FilmReducer = (film = {
        name: 'aaa',
        image: ''
    }, action) => {

    switch (action.type) {
        case 'SET_FILM':
            return {
                'name': action.payload.name, 
                'image': action.payload.image
            };

        default:
            return film
        }
}


export default combineReducers({
    film: FilmReducer
});