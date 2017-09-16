import React from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'

import MainPage from '../screens/MainPage'
import FullScreenImage from '../screens/FullScreenImage'

export const AppNavigator = StackNavigator(
    {
        Main : { screen: MainPage },
        FullScreen: { screen: FullScreenImage }
    },

    {
        headerMode: 'none',
    },
);

const AppWithNavigationState = ({dispatch, nav}) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState)