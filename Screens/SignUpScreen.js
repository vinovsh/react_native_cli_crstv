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
    ScrollView
} from 'react-native';

import Colors from '../Components/ColorPalet';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import {AuthContext } from '../Components/Context';
import LoadingScreen from './LoadingScreen';


/* import Users from '../model/users'; */

const SignUpScreen = ({navigation}) => {

    const[isLoading,setIsLoading]=React.useState(false);

    const [data, setData] = React.useState({
        name:'',
        email: '',
        password: '',
        check_nameInputChange:false,
        check_passwordInputChange: false,
        warning_passwordInputChange: false,
        isValidName: true,
        isValidEmail: true,
        isValidPassword: true,
        secureTextEntry:true
    });

    const { colors } = useTheme();

    

    const emailInputChange = (val) => {
        
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        
        if( val.length !== 0 ) {


            if (reg.test(val) === false) {
                setData({
                    ...data,
                    email: val,
                    check_emailInputChange: false,
                    isValidEmail: false
                });
              }
              else {
                setData({
                    ...data,
                    email: val,
                    check_emailInputChange: true,
                    isValidEmail: true
                });
              }
           
        } else {
            setData({
                ...data,
                email: val,
                check_emailInputChange: false,
                isValidEmail: false
            });
        }
    }

    const nameInputChange = (val) => {

    
        
        if( val.length !==0 ) {
          

          
                setData({
                    ...data,
                    name: val,
                    check_nameInputChange: true,
                    isValidName: true
                });
           
           
           
        } else {
            setData({
                ...data,
                name: val,
                check_nameInputChange: false,
                isValidName: false
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
                isValidEmail: true
            });
        } else {
            setData({
                ...data,
                isValidEmail: false
            });
        }
    }

    const signUpHandle = async (name,email,password) => {

      setIsLoading(true);
      if(name && email && password) {

        try{
              
            await axios.post(config.BASE_URL+'signup', {
                 name:name,
                 email: email,
                 password: password
               })
              
               .then(function (response) {
                   var data=response.data;
                
                   setIsLoading(false);
                   if(data.error==false){
                    setIsLoading(false);
                         var token=data.token;
                      

                         navigation.navigate('OtpScreen',{ token:token });
                   
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

        //SignUpFormSubmit(name,email,password);
      }else{
        setIsLoading(false);
        Alert.alert('Wrong Input!', 'Fields cannot be empty.', [
            {text: 'Okay'}
        ]);
        return;
      } 
        
       
    }

    return (
      <View style={styles.container}>

         {isLoading ? 
          <LoadingScreen color="#0003"/>
          : null}

        
          <StatusBar backgroundColor={Colors.primary} barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >

          <ScrollView
             showsHorizontalScrollIndicator={false}
             showsVerticalScrollIndicator={false}
          >

           <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
               <TextInput 
                    placeholder="Your Name"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => nameInputChange(val)}

                    />

                
                {data.check_nameInputChange ? 
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
            { data.isValidName ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Enter Name</Text>
            </Animatable.View>
            }


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
                   // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
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
            { data.isValidEmail ? null : 
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
                    onPress={() => {signUpHandle( data.name,data.email, data.password )}}
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
                        borderColor:  Colors.primary,
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color:  Colors.primary
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
        backgroundColor:  Colors.primary
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
      },
      errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
  });