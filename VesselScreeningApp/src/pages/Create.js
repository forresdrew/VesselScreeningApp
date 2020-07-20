import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DatePicker from 'react-native-datepicker';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    StatusBar,
    LogBox,
    Dimensions,
    ScrollView,
    TextInput,
    Alert,
    ToastAndroid,
} from 'react-native';
import { Picker } from '@react-native-community/picker';

class Create extends Component {

    static navigationOptions = { headerShown: false }


    constructor() {
        super();
        LogBox.ignoreLogs(['componentWillReceiveProps', 'DatePickerAndroid', 'Functions are not valid', 'Failed prop type'])

        let today = new Date();
        let date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();

        this.state = {
            date: date,
            portArrival: '',
            assessorName: '',
            eudistomaChecked: false,
            pyuraChecked: false,
            sabellaChecked: false,
            styelaChecked: false,
            undariaChecked: false,
            newChecked: false,
            antifoul: '',
            waterblast: '',
            duration: '',
            lof: '',
            portHome: '',
            internationalVisited: false,
            aucklandVisited: false,
            bopVisited: false,
            canterburyVisited: false,
            hawkebayVisited: false,
            marlboroughVisited: false,
            nelsonVisited: false,
            northlandVisited: false,
            otagoVisited: false,
            southlandVisited: false,
            taranakiVisited: false,
            tasmanVisited: false,
            waikatoVisited: false,
            wellingtonVisited: false,
            notes: '',
            output: '',
            outputReason: '',
            antifoulUnknown: false,
            waterblastUnknown: false,
            vesselName: '',
            ownerName: '',
            ownerContact: '',
            lessOne: false,
            greatTwelve: false,
            portArrivalOther: '',
            portHomeOther: ''
        };
    }

    calculateOutput() {

        let incomplete = false;

        let fields = 'You must complete the following fields before submitting:\n';

        if (this.state.portArrival === '' && this.state.portArrivalOther === '') {
            fields += '\n- Place of assessment'
            incomplete = true;
        }
        if (this.state.assessorName === '') {
            fields += '\n- Assessor name'
            incomplete = true;
        }
        if (this.state.vesselName === '') {
            fields += '\n- Vessel name'
            incomplete = true;
        }
        if (this.state.ownerName === '') {
            fields += '\n- Owner name'
            incomplete = true;
        }
        if (this.state.ownerContact === '') {
            fields += '\n- Owner contact details'
            incomplete = true;
        }
        if (this.state.antifoul == '' && this.state.antifoulUnknown == false) {
            fields += '\n- Months since last antifoul'
            incomplete = true;
        }
        if (this.state.waterblast == '' && this.state.waterblastUnknown == false) {
            fields += '\n- Months since last waterblast'
            incomplete = true;
        }
        if (this.state.duration == '' && !this.state.lessOne && !this.state.greatTwelve) {
            fields += '\n- Duration of stay'
            incomplete = true;
        }
        if (this.state.lof === '') {
            fields += '\n- LOF visible from the surface'
            incomplete = true;
        }
        if (this.state.portHome === '' && this.state.portHomeOther === '') {
            fields += '\n- Vessels home port'
            incomplete = true;
        }

        if (!this.state.internationalVisited && !this.state.aucklandVisited && !this.state.bopVisited && !this.state.canterburyVisited &&
            !this.state.hawkebayVisited && !this.state.marlboroughVisited && !this.state.nelsonVisited && !this.state.northlandVisited &&
            !this.state.otagoVisited && !this.state.southlandVisited && !this.state.taranakiVisited && !this.state.tasmanVisited &&
            !this.state.waikatoVisited && !this.state.wellingtonVisited) {
            fields += '\n- Regions visited since last antifoul'
            incomplete = true;
        }

        if (incomplete) {
            Alert.alert(
                'Form Incomplete',
                fields,
                [
                    { text: 'OK' },
                ],
                { cancelable: false }
            );
            return;
        }

        let first = true;
        let duplicate = false;
        let duplicateMessage = 'Error: duplicate input detected ('

        if (this.state.portArrival != '' && this.state.portArrivalOther != '') {
            duplicateMessage += 'place of assessment'
            first = false;
            duplicate = true;
        }

        if (this.state.antifoulUnknown && this.state.antifoul != '') {
            if (first) {
                duplicateMessage += 'antifoul months'
                first = false;
            } else {
                duplicateMessage += ', antifoul months'
            }
            duplicate = true;
        }

        if (this.state.waterblastUnknown && this.state.waterblast != '') {
            if (first) {
                duplicateMessage += 'waterblast months'
                first = false;
            } else {
                duplicateMessage += ', waterblast months'
            }
            duplicate = true;
        }

        if (this.state.duration != '' && this.state.lessOne && !this.state.greatTwelve) {
            if (first) {
                duplicateMessage += 'stay duration'
                first = false;
            } else {
                duplicateMessage += ', stay duration'
            }
            duplicate = true;
        }

        if (this.state.duration != '' && !this.state.lessOne && this.state.greatTwelve) {
            if (first) {
                duplicateMessage += 'stay duration'
                first = false;
            } else {
                duplicateMessage += ', stay duration'
            }
            duplicate = true;
        }

        if (this.state.duration === '' && this.state.lessOne && this.state.greatTwelve) {
            if (first) {
                duplicateMessage += 'stay duration'
                first = false;
            } else {
                duplicateMessage += ', stay duration'
            }
            duplicate = true;
        }

        if (this.state.duration != '' && this.state.lessOne && this.state.greatTwelve) {
            if (first) {
                duplicateMessage += 'stay duration'
                first = false;
            } else {
                duplicateMessage += ', stay duration'
            }
            duplicate = true;
        }

        if (this.state.portHome != '' && this.state.portHomeOther != '') {
            if (first) {
                duplicateMessage += 'home port'
                first = false;
            } else {
                duplicateMessage += ', home port'
            }
            duplicate = true;
        }

        duplicateMessage += ')';

        if (duplicate) {
            ToastAndroid.showWithGravityAndOffset(
                duplicateMessage,
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                0,
                50
            );
            return;
        }

        let foul = this.state.antifoul
        let blast = this.state.waterblast
        let dur = this.state.duration
        let arrival = ''
        let home = ''

        if (this.portArrival != '') {
            arrival = this.state.portArrival
        } else {
            arrival = this.state.portArrivalOther
        }

        if (this.state.portHome != '') {
            home = this.state.portHome
        } else {
            home = this.state.portHomeOther
        }

        if (this.state.antifoulUnknown) {
            foul = '24'
        }
        if (this.state.waterblastUnknown) {
            blast = foul;
        }
        if (this.state.lessOne) {
            dur = '0.5'
        }
        if (this.state.greatTwelve) {
            dur = '13'
        }

        if (parseFloat(blast) > parseFloat(foul)) {
            ToastAndroid.showWithGravityAndOffset(
                'Error: months since waterblast cannot be greater than months since antifoul.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                0,
                50
            );
            return;
        }

        if ((this.state.eudistomaChecked || this.state.pyuraChecked || this.state.sabellaChecked || this.state.styelaChecked || this.state.undariaChecked ||
            this.state.newChecked) && parseInt(this.state.lof) === 1) {
            ToastAndroid.showWithGravityAndOffset(
                'Error: LOF cannot be equal to 1 with designated pests present.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                0,
                50
            );
            return;
        }

        if (this.state.eudistomaChecked || this.state.pyuraChecked || this.state.sabellaChecked || this.state.styelaChecked || this.state.undariaChecked || this.state.newChecked) {
            let reason = 'Recommended that vessel is hauled and waterblasted.\n\nDesignated pests present:';
            if (this.state.eudistomaChecked) {
                reason += '\n- Eudistoma';
            }
            if (this.state.pyuraChecked) {
                reason += '\n- Pyura';
            }
            if (this.state.sabellaChecked) {
                reason += '\n- Sabella';
            }
            if (this.state.styelaChecked) {
                reason += '\n- Styela';
            }
            if (this.state.undariaChecked) {
                reason += '\n- Undaria';
            }
            if (this.state.newChecked) {
                reason += '\n- Suspected new pest';
            }
            Alert.alert(
                'FAIL',
                reason,
                [
                    { text: 'OK' },
                ],
                { cancelable: false }
            );

            return;
        } else {
            if (parseFloat(foul) < 6 || parseFloat(blast) < 1) {
                if (parseFloat(dur) > 12 || parseInt(this.state.lof) > 2) {
                    let reason = 'Recommended that vessel has dive inspection and/or further advice is sought from expert.\n';
                    if (parseFloat(dur) > 12) {
                        reason += '\n- Vessel has intended stay of more than 12 months.\n';
                    }
                    if (parseInt(this.state.lof) > 2) {
                        reason += '\n- Vessel has a LOF greater than 2.';
                    }
                    Alert.alert(
                        'INSPECT',
                        reason,
                        [
                            { text: 'OK' },
                        ],
                        { cancelable: false }
                    );

                    return;
                } else {
                    if (parseFloat(dur) < 1) {
                        Alert.alert(
                            'PASS',
                            'Vessel meets safe berthing criteria.',
                            [
                                { text: 'OK' },
                            ],
                            { cancelable: false }
                        );

                        return;
                    }
                    if (parseFloat(dur) >= 1 && parseFloat(dur) <= 12) {
                        if (parseFloat(blast) < 1) {
                            Alert.alert(
                                'PASS',
                                'Vessel meets safe berthing criteria.',
                                [
                                    { text: 'OK' },
                                ],
                                { cancelable: false }
                            );
                            return;
                        } else {
                            let reason = 'Recommended that vessel has dive inspection and/or further advice is sought from expert.\n\n';
                            reason += '- Vessel has intended stay of between 1 and 12 months.\n\n- Vessel has not had a lift and complete waterblast in the past month.';
                            Alert.alert(
                                'INSPECT',
                                reason,
                                [
                                    { text: 'OK' },
                                ],
                                { cancelable: false }
                            );
                            return;
                        }
                    }
                }
            } else {
                let reason = '';
                reason += '\n- Vessel does not comply with 6 or 1 rule.\n';
                if (parseFloat(dur) > 12 || parseInt(this.state.lof) > 2) {
                    if (parseFloat(dur) > 12) {
                        reason += '\n- Vessel has intended stay of more than 12 months.\n';
                    }
                    if (parseInt(this.state.lof) > 2) {
                        reason += '\n- Vessel has a LOF greater than 2.';
                    }
                    reason = 'Recommended that vessel is hauled and waterblasted.\n\n' + reason;
                    Alert.alert(
                        'FAIL',
                        reason,
                        [
                            { text: 'OK' },
                        ],
                        { cancelable: false }
                    );
                    return;
                } else {
                    reason = 'Recommended that vessel has dive inspection and/or further advice is sought from expert.\n' + reason;
                    Alert.alert(
                        'INSPECT',
                        reason,
                        [
                            { text: 'OK' },
                        ],
                        { cancelable: false }
                    );

                    return;
                }
            }
        }
    }

    render() {
        return (
            <ScrollView style={styles.viewStyle}>
                <StatusBar backgroundColor='#4655A9' barStyle="light-content" />
                <Text style={styles.dateTitleText}>Date</Text>
                <DatePicker
                    style={{ width: 150 }}
                    date={this.state.date}
                    mode="date"
                    format="DD-MM-YYYY"
                    minDate="01-01-2020"
                    maxDate="01-01-2100"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: Dimensions.get("window").width * 0.02,
                        },
                        dateInput: {
                            marginLeft: Dimensions.get("window").width * 0.02 + 40,
                            backgroundColor: '#FAFAFA'
                        }
                    }}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                />


                <Text style={styles.portTitleText}>Place of assessment (select option or type)</Text>
                <View style={{ backgroundColor: '#FAFAFA', marginLeft: Dimensions.get("window").width * 0.03, marginRight: Dimensions.get("window").width - Dimensions.get("window").width * 0.03 - 170 }}>
                    <Picker
                        selectedValue={this.state.portArrival}
                        color="#FFFFFF"
                        style={{ height: 40, width: 170 }}
                        onValueChange={(itemValue) => {
                            this.setState({ portArrival: itemValue })
                        }
                        }>
                        <Picker.Item label="..." value="" />
                        <Picker.Item label="Waikawa" value="waikawa" />
                        <Picker.Item label="Picton" value="picton" />
                        <Picker.Item label="Havelock" value="havelock" />
                        <Picker.Item label="Nelson" value="nelson" />
                        <Picker.Item label="Motueka" value="motueka" />
                        <Picker.Item label="Tarakohe" value="tarakohe" />
                    </Picker>
                </View>
                <TextInput style={styles.inputBoxOther}
                    onChangeText={(itemValue) =>
                        this.setState({ portArrivalOther: itemValue })}>
                </TextInput>

                <View
                    style={{
                        marginTop: 22,
                        borderBottomColor: 'rgba(70,85,169,0.5)',
                        borderBottomWidth: 1,
                        marginLeft: 5,
                        marginRight: 5
                    }}
                />

                <Text style={styles.assessorTitleText}>Assessor name</Text>
                <TextInput style={styles.inputBox}
                    onChangeText={(itemValue) =>
                        this.setState({ assessorName: itemValue })}>
                </TextInput>



                <Text style={styles.assessorTitleText}>Vessel name</Text>
                <TextInput style={styles.inputBox}
                    onChangeText={(itemValue) =>
                        this.setState({ vesselName: itemValue })}>
                </TextInput>

                <Text style={styles.assessorTitleText}>Owner name</Text>
                <TextInput style={styles.inputBox}
                    onChangeText={(itemValue) =>
                        this.setState({ ownerName: itemValue })}>
                </TextInput>

                <Text style={styles.assessorTitleText}>Owner contact details</Text>
                <TextInput style={styles.inputBox}
                    onChangeText={(itemValue) =>
                        this.setState({ ownerContact: itemValue })}>
                </TextInput>

                <View
                    style={{
                        marginTop: 22,
                        borderBottomColor: 'rgba(70,85,169,0.5)',
                        borderBottomWidth: 1,
                        marginLeft: 5,
                        marginRight: 5
                    }}
                />

                <Text style={styles.pestsTitleText}>Select all designated pests present</Text>
                <CheckBox
                    title='Eudistoma'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    value={this.state.eudistomaChecked}
                    checked={this.state.eudistomaChecked}
                    onPress={() => this.setState({ eudistomaChecked: !this.state.eudistomaChecked })}
                />
                <CheckBox
                    title='Pyura'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    value={this.state.pyuraChecked}
                    checked={this.state.pyuraChecked}
                    onPress={() => this.setState({ pyuraChecked: !this.state.pyuraChecked })}
                />
                <CheckBox
                    title='Sabella'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    value={this.state.sabellaChecked}
                    checked={this.state.sabellaChecked}
                    onPress={() => this.setState({ sabellaChecked: !this.state.sabellaChecked })}
                />
                <CheckBox
                    title='Styela'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    value={this.state.styelaChecked}
                    checked={this.state.styelaChecked}
                    onPress={() => this.setState({ styelaChecked: !this.state.styelaChecked })}
                />
                <CheckBox
                    title='Undaria'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    value={this.state.undariaChecked}
                    checked={this.state.undariaChecked}
                    onPress={() => this.setState({ undariaChecked: !this.state.undariaChecked })}
                />
                <CheckBox
                    title='Suspected New'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    value={this.state.newChecked}
                    checked={this.state.newChecked}
                    onPress={() => this.setState({ newChecked: !this.state.newChecked })}
                />

                <View
                    style={{
                        marginTop: 22,
                        borderBottomColor: 'rgba(70,85,169,0.5)',
                        borderBottomWidth: 1,
                        marginLeft: 5,
                        marginRight: 5
                    }}
                />


                <Text style={styles.antifoulTitleText}>How many months since last complete antifoul?</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput style={styles.inputBoxUnknown} keyboardType='numeric' autoCapitalize='words'
                        onChangeText={(itemValue) =>
                            this.setState({ antifoul: itemValue })}>
                    </TextInput>
                    <CheckBox
                        title='Unknown'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        value={this.state.antifoulUnknown}
                        checked={this.state.antifoulUnknown}
                        onPress={() => this.setState({ antifoulUnknown: !this.state.antifoulUnknown })}
                    />
                </View>


                <Text style={styles.blastTitleText}>How many months since last lift and complete waterblast?</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput style={styles.inputBoxUnknown} keyboardType='numeric' autoCapitalize='words'
                        onChangeText={(itemValue) =>
                            this.setState({ waterblast: itemValue })}>
                    </TextInput>
                    <CheckBox
                        title='Unknown'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        value={this.state.waterblastUnknown}
                        checked={this.state.waterblastUnknown}
                        onPress={() => this.setState({ waterblastUnknown: !this.state.waterblastUnknown })}
                    />
                </View>

                <Text style={styles.durationTitleText}>Duration of stay (enter months 1 to 12 or select)</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput style={styles.inputBoxUnknown} keyboardType='decimal-pad' autoCapitalize='words'
                        onChangeText={(itemValue) =>
                            this.setState({ duration: itemValue })}>
                    </TextInput>
                    <View>
                        <CheckBox
                            title='< 1 mon'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.lessOne}
                            checked={this.state.lessOne}
                            onPress={() => this.setState({ lessOne: !this.state.lessOne })}
                        />
                        <CheckBox
                            title='> 12 mon'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.greatTwelve}
                            checked={this.state.greatTwelve}
                            onPress={() => this.setState({ greatTwelve: !this.state.greatTwelve })}
                        />
                    </View>
                </View>



                <View
                    style={{
                        marginTop: 22,
                        borderBottomColor: 'rgba(70,85,169,0.5)',
                        borderBottomWidth: 1,
                        marginLeft: 5,
                        marginRight: 5
                    }}
                />

                <Text style={styles.lofTitleText}>What is the LOF visible from the surface?</Text>
                <View style={{ backgroundColor: '#FAFAFA', marginLeft: Dimensions.get("window").width * 0.03, marginRight: Dimensions.get("window").width - Dimensions.get("window").width * 0.03 - 240 }}>
                    <Picker
                        selectedValue={this.state.lof}
                        style={{ height: 40, width: 240 }}
                        onValueChange={(itemValue) => {
                            this.setState({ lof: itemValue })
                        }
                        }>
                        <Picker.Item label="..." value="" />
                        <Picker.Item label="LOF1 (No macrofouling)" value="1" />
                        <Picker.Item label="LOF2 (1-5% cover)" value="2" />
                        <Picker.Item label="LOF3 (6-15% cover)" value="3" />
                        <Picker.Item label="LOF4 (16-40% cover)" value="4" />
                        <Picker.Item label="LOF5 (>40% cover)" value="5" />
                    </Picker>
                </View>

                <Text style={styles.homeTitleText}>What is your home port? (select option or type)</Text>
                <View style={{ backgroundColor: '#FAFAFA', marginLeft: Dimensions.get("window").width * 0.03, marginRight: Dimensions.get("window").width - Dimensions.get("window").width * 0.03 - 240 }}>
                    <Picker
                        selectedValue={this.state.portHome}
                        style={{ height: 40, width: 240 }}
                        onValueChange={(itemValue) => {
                            this.setState({ portHome: itemValue })
                        }

                        }>
                        <Picker.Item label="..." value="" />
                        <Picker.Item label="International" value="international" />
                        <Picker.Item label="Northland" value="northland" />
                        <Picker.Item label="Auckland" value="auckland" />
                        <Picker.Item label="Bay of Plenty" value="bay of plenty" />
                        <Picker.Item label="Wellington" value="wellington" />
                        <Picker.Item label="Tasman" value="tasman" />
                    </Picker>
                </View>
                <TextInput style={styles.inputBoxOther}
                    onChangeText={(itemValue) =>
                        this.setState({ portHomeOther: itemValue })}>
                </TextInput>


                <View
                    style={{
                        marginTop: 22,
                        borderBottomColor: 'rgba(70,85,169,0.5)',
                        borderBottomWidth: 1,
                        marginLeft: 5,
                        marginRight: 5
                    }}
                />

                <Text style={styles.visitedTitleText}>Select all regions visited since last antifoul</Text>

                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View>
                        <CheckBox
                            title='International'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.internationalVisited}
                            checked={this.state.internationalVisited}
                            onPress={() => this.setState({ internationalVisited: !this.state.internationalVisited })}
                        />
                        <CheckBox
                            title='Auckland'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.aucklandVisited}
                            checked={this.state.aucklandVisited}
                            onPress={() => this.setState({ aucklandVisited: !this.state.aucklandVisited })}
                        />
                        <CheckBox
                            title='Bay of Plenty'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.bopVisited}
                            checked={this.state.bopVisited}
                            onPress={() => this.setState({ bopVisited: !this.state.bopVisited })}
                        />
                        <CheckBox
                            title='Canterbury'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.canterburyVisited}
                            checked={this.state.canterburyVisited}
                            onPress={() => this.setState({ canterburyVisited: !this.state.canterburyVisited })}
                        />
                        <CheckBox
                            title='Hawke Bay'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.hawkebayVisited}
                            checked={this.state.hawkebayVisited}
                            onPress={() => this.setState({ hawkebayVisited: !this.state.hawkebayVisited })}
                        />
                        <CheckBox
                            title='Marlborough'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.marlboroughVisited}
                            checked={this.state.marlboroughVisited}
                            onPress={() => this.setState({ marlboroughVisited: !this.state.marlboroughVisited })}
                        />
                        <CheckBox
                            title='Nelson'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.nelsonVisited}
                            checked={this.state.nelsonVisited}
                            onPress={() => this.setState({ nelsonVisited: !this.state.nelsonVisited })}
                        />
                    </View>
                    <View>
                        <CheckBox
                            title='Northland'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.northlandVisited}
                            checked={this.state.northlandVisited}
                            onPress={() => this.setState({ northlandVisited: !this.state.northlandVisited })}
                        />
                        <CheckBox
                            title='Otago'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.otagoVisited}
                            checked={this.state.otagoVisited}
                            onPress={() => this.setState({ otagoVisited: !this.state.otagoVisited })}
                        />



                        <CheckBox
                            title='Southland'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.southlandVisited}
                            checked={this.state.southlandVisited}
                            onPress={() => this.setState({ southlandVisited: !this.state.southlandVisited })}
                        />



                        <CheckBox
                            title='Taranaki'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.taranakiVisited}
                            checked={this.state.taranakiVisited}
                            onPress={() => this.setState({ taranakiVisited: !this.state.taranakiVisited })}
                        />


                        <CheckBox
                            title='Tasman'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.tasmanVisited}
                            checked={this.state.tasmanVisited}
                            onPress={() => this.setState({ tasmanVisited: !this.state.tasmanVisited })}
                        />


                        <CheckBox
                            title='Waikato'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.waikatoVisited}
                            checked={this.state.waikatoVisited}
                            onPress={() => this.setState({ waikatoVisited: !this.state.waikatoVisited })}
                        />


                        <CheckBox
                            title='Wellington'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            value={this.state.WellingtonVisited}
                            checked={this.state.WellingtonVisited}
                            onPress={() => this.setState({ WellingtonVisited: !this.state.WellingtonVisited })}
                        />
                    </View>
                </View>

                <Text style={styles.visitedTitleText}>Notes</Text>
                <TextInput style={styles.inputBoxNotes}
                    onChangeText={(itemValue) =>
                        this.setState({ notes: itemValue })}>
                </TextInput>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.buttonText} onPress={() => this.calculateOutput()}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    dateTitleText: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'DroidSans',
        marginBottom: 15,
        marginTop: Dimensions.get("window").width * 0.03,
        marginLeft: Dimensions.get("window").width * 0.03
    },
    portTitleText: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'DroidSans',
        marginBottom: 10,
        marginTop: 20,
        marginLeft: Dimensions.get("window").width * 0.03
    },
    assessorTitleText: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'DroidSans',
        marginBottom: 10,
        marginTop: 15,
        marginLeft: Dimensions.get("window").width * 0.03
    },
    inputBox: {
        width: Dimensions.get("window").width * 0.55,
        backgroundColor: '#FAFAFA',
        height: 46.5,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.09)',
        paddingHorizontal: 6,
        fontSize: 16,
        color: 'rgb(0,0,0)',
        marginLeft: Dimensions.get("window").width * 0.03
    },
    inputBoxNotes: {
        width: Dimensions.get("window").width - Dimensions.get("window").width * 0.04,
        backgroundColor: '#FAFAFA',
        height: 46.5,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.09)',
        paddingHorizontal: 6,
        fontSize: 16,
        color: 'rgb(0,0,0)',
        marginLeft: Dimensions.get("window").width * 0.03,
    },
    inputBoxUnknown: {
        width: Dimensions.get("window").width * 0.55,
        backgroundColor: '#FAFAFA',
        height: 46.5,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.09)',
        paddingHorizontal: 6,
        fontSize: 16,
        color: 'rgb(0,0,0)',
        marginLeft: Dimensions.get("window").width * 0.03,
        marginTop: 4.5
    },
    inputBoxOther: {
        width: Dimensions.get("window").width * 0.55,
        backgroundColor: '#FAFAFA',
        height: 46.5,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.09)',
        paddingHorizontal: 6,
        fontSize: 16,
        color: 'rgb(0,0,0)',
        marginLeft: Dimensions.get("window").width * 0.03,
        marginTop: 10
    },
    pestsTitleText: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'DroidSans',
        marginBottom: 5,
        marginTop: 15,
        marginLeft: Dimensions.get("window").width * 0.03
    },
    antifoulTitleText: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'DroidSans',
        marginBottom: 5,
        marginTop: 15,
        marginLeft: Dimensions.get("window").width * 0.03,
        marginRight: Dimensions.get("window").width * 0.03,

    },
    blastTitleText: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'DroidSans',
        marginBottom: 5,
        marginTop: 15,
        marginLeft: Dimensions.get("window").width * 0.03,
        marginRight: Dimensions.get("window").width * 0.03
    },
    durationTitleText: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'DroidSans',
        marginBottom: 5,
        marginTop: 15,
        marginLeft: Dimensions.get("window").width * 0.03,
        marginRight: Dimensions.get("window").width * 0.03
    },
    lofTitleText: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'DroidSans',
        marginBottom: 10,
        marginTop: 15,
        marginLeft: Dimensions.get("window").width * 0.03,
        marginRight: Dimensions.get("window").width * 0.03
    },
    homeTitleText: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'DroidSans',
        marginBottom: 10,
        marginTop: 15,
        marginLeft: Dimensions.get("window").width * 0.03
    },
    visitedTitleText: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'DroidSans',
        marginBottom: 5,
        marginTop: 15,
        marginLeft: Dimensions.get("window").width * 0.03,
        marginRight: Dimensions.get("window").width * 0.03
    },
    notesTitleText: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'DroidSans',
        marginBottom: 10,
        marginTop: 15,
        marginLeft: Dimensions.get("window").width * 0.03
    },
    submitButton: {
        backgroundColor: '#4655A9',
        borderRadius: 25,
        width: Dimensions.get("window").width * 0.8,
        paddingVertical: 12,
        marginTop: 20,
        marginLeft: Dimensions.get("window").width * 0.03,
        marginBottom: 20
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'DroidSans-Bold',
        color: 'rgba(255,255,255,0.75)',
        textAlign: 'center',
    },
});

export default Create;