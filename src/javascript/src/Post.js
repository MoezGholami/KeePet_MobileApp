import React, { Component } from 'react';
import Moment from 'moment';
import Constant from './Constant';
import { CheckBox } from 'react-native-elements'
import CalendarPicker from 'react-native-calendar-picker';
import { Button as ButtonBase, List, ListItem, Thumbnail, Body, SwipeRow, Icon } from 'native-base';
import IconEntypo from '@expo/vector-icons/Entypo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    Button,
} from 'react-native';

class Post extends Component<{}> {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            imageUrls: [],
            types: [],
            names: [],
            breeds: [],
            sex: [],
            ageMonths: [],
            selectedStartDate: null,
            selectedEndDate: null,
            description: '',
            isChecked: {},
            optionsNum: 3,
            optionNames: [],
            lat: null,
            lon: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    componentWillMount() {
        var isChecked = {'option1': true, 'option2': false, 'option3': false };
        var optionNames = ['option1', 'option2', 'option3'];
        this.setState({
            isChecked: isChecked,
            optionNames: optionNames,
        });
    }

    componentDidMount() {
        this._loadInitialState().done;
    }

    _loadInitialState = async() => {
        let types = JSON.parse(await AsyncStorage.getItem('postPetType'));
        let names = JSON.parse(await AsyncStorage.getItem('postPetName'));
        let breeds = JSON.parse(await AsyncStorage.getItem('postPetBreed'));
        let sex = JSON.parse(await AsyncStorage.getItem('postPetSex'));
        let ageMonths = JSON.parse(await AsyncStorage.getItem('postPetAgeMonth'));
        let imageUrls = JSON.parse(await AsyncStorage.getItem('postPetUri'));
        let locationPost = JSON.parse(await AsyncStorage.getItem('locationPost'));
        let title = await AsyncStorage.getItem('postTitle');
        let selectedStartDate = await AsyncStorage.getItem('selectedStartDate');
        let selectedEndDate = await AsyncStorage.getItem('selectedEndDate');
        let description = await AsyncStorage.getItem('postDescription');
        if(title !== null) {
            this.setState({
                title: title,
            })
        }
        if(selectedStartDate !== null) {
            this.setState({
                selectedStartDate: selectedStartDate,
            })
        }
        if(selectedEndDate !== null) {
            this.setState({
                selectedEndDate: selectedEndDate,
            })
        }
        if(description !== null) {
            this.setState({
                description: description,
            })
        }
        if(types !== null) {
            this.setState({
                types: types,
            })
        }
        if(names !== null) {
            this.setState({
                names: names,
            })
        }
        if(breeds !== null) {
            this.setState({
                breeds: breeds,
            })
        }
        if(sex !== null) {
            this.setState({
                sex: sex,
            })
        }
        if(ageMonths !== null) {
            this.setState({
                ageMonths: ageMonths,
            })
        }
        if(imageUrls !== null) {
            this.setState({
                imageUrls: imageUrls,
            })
        }
        if(locationPost !== null) {
            this.setState({
                lat: locationPost.lat,
                lon: locationPost.lon,
            })
        }
    }

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

    _onPressCheckBox(key) {
        var isChecked = this.state.isChecked;
        isChecked[key] = !isChecked[key];
        this.setState({isChecked: isChecked});
    }

    _onPressDelete(key) {
        let types = this.state.types;
        let names = this.state.names;
        let breeds = this.state.breeds;
        let sex = this.state.sex;
        let ageMonths = this.state.ageMonths;
        let imageUrls = this.state.imageUrls;
        types.splice(key, 1);
        names.splice(key, 1);
        breeds.splice(key, 1);
        sex.splice(key, 1);
        ageMonths.splice(key, 1);
        imageUrls.splice(key, 1);
        this.setState({
            types: types,
            names: names,
            breeds: breeds,
            sex: sex,
            ageMonth: ageMonths,
            imageUrls: imageUrls,
        });
        AsyncStorage.setItem('postPetType', JSON.stringify(types));
        AsyncStorage.setItem('postPetName', JSON.stringify(names));
        AsyncStorage.setItem('postPetBreed', JSON.stringify(breeds));
        AsyncStorage.setItem('postPetSex', JSON.stringify(sex));
        AsyncStorage.setItem('postPetAgeMonth', JSON.stringify(ageMonths));
        AsyncStorage.setItem('postPetUri', JSON.stringify(imageUrls));
    }

    _onPressEdit(key) {
        console.log(key)

        AsyncStorage.setItem('isToEdit', JSON.stringify(key));
        this.props.navigation.navigate('PostDetail');
    }

    send = () => {
        // fetch(Constant.urlBase + 'owner/new_job_post_upload', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         startDate: this.state.selectedStartDate,
        //         endDate: this.state.selectedEndDate,
        //         description: this.state.description,
        //         options: this.state.isChecked,
        //         selectedPet: this.state.selectedPet,
        //     })
        // })
        //     .then((response) => {
        //         console.log(response)
        //         response.json()
        //     })
        //     .then((res) => {
        //         console.log(res)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        //     .done()
        AsyncStorage.removeItem('postPetType')
        AsyncStorage.removeItem('postPetName')
        AsyncStorage.removeItem('postPetBreed')
        AsyncStorage.removeItem('postPetSex')
        AsyncStorage.removeItem('postPetAgeMonth')
        AsyncStorage.removeItem('postPetUri')
        AsyncStorage.removeItem('locationPost')
        AsyncStorage.removeItem('postTitle')
        AsyncStorage.removeItem('selectedStartDate')
        AsyncStorage.removeItem('selectedEndDate')
        AsyncStorage.removeItem('postDescription')
        AsyncStorage.removeItem('isChecked')
        this.props.navigation.navigate('Profile');
    };

    render() {

        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(); // Today
        const maxDate = new Date(2019, 1, 1);
        const startDate  =  selectedStartDate ? Moment(selectedStartDate).format('YYYY-MM-DD').toString() : '';
        const endDate = selectedEndDate ? Moment(selectedEndDate).format('YYYY-MM-DD').toString() : '';

        if(this.state.title !== '')
            AsyncStorage.setItem('postTitle', this.state.title);
        if(this.state.selectedStartDate !== null)
            AsyncStorage.setItem('selectedStartDate', this.state.selectedStartDate);
        if(this.state.selectedEndDate !== null)
            AsyncStorage.setItem('selectedEndDate', this.state.selectedEndDate);
        if(this.state.description !== '')
            AsyncStorage.setItem('postDescription', this.state.description);

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

        let listItem = [];
        for(let i = 0; i < this.state.types.length;i++) {
            listItem.push(
                <SwipeRow
                    key={i}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    left={
                        <ButtonBase success onPress={() => this._onPressEdit(i)}>
                            <IconEntypo active name="edit" />
                        </ButtonBase>
                    }
                    body={
                        <View style={styles.listItem}>
                            <View>
                                <Thumbnail style={styles.thumbnail} square size={80} source={{uri: this.state.imageUrls[i]}}/>
                            </View>
                            <View>
                                <Text style={styles.listType}>{this.state.types[i]}</Text>
                                <Text note style={styles.listNote}>{this.state.names[i]}</Text>
                            </View>
                        </View>
                    }
                    right={
                        <ButtonBase danger onPress={() => this._onPressDelete(i)}>
                            <Icon active name="trash" />
                        </ButtonBase>
                    }
                />
            )
        }

        return (
            <View style={styles.container}>
                <Image style={styles.backgroundImage} source={require('../../image/main.jpg')}>
                    <KeyboardAwareScrollView>
                        <ScrollView contentContainerStyle={styles.contentContainer}>

                            <Text style={styles.text}>
                                Please add a title
                            </Text>
                            <TextInput style={styles.input}
                                       onChangeText={(title) => this.setState({title})}
                                       value = {this.state.title}
                                       placeholder='title'>
                            </TextInput>

                            <Text style={styles.break}>
                                {"\n"}
                            </Text>
                            <View style={styles.border} />

                            <Text style={styles.textSecond}>
                                Please add your pet information
                            </Text>
                            <View style={styles.manageList}>
                                <IconEntypo
                                    name='plus'
                                    color='#4169E1'
                                    size={32}
                                    style={styles.listIcon}
                                    onPress={ this._onPressAdd }
                                >
                                </IconEntypo>
                                <View style={styles.border} />
                                <List>
                                    { listItem }

                                </List>

                            </View>

                            <Text style={styles.break}>
                                {"\n"}
                            </Text>
                            <View style={styles.border} />

                            <Text style={styles.textSecond}>
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

                            <Text style={styles.textSecond}>
                                Please add a description of your post
                            </Text>
                            <TextInput style={styles.inputDes}
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
                            <Text style={styles.break}>
                                {"\n"}
                            </Text>

                            <Button
                                title="Pick your location."
                                onPress={this._pickLocation}
                            />
                            <View>
                                <Text>latitude: { this.state.lat }</Text>
                                <Text>longitude: { this.state.lon }</Text>
                            </View>
                            <Text style={styles.break}>
                                {"\n"}
                            </Text>
                            <View style={styles.border} />

                            <Text style={styles.textSecond}>
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

                            <ButtonBase style={styles.button} primary onPress={ this.send }>
                                <Text style={styles.buttonText}>
                                    post
                                </Text>
                            </ButtonBase>

                        </ScrollView>
                    </KeyboardAwareScrollView>
                </Image>
            </View>
        )
    }

    _onPressAdd = () => {
        this.props.navigation.navigate('PostDetail')
    }

    _pickLocation = () => {
        this.props.navigation.navigate('MapPicker')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        width: null,
        height: null,
        flex: 1,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 20,
        backgroundColor: 'rgba(0,0,0,0)',
        marginBottom: 10,
        marginTop: 80,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,1)',
        marginBottom: 10,
        width: '80%',
        borderWidth: 1,
        paddingLeft: 10,
    },
    manageList: {
        alignSelf: 'stretch',
        flex: 1,
        borderWidth: 1,
    },
    textSecond: {
        fontSize: 20,
        backgroundColor: 'rgba(0,0,0,0)',
        margin: 10,
        paddingTop: 15,
    },
    break: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    border: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        alignSelf: 'stretch',
    },
    inputDes: {
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
        alignSelf: 'center',
        width: '60%',
        height: 40,
        marginBottom: 30,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 20,
    },
    checkBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    checkBox: {
        width: '80%',
        backgroundColor: 'transparent',
    },
    listType: {
        paddingLeft: 10,
        paddingBottom: 5,
        fontSize: 20,
    },
    listNote: {
        paddingLeft: 10,
        fontSize: 16
    },
    listIcon: {
        paddingLeft: 20,
    },
    listItem: {
        flexDirection: 'row',
    },
    thumbnail: {
        paddingHorizontal: 20,
    }
});

export default Post;