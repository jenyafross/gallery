import React, { Component } from 'react'
import { View, Image, TouchableWithoutFeedback, ViewPagerAndroid, BackHandler } from 'react-native'
import { connect } from 'react-redux'

class FullScreenImage extends Component {

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.props.nextScreen);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.props.nextScreen);
    }

    render() {
        const {nextScreen, navigation} = this.props
        return (
            <ViewPagerAndroid style={{flex: 1}}
            initialPage={1}
            onPageSelected={nextScreen}>
                <View></View>

                <View style={{flex: 1}}>
                    <TouchableWithoutFeedback style={{flex: 1}}
                    >
                        <Image
                        style={{flex: 1, backgroundColor: '#000000', width: null, height: null}}
                        source={{uri: navigation.state.params.link}}
                        resizeMode='contain'
                        />
                    </TouchableWithoutFeedback>
                </View>
                <View></View>
            </ViewPagerAndroid>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    nextScreen: () => dispatch({type: 'GO_BACK'})
})
//onPress={nextScreen}
export default connect(null, mapDispatchToProps)(FullScreenImage)