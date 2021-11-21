import React from 'react';
import {View,Text,Button,StyleSheet,ToastAndroid, TouchableOpacity,Dimensions,TextInput,Alert,ActivityIndicator} from "react-native";
import * as Animatable from 'react-native-animatable';
import config from '../../config/config';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const width=Dimensions.get('window').width;
const ReferralModal = (props) => {
    
    var token=props.token;
    const navigation = useNavigation();
    const[errorMessage,setErrorMessage]=React.useState();
    const[referralCode,setReferralCode]=React.useState();
    const[isLoading,setIsLoading]=React.useState(false);

    
    const{colors}=useTheme();
    const modalControll=()=>{
       props.modalControll();
    }  

    const handleReferralChange=(val)=>{

        setReferralCode(val)
    }

    const show_referral_button=()=>{

        props.show_referral_button_Update();
        ToastAndroid.show('Successfully Updated', ToastAndroid.SHORT);
    }

    const onSubmit=async ()=>{
        setIsLoading(true);
        if(referralCode){
          
            try{
              
                await axios.post(config.BASE_URL+'referral_update', {
                    token: token,
                    code:referralCode
                    
                   })
                  
                   .then(function (response) {
                       var data=response.data;
                    
                       
                       if(data.error==false){
                          setIsLoading(true);
                          setErrorMessage('');
                          modalControll();
                       
                         show_referral_button();
                       }else{
                          setIsLoading(false);
                          setErrorMessage(data.message);
                          
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

            Alert.alert('Error Message!', 'Field cannot be empty', [
                {text: 'Okay'}
               ]);

        }
    }
  
   
    return (
        <View visible={true}  style={styles.container}>
          <View style={styles.header}>
          
          </View>

          <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
          >
         <View style={{position:'absolute',top:10,right:15}}>
            <TouchableOpacity  onPress={()=>{modalControll()}} activeOpacity={0.4}>
              <Icon  name="close"  size={30} color={'#000'}/>  
            </TouchableOpacity>
         </View>     
           
           <View  style={{width:'100%',height:50,alignItems:'center',marginTop:10}}>

              <Text style={{textAlign:'center',margin:10,color:"red"}}>{errorMessage}</Text>
           </View>
           
          <View style={{width:'100%',height:50,alignItems:'center',marginTop:10}}>
              
            <TextInput 
                    placeholder="Enter your friend referral code"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handleReferralChange(val)}
                   
                />
          </View>

          {isLoading?

              <View style={styles.button}>
              
                <Text style={{fontSize:20,color:'#fff'}}><ActivityIndicator size="small" color={Colors.primary}/> Updating..</Text>
             </View>
          
           :

            <TouchableOpacity activeOpacity={0.6} onPress={()=>{onSubmit()}}>
               <View style={styles.button}>
              
                  <Text style={{fontSize:20,color:'#fff'}}>Update</Text>
               </View>
            </TouchableOpacity>

           }
          
        </Animatable.View>
        </View>
    );
}

export default ReferralModal;

const styles = StyleSheet.create({
    container:{

        zIndex:10,
       
        height:"100%",
        width:width,
        position:"absolute",
       
    },
    header:{
     
    

        backgroundColor:'#00000052',
        height:"100%",
        width:width,
       
    },
    footer: {
    
        position:"absolute",
        bottom:0,
       
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
       
        height:200,
        width:width,
        flex:1,
        flexDirection:'column',
        justifyContent:"center",
        
       // alignItems:'center'
    
    },
    button:{
        height:50,
        width:"90%",
        backgroundColor:Colors.primary,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        bottom:0,
        left:"5%",
        marginTop:20,
        marginBottom:20
        
       
    },
    textInput: {
      
        borderColor:'#959191',
        borderRadius:10,
        color: '#05375a',
        width:'80%',
        borderWidth:1,
        fontSize:20
    }
})