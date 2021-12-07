import React from 'react';
import {View,Text,Button,StyleSheet,ActivityIndicator,Image,Dimensions,TouchableOpacity} from "react-native";
import Colors from '../ColorPalet';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const width=Dimensions.get("screen").width;
const GetStars =props=>{
    
    const navigation = useNavigation();
    const backToHome=()=>{
        navigation.navigate('Home')
    }
  
    return (
        <View style={styles.container}>
      

           <Animatable.View animation="bounceIn" style={styles.bottomPotion}>
           <Image style={styles.img} source={require('../../assets/images/correct.png')} />
              
               <Text style={styles.largeText}>Reward Claimed</Text>
          

               
             
           </Animatable.View>
          


           <TouchableOpacity activeOpacity={0.6} onPress={(val) =>backToHome()} style={styles.ContinueButton}>
                     <Text style={styles.continueText}>BACK TO HOME</Text>
                  </TouchableOpacity>
          
        </View>
    );
}

export default GetStars;

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
    
    ContinueButton:{

        width:width/1.1,
       
      height:60,
     
        borderRadius:15,
      
        marginHorizontal:width/1.2,
        padding:0,
     
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10,
        backgroundColor:"#E7F3FF"
    },
  
    continueText:{
       // padding:10,
        fontSize:16,
        fontFamily:"Montserrat-Bold",
        color:"#3798ED",
       // lineHeight:25,
    

    }
})