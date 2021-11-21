import React,{useRef,useEffect} from 'react';
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
import LoadingScreen from './LoadingScreen';


/* import Users from '../model/users'; */

const OtpScreen = ({route,navigation}) => {

    const[isLoading,setIsLoading]=React.useState(false);
    const[message,setMessage]=React.useState('');

    const { SignInFormSubmit } = React.useContext(AuthContext);

   
    const [pin, setPin] = React.useState({
       pin1:'',
       pin2:'',
       pin3:'',
       pin4:'',
      
    });

   const ref1=useRef(null);
   const ref2=useRef(null);
   const ref3=useRef(null);
   const ref4=useRef(null);

   const { colors } = useTheme();

   useEffect(() => {
    ref1.current.focus();

  }, []);
  
    const handlePin1Change = (val) => {
        
       if(val.length==1){

        setPin({
            ...pin,
           pin1:val,
          
        });
        ref2.current.focus();
       }else if(val.length==2){

        ref2.current.focus();
       }else{
         
        setPin({
            ...pin,
           pin1:val,
          
        });
       

       }
    }

    const handlePin2Change = (val) => {
        
        if(val.length==1){
 
         setPin({
             ...pin,
            pin2:val,
           
         });
         ref3.current.focus();
        }else if(val.length==2){

            ref3.current.focus();
        }else{

            setPin({
                ...pin,
               pin2:val,
              
            });
            ref1.current.focus();
        }
     }

     const handlePin3Change = (val) => {
        
        if(val.length==1){
 
         setPin({
             ...pin,
            pin3:val,
           
         });
         ref4.current.focus();
        }else if(val.length==2){

            ref4.current.focus();
        }else{

            setPin({
                ...pin,
               pin3:val,
              
            });
            ref2.current.focus();

        }
     }

     const handlePin4Change = (val) => {
        
        if(val.length==1){
 
         setPin({
             ...pin,
            pin4:val,
           
         });
        
        }
        else if(val.length==2){

          
        }else{

            setPin({
                ...pin,
               pin4:val,
              
            });
            ref3.current.focus();
        }
     }
    

   

  

    const otpHandle = async(otp) => {

      

      if(otp.pin1 && otp.pin2 && otp.pin3 && otp.pin4){

        var otp_e=otp.pin1+otp.pin2+otp.pin3+otp.pin4;
        setIsLoading(true);
        

         try{
              
            await axios.post(config.BASE_URL+'activation', {
                 token: route.params.token,
                 otp: otp_e
               })
              
               .then(function (response) {
                   var data=response.data;
                
                   setIsLoading(false);
                   if(data.error==false){
                     
                         var token=data.token;
                         var name=data.name;
                         var email=data.email;
                         var code=data.code;
                         var referral_code=data.referral_code;
                         var stars=data.stars;
                        SignInFormSubmit(token,name,email,code,referral_code,stars);
                    
                   }else{
                      setIsLoading(false);
                     Alert.alert('Error Message!', data.message, [
                       {text: 'Okay'}
                      ]);
                      return;
                     // setMessage(data.message);
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

        alert("Fields canot be empty");
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
            <Text style={styles.text_header}>Register Now!{pin.pin1}</Text>
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
                    ref={ref1}
                    maxLength={2}
                    value={pin.pin1}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(val) => handlePin1Change(val)}
                   
                />
                  <TextInput 
                    placeholder="0"
                    placeholderTextColor="#666666"
                    style={[styles.otpInput, {
                        color: colors.text
                    }]}
                  
                    ref={ref2}
                    maxLength={2}
                    value={pin.pin2}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(val) => handlePin2Change(val)}
                   
                />
                <TextInput 
                    placeholder="0"
                    placeholderTextColor="#666666"
                    style={[styles.otpInput, {
                        color: colors.text
                    }]}
                    ref={ref3}
                    maxLength={2}
                    value={pin.pin3}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(val) => handlePin3Change(val)}
                    
                   
                />
                <TextInput 
                    placeholder="0"
                    placeholderTextColor="#666666"
                    style={[styles.otpInput, {
                        color: colors.text
                    }]}
                    ref={ref4}
                    maxLength={2}
                    value={pin.pin4}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(val) => handlePin4Change(val)}
                  
                   
                />
                
            </View>
           
            
 <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                   We sent 
                   <Text style={[ {fontWeight: 'bold'}]}>{" "}OTP</Text>
                   <Text >{" "}to your registered email id please check your </Text>
                   
                   <Text style={[{fontWeight: 'bold'}]}>{" "}Inbox</Text>
                   <Text >{" "}or </Text>
                   <Text style={[{fontWeight: 'bold'}]}>{" "}Spam</Text>
                   <Text >{" "} folder </Text>
                </Text>
                
                
            </View>
           

           
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signUp}
                    onPress={() => {otpHandle(pin)}}
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
                <Text style={{color: Colors.primary, marginTop:15}}>Resend Otp</Text>
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
        marginTop: 10
    },
    signUp: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
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
       
        
       
     },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 50
    },
    color_textPrivate: {
        color: 'grey',
        flexWrap:'wrap'
    },
  });