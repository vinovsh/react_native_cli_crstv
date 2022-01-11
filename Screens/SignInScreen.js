import React from 'react';
import config from '../config/config';
import axios from 'axios';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Dimensions,
    Linking
} from 'react-native';
import Colors from '../Components/ColorPalet';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../Components/Context';
import { color } from 'react-native-reanimated';
import LoadingScreen from './LoadingScreen';

/* import Users from '../model/users'; */

const height=Dimensions.get('window').height;
const SignUpScreen = ({navigation}) => {
    
    const[isLoading,setIsLoading]=React.useState(false);
    const[message,setMessage]=React.useState('');

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_passwordInputChange: false,
        warning_passwordInputChange: false,
        isValidUser: true,
        isValidPassword: true,
        secureTextEntry:true
    });

    const { colors } = useTheme();

    const { SignInFormSubmit } = React.useContext(AuthContext);

    const emailInputChange = (val) => {
        
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        
        if( val.length !== 0 ) {


            if (reg.test(val) === false) {
                setData({
                    ...data,
                    email: val,
                    check_emailInputChange: false,
                    isValidUser: false
                });
              }
              else {
                setData({
                    ...data,
                    email: val,
                    check_emailInputChange: true,
                    isValidUser: true
                });
              }
           
        } else {
            setData({
                ...data,
                email: val,
                check_emailInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = async(email, password) => {

        setIsLoading(true);

        if ( email.length == 0 || password.length == 0 ) {
            setIsLoading(false);
            Alert.alert('Wrong Input!', 'email or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }else if(data.isValidPassword && data.isValidUser){
           
            try{
              
               await axios.post(config.BASE_URL+'login', {
                    email: email,
                    password: password
                  })
                 
                  .then(function (response) {
                      var data=response.data;
                   
                      setIsLoading(false);
                      if(data.error==false){
                        if(data.status==1){
                            var token=data.token;
                            var name=data.name;
                            var profile=data.profile;
                            var email=data.email;
                            var code=data.code;
                            var referral_code=data.referral_code;
                            var stars = data.stars;
                            var banner_ad_id= data.banner_ad_id;
                            var reward_ad_id = data.reward_ad_id;
                           SignInFormSubmit(token,name,profile,email,code,referral_code,stars,banner_ad_id,reward_ad_id);
                        }else{

                            navigation.navigate('OtpScreen',{ token:data.token });
                        }
                      }else{
                         setIsLoading(false);
                         Alert.alert('Error Message!', data.message, [
                          {text: 'Okay'}
                         ]);
                         return;
                       }
                  })
                  .catch(function (error) {
                    setIsLoading(false);
                         Alert.alert('Error Message!', JSON.stringify(error.message), [
                          {text: 'Okay'}
                         ]);
                         return;
                  });
               
            }catch(e){
                setIsLoading(false);
                Alert.alert('Error Message!', JSON.stringify(e.message), [
                  {text: 'Okay'}
                ]);
                return;
            }
         
        }else{
            setIsLoading(false);
            Alert.alert('Wrong Input!', 'Please fill valid data', [
                {text: 'Okay'}
            ]);
        }

       
    }

    return (
      <View style={styles.container}>
          {isLoading ? 
          <LoadingScreen color="#0003"/>
          : null}

         {message ? 
           <Animatable.View animation="bounceIn" style={styles.Logmessagebox}>

              <Text style={styles.Logmessage}>{message}</Text>
           </Animatable.View>
           
          : null}
          <StatusBar backgroundColor={color.primary} barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => emailInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_emailInputChange ? 
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
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Invalid Email id</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
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
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            
             <Text onPress={()=>{Linking.openURL(config.BASE_URL_WEB+"user-forgot-password")}} style={{marginTop:10}}>Forgot Your Password?</Text>
           
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signUp}
                    onPress={() => {loginHandle( data.email, data.password )}}
                >
                <LinearGradient
                    colors={['#5f64e3', Colors.primary]}
                    style={styles.signUp}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signUp, {
                        borderColor:  Colors.primary,
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: Colors.primary
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
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
        flex: 3,
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
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signUp: {
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
    Logmessagebox:{
       position:"absolute" ,
       top:50,
       
       borderRadius:10,
       flexDirection:"row",
       justifyContent:"center",
       width:"100%",
       zIndex:11
      
    },
    Logmessage:{
     
        borderRadius:10,
        backgroundColor:"#E48F2A",
        padding:6,
        lineHeight:25,
        color:"#fff",
        fontSize:15
       
        
       
     }
  });