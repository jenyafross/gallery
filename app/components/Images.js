import React, { Component } from 'react'
import { 
    TouchableHighlight,
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    ImageBackground
} from 'react-native'
import { connect } from 'react-redux'


const imgSize = 140;

class Images extends Component {
    constructor(props) {
        super(props)
    }

    _sliceText(str) {
        if(str.length < 18) return str;

        return (str.slice(0,17) + "...");
    }

    render() {
        const { items, nextScreen, width } = this.props;
        let imgAmount = Math.floor(width / imgSize);
        let margin = (width - (imgSize * imgAmount)) / (imgAmount + 1);
        return (
            <View style={style.container}>
                {items.map( elem => {
                    let pic = { uri: elem.imageSmallUrl}
                    return (
                        <TouchableHighlight
                            onPress={() => nextScreen(elem.imageLargeUrl)}
                            key={elem.id}
                            style={{marginBottom: 10, marginTop: 10, marginLeft: margin}}
                        >
                            <ImageBackground
                                source={pic}
                                style={{width: imgSize, height: imgSize}}
                            >
                            <View style={style.textContainer}>
                                <Text style={style.text}>{this._sliceText(elem.name)}</Text>
                                <View>
                                    <Text style={style.text}>Author:</Text>
                                    <Text style={style.text}>{this._sliceText(elem.author)}</Text>
                                </View>
                            </View>
                            </ImageBackground>
                        </TouchableHighlight>
                    )
                })}
                </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: 'verdana',
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        textAlign: 'center',
    }
})

const mapStateToProps = state => ({
    width: state.oriented.width
})

const mapDispatchToProps = dispatch => ({
    nextScreen : (link) => dispatch({ type: 'FULL_SCREEN', link }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Images)