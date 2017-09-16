import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import ImagesList from '../containers/ImagesList'
import Header from '../components/Header'

class MainPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { orientedEvent } = this.props
        return (
            <View style={{flex: 1}}
            onLayout={() => orientedEvent(Dimensions.get('window').width)}>
                <View style={{flex: 1}}>
                    <Header />
                </View>
                <View style={{flex: 9}}>
                    <ImagesList />
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    orientedEvent: (width) => dispatch({type: 'RESIZE', width})
})

export default connect(null, mapDispatchToProps)(MainPage)