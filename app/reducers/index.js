import { combineReducers } from 'redux'
import { RECEIVE_DATA, REQUEST_DATA, TOGGLE_SCREEN, REQUEST_ERROR} from '../actions'
import { AppNavigator } from '../navigators'
import { NavigationActions } from 'react-navigation'
import { Dimensions } from 'react-native'
import MAIN_LINK from '../../link'

const screenInitialState = {
    page: 'MAIN_PAGE',
    link: null,
}

function screen(state = screenInitialState, action) {
    switch(action.type) {
    case TOGGLE_SCREEN:
        if(!action.link) {
            return {
                page: 'MAIN_PAGE',
                link: null,
            }
        }

        return {
            page: 'IMAGE',
            link: action.link,
        }
    default:
        return state;
    }
}

const dataInitialState = {
    currentPage: 1,
    link: MAIN_LINK + 1,
    linkTemplate: MAIN_LINK,
    isFetching: false,
    isLoadError: false,
    items: [],
};

function distributionData(data) {
    return {
                id : data.id,
                name: data.name,
                imageSmallUrl: data.images[0].url,
                imageLargeUrl: data.images[1].url,
                author: data.user.fullname,
            }
}

function data(state = dataInitialState, action) {
    switch (action.type) {
    case REQUEST_DATA:
        return Object.assign({}, state, {
            isFetching: true,
            link: action.link,
        })
    case RECEIVE_DATA:
        return Object.assign({}, state, {
            currentPage: action.data.current_page,
            isFetching : false,
            isLoadError: false,
            totalPages  : action.data.total_pages,
            items      : action.data.photos.map( elem => {
                            return Object.assign({}, distributionData(elem), {
                                isLoaded: false
                                })
                         }),
                        })
    case REQUEST_ERROR:
        return Object.assign({}, state, {
            isLoadError: true,
            isFetching: false
        })
    default:
        return state;
    }
}

const initialNavigationState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Main')
);

function nav(state = initialNavigationState, action) {
    let nextState;
    switch (action.type) {
        case 'FULL_SCREEN':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: 'FullScreen',
                    params: {link: action.link},
                }),
                state,
            );
            break;
        case 'GO_BACK':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
}

const initialOrientedState = {
    width: Dimensions.get('window').width,
}

function oriented (state = initialOrientedState, action) {
    switch (action.type) {
        case 'RESIZE':
            return Object.assign({}, state, {
                width: action.width
            });
        default:
            return state;
    }
}

const reducers = combineReducers({
    nav,
    oriented,
    data,
})

export default reducers