import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements'
import { ImagePicker } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    StyleSheet,
    AsyncStorage,
    Text,
    View,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Button,
} from 'react-native';

class PostDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: 'Dog',
            name: '',
            breed: '',
            sex: 'Male',
            ageMonth: '',
            typeNames: [],
            sexNames: [],
            isPetChecked: {},
            isSexChecked: {},
            petNum: 5,
            image: null,
        };
    };

    componentWillMount() {
        const typeNames = ['Dog', 'Cat', 'Fish', 'Bird', 'Reptile'];
        const sexNames = ['Male', 'Female'];
        let isPetChecked = {'Dog': true, 'Cat': false, 'Fish': false, 'Bird':false, 'Reptile': false};
        let isSexChecked = {'Male': true, 'Female': false};
        this.setState({
            typeNames: typeNames,
            isPetChecked: isPetChecked,
            sexNames: sexNames,
            isSexChecked: isSexChecked,
        });
    };

    _onPressPets(key) {
        let isPetChecked = this.state.isPetChecked;
        for(let i = 0; i < this.state.petNum; i++) {
            isPetChecked[this.state.typeNames[i]] = false;
        }
        isPetChecked[key] = true;
        this.setState({isPetChecked: isPetChecked, type: key});
    };

    _onPressSex(key) {
        let isSexChecked = this.state.isSexChecked;
        for(let i = 0; i < 2; i++) {
            isSexChecked[this.state.sexNames[i]] = false;
        }
        isSexChecked[key] = true;
        this.setState({isSexChecked: isSexChecked, sex: key});
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        //console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    submit = async() => {
        let postPetType = JSON.parse(await AsyncStorage.getItem('postPetType'));
        let postPetName = JSON.parse(await AsyncStorage.getItem('postPetName'));
        let postPetBreed = JSON.parse(await AsyncStorage.getItem('postPetBreed'));
        let postPetSex = JSON.parse(await AsyncStorage.getItem('postPetSex'));
        let postPetAgeMonth = JSON.parse(await AsyncStorage.getItem('postPetAgeMonth'));
        let postPetUri = JSON.parse(await AsyncStorage.getItem('postPetUri'));
        let isToEdit = JSON.parse(await AsyncStorage.getItem('isToEdit'));
        if(postPetName === null) {
            postPetType = [];
            postPetName = [];
            postPetBreed = [];
            postPetSex = [];
            postPetAgeMonth = [];
            postPetUri = [];
        }
        if(isToEdit !== null) {
            postPetType[isToEdit] = this.state.type;
            postPetName[isToEdit] = this.state.name;
            postPetBreed[isToEdit] = this.state.breed;
            postPetSex[isToEdit] = this.state.sex;
            postPetAgeMonth[isToEdit] = this.state.ageMonth;
            postPetUri[isToEdit] = this.state.image;
            AsyncStorage.removeItem('isToEdit');
        } else {
            postPetType.push(this.state.type);
            postPetName.push(this.state.name);
            postPetBreed.push(this.state.breed);
            postPetSex.push(this.state.sex);
            postPetAgeMonth.push(this.state.ageMonth);
            postPetUri.push(this.state.image);
        }

        AsyncStorage.setItem('postPetType', JSON.stringify(postPetType));
        AsyncStorage.setItem('postPetName', JSON.stringify(postPetName));
        AsyncStorage.setItem('postPetBreed', JSON.stringify(postPetBreed));
        AsyncStorage.setItem('postPetSex', JSON.stringify(postPetSex));
        AsyncStorage.setItem('postPetAgeMonth', JSON.stringify(postPetAgeMonth));
        AsyncStorage.setItem('postPetUri', JSON.stringify(postPetUri));
        this.props.navigation.navigate('Post');
    };

    render() {

        let pets = [];
        for(let i = 0; i < this.state.petNum; i++){
            pets.push(
                <CheckBox
                    left
                    style={{backgroundColor: 'transparent'}}
                    key={this.state.typeNames[i]}
                    title={this.state.typeNames[i]}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.state.isPetChecked[this.state.typeNames[i]]}
                    onPress={() => this._onPressPets(this.state.typeNames[i])}
                />
            )
        }

        let sex = [];
        sex.push(
            <CheckBox
                left
                style={{backgroundColor: 'transparent'}}
                key={this.state.sexNames[0]}
                title={this.state.sexNames[0]}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.isSexChecked[this.state.sexNames[0]]}
                onPress={() => this._onPressSex(this.state.sexNames[0])}
            />
        );
        sex.push(
            <CheckBox
                left
                style={{backgroundColor: 'transparent'}}
                key={this.state.sexNames[1]}
                title={this.state.sexNames[1]}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.isSexChecked[this.state.sexNames[1]]}
                onPress={() => this._onPressSex(this.state.sexNames[1])}
            />
        );

        let image = this.state.image;

        return (
            <View style={styles.container}>
                <Image style={styles.backgroundImage} source={require('../../image/main.jpg')}>
                    <KeyboardAwareScrollView>
                        <ScrollView contentContainerStyle={styles.contentContainer}>
                            <Text style={styles.textHeader}>
                                Please choose the type of your pet
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
                                Please add the breed of your pet
                            </Text>
                            <TextInput style={styles.input}
                                       onChangeText={(breed) => this.setState({breed})}
                                       value = {this.state.breed}
                                       placeholder='breed'>
                            </TextInput>
                            <Text style={styles.break}>
                                {"\n"}
                            </Text>
                            <View style={styles.border} />

                            <Text style={styles.text}>
                                Please add the name of your pet
                            </Text>
                            <TextInput style={styles.input}
                                       onChangeText={(name) => this.setState({name})}
                                       value = {this.state.name}
                                       placeholder='name'>
                            </TextInput>
                            <Text style={styles.break}>
                                {"\n"}
                            </Text>
                            <View style={styles.border} />

                            <Text style={styles.text}>
                                Please choose the sex of your pet
                            </Text>
                            <View style={styles.checkBoxContainer}>
                                <View style={styles.checkBox}>
                                    { sex }
                                </View>
                            </View>
                            <Text style={styles.break}>
                                {"\n"}
                            </Text>
                            <View style={styles.border} />

                            <Text style={styles.text}>
                                Please add the age month of your pet
                            </Text>
                            <TextInput style={styles.input}
                                       onChangeText={(ageMonth) => this.setState({ageMonth})}
                                       value = {this.state.ageMonth}
                                       placeholder='age month'>
                            </TextInput>

                            <Text style={styles.break}>
                                {"\n"}
                            </Text>
                            <View style={styles.border} />
                            <Text style={styles.break}>
                                {"\n"}
                            </Text>
                            <Button
                                title="Pick an image from camera roll"
                                onPress={this._pickImage}
                            />
                            {image &&
                            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

                            <Text style={styles.break}>
                                {"\n"}
                            </Text>
                            <View style={styles.border} />
                            <Text style={styles.break}>
                                {"\n"}
                            </Text>

                            <TouchableOpacity style={styles.button} onPress={ this.submit }>
                                <Text style={styles.buttonText}>
                                    Submit
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
        height: 40,
        backgroundColor: 'rgba(255,255,255,1)',
        marginBottom: 10,
        width: '80%',
        borderWidth: 1,
        paddingLeft: 10,
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

export default PostDetail;