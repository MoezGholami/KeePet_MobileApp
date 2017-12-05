import React, { Component } from 'react';
import Moment from 'moment';
import { CheckBox } from 'react-native-elements'
import Constant from './Constant'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            isChecked: {},
            optionsNum: 3,
            optionNames: [],
            pets: [],
            selectedPet: 'Dog',
            petNum: 5,
            isPetChecked: {},
            selectedStartDate: null,
            selectedEndDate: null,
            description: '',
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    //static navigationOptions = {header: { style:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 } } };

    onDateChange(date, type) {
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate: date,
            });
        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: null,
            });
        }
    }

    componentWillMount() {
        var isChecked = {'option1': true, 'option2': false, 'option3': false };
        var optionNames = ['option1', 'option2', 'option3'];
        var pets = ['Dog', 'Cat', 'Fish', 'Bird', 'Reptile'];
        var isPetChecked = {'Dog': true, 'Cat': false, 'Fish': false, 'Bird':false, 'Reptile': false};
        this.setState({
            isChecked: isChecked,
            optionNames: optionNames,
            pets: pets,
            isPetChecked: isPetChecked,
        });
    }

    _onPressPets(key) {
        var isPetChecked = this.state.isPetChecked;
        for(let i = 0; i < this.state.petNum; i++) {
            isPetChecked[this.state.pets[i]] = false;
        }
        isPetChecked[key] = true;
        this.setState({isPetChecked: isPetChecked, selectedPet: key});
    }

    _onPressCheckBox(key) {
        var isChecked = this.state.isChecked;
        isChecked[key] = !isChecked[key];
        this.setState({isChecked: isChecked});
    }

    send = () => {
        fetch(Constant.urlBase + 'owner/new_job_post_upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startDate: this.state.selectedStartDate,
                endDate: this.state.selectedEndDate,
                description: this.state.description,
                options: this.state.isChecked,
                selectedPet: this.state.selectedPet,
            })
        })
            .then((response) => {
                console.log(response)
                response.json()
            })
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
            .done()
    };

    render() {
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(); // Today
        const maxDate = new Date(2019, 1, 1);
        const startDate  =  selectedStartDate ? Moment(selectedStartDate).format('YYYY-MM-DD').toString() : '';
        const endDate = selectedEndDate ? Moment(selectedEndDate).format('YYYY-MM-DD').toString() : '';

        var pets = [];
        for(let i = 0; i < this.state.petNum; i++){
            pets.push(
                <CheckBox
                    left
                    style={{backgroundColor: 'transparent'}}
                    key={this.state.pets[i]}
                    title={this.state.pets[i]}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.state.isPetChecked[this.state.pets[i]]}
                    onPress={() => this._onPressPets(this.state.pets[i])}
                />
            )
        }
        var checkBox = [];
        for(let i = 0; i < this.state.optionsNum; i++){
            checkBox.push(
                <CheckBox
                    left
                    key={this.state.optionNames[i]}
                    title={this.state.optionNames[i]}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.state.isChecked[this.state.optionNames[i]]}
                    onPress={() => this._onPressCheckBox(this.state.optionNames[i])}
                />
            )
        }
        return (
            <View style={styles.container}>
                <Image style={styles.backgroundImage} source={require('../../image/main.jpg')}>
                    <KeyboardAwareScrollView>
                        <ScrollView contentContainerStyle={styles.contentContainer}>
                            <Text style={styles.textHeader}>
                                Please list the categories of pets you have
                            </Text>
                            <View style={styles.checkBoxContainer}>
                                <View style={styles.checkBox}>
                                    { pets }
                                </View>
                            </View>
                            <Text style={styles.break}>
                                {"\n"}
                            </Text>
                            <View style={styles.border} />

                            <Text style={styles.text}>
                                Please select your preferred start and end date
                            </Text>
                            <CalendarPicker
                                startFromMonday={true}
                                allowRangeSelection={true}
                                minDate={minDate}
                                maxDate={maxDate}
                                todayBackgroundColor="#d7e6f2"
                                selectedDayColor="#72cee3"
                                selectedDayTextColor="#FFFFFF"
                                onDateChange={this.onDateChange}
                            />
                            <View>
                                <Text>Selected start date: { startDate }</Text>
                                <Text>Selected end date: { endDate }</Text>
                            </View>
                            <Text style={styles.break}>
                                {"\n"}
                            </Text>
                            <View style={styles.border} />

                            <Text style={styles.text}>
                                Please add a description of your post
                            </Text>
                            <TextInput style={styles.input}
                                       multiline={true}
                                       blurOnSubmit={false}
                                       onChangeText={(description) => this.setState({description})}
                                       value = {this.state.description}
                                       placeholder='description'>
                            </TextInput>
                            <Text style={styles.break}>
                                {"\n"}
                            </Text>
                            <View style={styles.border} />

                            <Text style={styles.text}>
                                Select the add on selections
                            </Text>
                            <View style={styles.checkBoxContainer}>
                                <View style={styles.checkBox}>
                                    { checkBox }
                                </View>
                            </View>
                            <Text style={styles.break}>
                                {"\n"}
                            </Text>
                            <View style={styles.border} />
                            <Text style={styles.break}>
                                {"\n"}
                            </Text>

                            <TouchableOpacity style={styles.button} onPress={ this.send }>
                                <Text style={styles.buttonText}>
                                    post
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAwareScrollView>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    checkBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    checkBox: {
        width: '100%',
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
        // position: 'absolute',
        // justifyContent: 'center',
        // alignItems: 'stretch',
    },
    backgroundImage: {
        // flex: 1,
        // width: null,
        // height: 250,
        // alignSelf: 'stretch',
        width: null,
        height: null,
        flex: 1,
    },
    text: {
        fontSize: 20,
        backgroundColor: 'rgba(0,0,0,0)',
        margin: 10,
        paddingTop: 15,
    },
    textHeader: {
        fontSize: 20,
        backgroundColor: 'rgba(0,0,0,0)',
        margin: 10,
        paddingTop: 80,
    },
    break: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    border: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        alignSelf: 'stretch',
    },
    input: {
        height: 200,
        padding: 10,
        fontSize: 16,
        width: '80%',
        backgroundColor: 'rgba(255,255,255,1)',
        marginBottom: 10,
        borderWidth: 1,
    },
    button: {
        backgroundColor: '#2980b9',
        paddingVertical: 5,
        justifyContent: 'center',
        width: '60%',
        height: 40,
        marginBottom: 30,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 20,
    },
});

export default Post;