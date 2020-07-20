import React, { Component } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    LogBox,
    Dimensions,
    Linking
} from 'react-native';

class Home extends Component {

    static navigationOptions = { header: null }

    constructor() {
        super();
        LogBox.ignoreLogs(['navigationOptions'])
    }

    render() {
        return (
            <View style={styles.viewStyleOne}>
                <StatusBar backgroundColor='#4655A9' barStyle="light-content" />
                <View style={styles.viewStyleTwo}>
                    <Text style={styles.descriptionText}>Description</Text>
                    <Text style={styles.bodyTextOne}>This tool is intended to assist with biofouling risk profiling and management decisions
                    for recreational vessels arriving from the coastal waters of other regions of New Zealand.</Text>
                    <Text style={styles.bodyTextTwo}>It has been formulated specifically for use by councils and marina operators in the top
                    of the South Island (Marlborough, Nelson, Tasman), but with modification it may be applicable more broadly.
                    The tool is intended to provide a simple screening approach, and does address all of the risk factors important in the
                    development of hull biofouling. It is based on a decision tree, rationale and supporting information available
                    at <Text style={styles.bodyTextLink}
                            onPress={() => Linking.openURL('http://marinebiosecurity.co.nz')}>
                            www.marinebiosecurity.co.nz
                        </Text>
                    </Text>
                    <Text style={styles.bodyTextTwo}>
                        For further information on the app, or to report issues or ideas for improvement, please contact Barrie 
                        Forrest (barrie@saltecology.co.nz)
                    </Text>
                    <TouchableOpacity style={styles.entryButton} onPress={() => this.props.navigation.navigate('Create')}>
                        <Text style={styles.buttonText}>Begin Assessment</Text>
                    </TouchableOpacity>
                </View>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        width: Dimensions.get("window").width * 0.3,
        height: Dimensions.get("window").width * 0.3,
        marginTop: Dimensions.get("window").height * 0.08,
        opacity: 0.75
    },
    viewStyleOne: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#001489'
    },
    viewStyleTwo: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001489',

    },
    descriptionText: {
        fontFamily: 'DroidSans',
        color: 'rgba(255,255,255,0.75)',
        fontSize: RFPercentage(4),
        marginTop: -Dimensions.get("window").height * 0.04,
        marginLeft: Dimensions.get("window").width * 0.025,
        marginRight: Dimensions.get("window").width * 0.025,
    },
    bodyTextOne: {
        textAlign: 'left',
        fontFamily: 'DroidSans',
        color: 'rgba(255,255,255,0.75)',
        fontSize: RFPercentage(2.4),
        marginTop: Dimensions.get("window").height * 0.015,
        marginLeft: Dimensions.get("window").width * 0.044,
        marginRight: Dimensions.get("window").width * 0.044,
    },
    bodyTextTwo: {
        textAlign: 'left',
        fontFamily: 'DroidSans',
        color: 'rgba(255,255,255,0.75)',
        fontSize: RFPercentage(2.4),
        marginTop: Dimensions.get("window").height * 0.028,
        marginLeft: Dimensions.get("window").width * 0.044,
        marginRight: Dimensions.get("window").width * 0.044,
    },
    bodyTextLink: {
        textAlign: 'center',
        fontFamily: 'DroidSans',
        color: 'rgba(255,255,255,0.75)',
        textDecorationLine: 'underline',
        fontSize: RFPercentage(2.4),
        marginTop: Dimensions.get("window").height * 0.005,
        marginLeft: Dimensions.get("window").width * 0.025,
        marginRight: Dimensions.get("window").width * 0.025,
        marginBottom: Dimensions.get("window").height * 0.02,
    },
    entryButton: {
        backgroundColor: '#4655A9',
        borderRadius: 25,
        width: Dimensions.get("window").width * 0.8,
        paddingVertical: 12,
        marginTop: Dimensions.get("window").height * 0.08,

    },
    accessButton: {
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: 25,
        width: Dimensions.get("window").width * 0.8,
        paddingVertical: 12,
        marginTop: Dimensions.get("window").height * 0.02,

    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'DroidSans-Bold',
        color: 'rgba(255,255,255,0.75)',
        textAlign: 'center',
    },
    buttonTextTwo: {
        fontSize: 16,
        fontFamily: 'DroidSans-Bold',
        color: '#4655A9',
        textAlign: 'center',
    },
});

export default Home;