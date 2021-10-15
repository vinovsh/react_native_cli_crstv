import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import Colors from '../Components/ColorPalet';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../Components/Context';
import { color } from 'react-native-reanimated';

/* import Users from '../model/users'; */

const OtpScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        otp: '',
        
    });

    const { colors } = useTheme();

    //const { SignInFormSubmit } = React.useContext(AuthContext);

    

    const handleOtpChange = (val) => {
      
            setData({
                ...data,
                otp: val,
            
            });
      
        }
    

   

  

    const otpHandle = (otp) => {

      

       alert("ok");

       
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor={color.primary} barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
         
            <View style={styles.otpFields}>
              
                <TextInput 
                    placeholder="0"
                    placeholderTextColor="#666666"
                    style={[styles.otpInput, {
                        color: colors.text
                    }]}
                    maxLength={1}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(val) => handleOtpChange(val)}
                   
                />

                  <TextInput 
                    placeholder="0"
                    placeholderTextColor="#666666"
                    style={[styles.otpInput, {
                        color: colors.text
                    }]}
                    maxLength={1}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(val) => handleOtpChange(val)}
                   
                />
                <TextInput 
                    placeholder="0"
                    placeholderTextColor="#666666"
                    style={[styles.otpInput, {
                        color: colors.text
                    }]}
                    maxLength={1}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(val) => handleOtpChange(val)}
                   
                />
                <TextInput 
                    placeholder="0"
                    placeholderTextColor="#666666"
                    style={[styles.otpInput, {
                        color: colors.text
                    }]}
                    maxLength={1}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(val) => handleOtpChange(val)}
                   
                />
                
            </View>
           
            

           

           
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signUp}
                    onPress={() => {otpHandle( data.otp )}}
                >
                <LinearGradient
                    colors={['#5f64e3', Colors.primary]}
                    style={styles.signUp}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Verify OTP</Text>
                </LinearGradient>
                </TouchableOpacity>

                
            </View>

            <TouchableOpacity>
                <Text style={{color: '#009387', marginTop:15}}>Resend Otp</Text>
            </TouchableOpacity>
        </Animatable.View>
      </View>
    );
};

export default OtpScreen;

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
    otpInput: {
       borderColor:Colors.primary,
       borderWidth:1,
       width:"15%",
       textAlign:"center",
       fontSize:25,
       borderRadius:10
    },
    otpFields:{

       flexDirection:"row",
       marginTop:50,
       justifyContent:"space-evenly"
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 60
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
    }
  });