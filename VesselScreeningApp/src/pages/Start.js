import React, { Component } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    YellowBox,
    Dimensions,
} from 'react-native';

class Start extends Component {

    static navigationOptions = { header: null }

    constructor() {
        super();
        YellowBox.ignoreWarnings(['navigationOptions'])
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <StatusBar backgroundColor='#4655A9' barStyle="light-content" />
                <Image source={require('../images/soph.png')} style={styles.imageStyle}></Image>
                <Text style={styles.titleText}>Vessel Biofouling Risk Tool</Text>
                <Text style={styles.versionText}>Version 1.0.0</Text>
                <TouchableOpacity style={styles.entryButton} onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Click to Continue</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#001489'
    },
    entryButton: {
        backgroundColor: '#4655A9',
        borderRadius: 25,
        width: Dimensions.get("window").width * 0.8,
        paddingVertical: 12,
        marginTop: Dimensions.get("window").height * 0.17,

    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'DroidSans-Bold',
        color: 'rgba(255,255,255,0.75)',
        textAlign: 'center',
    },
    titleText: {
        fontFamily: 'DroidSans',
        color: '#FFFFFF',
        fontSize: RFPercentage(3.7),
        marginTop: Dimensions.get("window").height * 0.05

    },
    versionText: {
        marginTop: 3,
        fontFamily: 'DroidSans',
        color: '#FFFFFF',
        fontSize: RFPercentage(1.8),
    },
    imageStyle: {
        width: Dimensions.get("window").width * 0.6,
        height: Dimensions.get("window").width * 0.6,
        marginTop: Dimensions.get("window").height * 0.12,
        opacity: 0.75
    }
});

export default Start;