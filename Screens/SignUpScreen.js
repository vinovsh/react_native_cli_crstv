import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native';
import Colors from '../Components/ColorPalet';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const SignUpScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        email:'',
        password: '',
        check_passwordInputChange: false,
        warning_passwordInputChange: false,
        check_textInputChange: false,
        check_emailInputChange:false,
        warning_emailInputChange:false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }


    const SignupFormSubmit = () => {

       if(data.check_textInputChange && data.check_emailInputChange && data.check_passwordInputChange){

        Alert.alert("form submited");
       }else{

        Alert.alert("please fill all data")
       }

    }


    const emailInputChange = (val) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        
        if( val.length !== 0 ) {


            if (reg.test(val) === false) {
                setData({
                    ...data,
                    email: val,
                    check_emailInputChange: false,
                    warning_emailInputChange:true
                });
              }
              else {
                setData({
                    ...data,
                    email: val,
                    check_emailInputChange: true,
                    warning_emailInputChange:false
                });
              }
           
        } else {
            setData({
                ...data,
                email: val,
                check_emailInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.length !== 0 ) {
        if(val.length>4){

            setData({
                ...data,
                password: val,
                check_passwordInputChange:true,
                warning_passwordInputChange:false
            });
        }else{

            setData({
                ...data,
                password: val,
                check_passwordInputChange:false,
                warning_passwordInputChange:true
            });
        }

    }else{
       

        setData({
            ...data,
            password: val,
            check_passwordInputChange:false,
            warning_passwordInputChange:false
        });

    }
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor={Colors.primary} barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <Text style={styles.text_footer}>Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter your email id"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => emailInputChange(val)}
                />
                {data.warning_emailInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="alert-circle"
                        color="#ff0000"
                        size={20}
                    />
                </Animatable.View>
                : data.check_emailInputChange ?
            
                <Animatable.View
                   animation="bounceIn">
                   <Feather 
                      name="check-circle"
                      color="green"
                      size={20}
                   />
                </Animatable.View>
            
            
                : null}
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />

              {data.warning_passwordInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                    style={{marginHorizontal:10}}
                >
                    <Feather 
                       name="alert-circle"
                       color="#ff0000"h
                        size={20}
                    />
                </Animatable.View>

                :data.check_passwordInputChange ?

                <Animatable.View
                   animation="bounceIn"
                   style={{marginHorizontal:10}}
                  >
                  <Feather 
                    name="check-circle"
                    color="green"
                    size={20}
                />
               </Animatable.View>

                :null}
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

           
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={SignupFormSubmit}
                >
                <LinearGradient
                    colors={['#5f64e3', Colors.primary]}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignInScreen')}
                    style={[styles.signIn, {
                        borderColor: Colors.primary,
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: Colors.primary
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: Colors.primary
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });