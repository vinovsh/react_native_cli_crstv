import React,{useEffect,useState} from 'react';
import {View,Text,Button,StyleSheet,ActivityIndicator,Image,Dimensions,TouchableOpacity,Modal,Alert} from "react-native";
import Colors from '../ColorPalet';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { RewardedAd, RewardedAdEventType, TestIds } from '@react-native-firebase/admob';
import config from '../../config/config';

import axios from 'axios';
import GetStars from '../../Components/quize/GetStars';
import { AuthContext } from '../Context';

const width=Dimensions.get("screen").width;


const adUnitId = config.AD_STATUS=='test'? TestIds.REWARDED : config.REWARDEd_AD_ID;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
     keywords: ['game', 'clothing', 'flight', 'hotel', 'travel', 'location','job','education','christian'],
});

const ErrorScreen = props => {
  

    

   

    const { starsUpdate } = React.useContext(AuthContext);

    const [modalVisible, setModalVisible] = useState(false);

    const [isAdLoaded, setIsAdLoaded] = useState(false);
    const [isNextQuestion, setIsNextQuestion] = useState(false);
    const [isAdLoadedAgain, setIsAdLoadedAgain] = useState(false);
    
    const navigation = useNavigation();
    const backToHome=()=>{
        navigation.navigate('Home')
    }




    const getdata = async () => {
      try {
        await axios
          .post(config.BASE_URL + "add_ads_stars", {
            token: props.token,
          })
  
          .then(function (response) {
            var data = response.data;
  
            if (data.error == false) {

              setModalVisible(true);
              starsUpdate(data.total_stars);
             
            } else {
              Alert.alert("Error Message!", JSON.stringify(data.message), [
                { text: "Okay" },
              ]);
              return;
            }
          })
          .catch(function (error) {
            Alert.alert("Error Message!", JSON.stringify(error.message), [
              { text: "Okay" },
            ]);
            return;
          });
      } catch (e) {
        Alert.alert("Error Message!", JSON.stringify(e.message), [
          { text: "Okay" },
        ]);
        return;
      }
    };



    useEffect(() => {
      const eventListener = rewarded.onAdEvent((type, error, reward) => {
       
        if (type === RewardedAdEventType.LOADED) {
          setIsAdLoaded(true);
        }
  
        
  
        if(type==="closed"){
  
          setIsAdLoadedAgain(!isAdLoadedAgain);
          setIsAdLoaded(false);
  
          
            
            getdata();
          
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

      <>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}

      >
          <GetStars />

      </Modal>
        <View style={styles.container}>
      

           <Animatable.View animation="bounceIn" style={styles.bottomPotion}>
           <Image style={styles.img} source={require('../../assets/images/sad.png')} />
               <View>
                   <Text>Total Stars:<Text style={{fontWeight:"700"}}>{props.totalStars}</Text></Text>  
                </View> 
               <Text style={styles.largeText}>Ooops...</Text>
               <Text style={styles.smallText}>The next time you must be lucky</Text>

               
             
           </Animatable.View>
           <Text

                 style={{
                     fontSize:20,
                     margin:20,
                     color:Colors.primary

                 }}
               
               >Whatch a short ad and get 5 Stars</Text>

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

           <TouchableOpacity activeOpacity={0.6} onPress={(val) =>backToHome()} style={styles.ContinueButton}>
                     <Text style={styles.continueText}>BACK TO HOME</Text>
                  </TouchableOpacity>
          
        </View>
        </>
    );
}

export default ErrorScreen;

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
      // backgroundColor:"#4343f4"
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
        //backgroundColor:"#F59137"
    },
    continueText:{
       // padding:10,
        fontSize:16,
        fontFamily:"Montserrat-SemiBold",
        color:"#325CD9",
       // lineHeight:25,
    

    }
})