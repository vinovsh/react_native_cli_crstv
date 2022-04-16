import React,{useEffect,useState} from 'react';
import {View,Text,Button,StyleSheet,ActivityIndicator,ToastAndroid,Image,Dimensions,TouchableOpacity} from "react-native";
import Colors from '../ColorPalet';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import config from '../../config/config';
import axios from 'axios';
import { AuthContext } from '../Context';

import { RewardedAd, RewardedAdEventType, TestIds } from '@react-native-firebase/admob';

const width=Dimensions.get("screen").width;



 const adUnitId = config.AD_STATUS=='test'? TestIds.REWARDED : config.REWARDEd_AD_ID;


   const rewarded = RewardedAd.createForAdRequest(adUnitId, {
     requestNonPersonalizedAdsOnly: true,
     keywords: ['game', 'clothing', 'flight', 'hotel', 'travel', 'location','job','education','christian'],
   });

const ContinueScreen = props => {


  
  
   

    const [isAdLoaded, setIsAdLoaded] = useState(false);
    const [isNextQuestion, setIsNextQuestion] = useState(false);
    const [isAdLoadedAgain, setIsAdLoadedAgain] = useState(false);

    const { starsUpdate } = React.useContext(AuthContext);
    
    const navigation = useNavigation();
    const backToHome=()=>{
        navigation.navigate('Home')
    }

    const nextQuestion=()=>{ 
      if(props.totalStars >=5){
      //  props.nextQuestion();
         getdata();
      }else{
         
        ToastAndroid.show('Not enough stars..', ToastAndroid.SHORT);

      }
     
    }


    const getdata=async ()=>{
      var that=this;
    try{
            
      await axios.post(config.BASE_URL+'spend_stars', {
           token: props.token,
         
          
         })
        
         .then(function (response) {
             var data=response.data;
          
             if(data.error==false){
            
                 starsUpdate(data.total_stars);
                 props.nextQuestion()
              
             }else{
                
              ToastAndroid.show(data.message, ToastAndroid.SHORT);
              }
         })
         .catch(function (error) {
        
          ToastAndroid.show('Network unavailable', ToastAndroid.SHORT);
         
         });
      
   }catch(e){
      ToastAndroid.show('Network unavailable', ToastAndroid.SHORT);
   }
  }

  useEffect(() => {
    const eventListener = rewarded.onAdEvent((type, error, reward) => {
     
      if (type === RewardedAdEventType.LOADED) {
        setIsAdLoaded(true);
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        setIsNextQuestion(true);
      }

      if(type==="closed"){

        setIsAdLoadedAgain(!isAdLoadedAgain);
        setIsAdLoaded(false);

        
          
          console.log('next question')
           props.nextQuestion();
        
      }
    });

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, [isAdLoadedAgain]);

  
  
    return (
      <View style={styles.container}>
        
       
      

           <Animatable.View animation="bounceIn" style={styles.bottomPotion}>
           <Image style={styles.img} source={require('../../assets/images/sad.png')} />
          
               <Text style={styles.largeText}>Wrong Answer</Text>
               <View>
                   <Text>Total Stars:<Text style={{fontWeight:"700"}}>{props.totalStars}</Text></Text>  
                </View> 
               
              

               
             
           </Animatable.View>
           <Text style={styles.largeText}>Continue?</Text>

           <TouchableOpacity activeOpacity={0.8} onPress={(val) =>{

              if(isAdLoaded==true){

                rewarded.show();
              }else{

                props.displayAd_error();

              }

              
             
           
             
             }} style={[styles.adButton,{backgroundColor: isAdLoaded?'#F59137': '#f9c596'}]}>
                 <Feather 
                        name="play"
                        color="#fff"
                        size={20}
                    />
                 <Text
                      
                      style={{
                         padding:10,
                         fontSize:16,
                         fontFamily:"Montserrat-SemiBold",
                         color:"#fff",
                         lineHeight:25,
                      }}>
                      WATCH AD
                  </Text>
                  </TouchableOpacity>

           <TouchableOpacity  activeOpacity={0.6} onPress={() =>{nextQuestion()}} style={styles.ContinueButton}>
                     <Text style={styles.continueText}>Spend 5</Text>
                     <Icon 
                        name="hexagram" 
                        color='yellow'
                        size={25}
                    />
                  </TouchableOpacity>
          
        </View>
    );
}

export default ContinueScreen;

const styles = StyleSheet.create({
    container:{

        backgroundColor:"#fff",
      
      
           
        height:"100%",
        width:"100%",
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
     
       

    },
    img:{
      width:150,
      height:150,
      margin:30
    
    },
    upperPotion:{
      height:"40%",
     
      width:"100%"
    },
    bottomPotion:{
        height:"60%",
     
      width:"100%",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center"
    },
    largeText:{
        fontSize:30,
        textAlign:"center",
        marginHorizontal:35,
        fontWeight:"700",
        fontFamily:"Montserrat-SemiBold",
       
        marginTop:10
     },
     smallText:{

        fontFamily:"Montserrat-Bold",
      
        marginTop:1,
        fontSize:13,
        color:Colors.shadow,
        marginTop:10,
        textAlign:"center"
     },
     ContinueButtonCard:{
      
        marginTop:20

    },
    ContinueButton:{

        width:width/1.1,
       
      height:60,
     
        borderRadius:15,
        //backgroundColor:Colors.theamColor,
       // borderWidth: 1, 
      //  borderColor: Colors.LightBlack,
       
        //borderStyle:'solid',
        //shadowColor:Colors.shadow,
       //elevation:7,
        marginHorizontal:width/1.2,
        padding:0,
     
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10,
        backgroundColor:"#4343f4",
        
    },
    adButton:{
        width:width/1.1,
       
        minHeight:60,
     
        borderRadius:15,
 
       // borderWidth: 1, 
      //  borderColor: Colors.LightBlack,
       
        //borderStyle:'solid',
        shadowColor:Colors.shadow,
        elevation:7,
        marginHorizontal:width/1.2,
        padding:0,
     
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10,
       // backgroundColor:"#F59137"
    },
    continueText:{
       // padding:10,
        fontSize:16,
        fontFamily:"Montserrat-SemiBold",
        color:"#fff",
       // lineHeight:25,
    

    }
})