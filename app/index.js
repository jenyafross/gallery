import React, { Component } from 'react'
import { View, Image } from 'react-native'

import AppWithNavigationState from './navigators'
import MainPage from './screens/MainPage'


class App extends Component {
    render() {
        return(
            <AppWithNavigationState />
        );
    }
}

export default App