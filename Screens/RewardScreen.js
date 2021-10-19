import React from 'react';
import {View,Text,Button,StyleSheet,ActivityIndicator,Image,Dimensions,TouchableOpacity} from "react-native";
import Colors from '../Components/ColorPalet';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const width=Dimensions.get("screen").width;
const RewardScreen =props=>{
    
    const navigation = useNavigation();
    const backToHome=()=>{
        navigation.navigate('Home')
    }
  
    return (
        <View style={styles.container}>
            
           <View style={styles.upperPotion}>
               <Image style={styles.img} source={require('../assets/images/reward_img.png')} />
           </View>

           <Animatable.View animation="bounceIn" style={styles.bottomPotion}>
               <View>
                   <Text>Total Stars:<Text style={{fontWeight:"700"}}>10</Text></Text>  
                </View> 
               <Text style={styles.largeText}>Congratulations!</Text>
               <Text style={styles.smallText}>You did the great job in this task</Text>

               <View style={styles.ContinueButtonCard}>

                  <TouchableOpacity activeOpacity={0.8} onPress={(val) =>backToHome()} style={styles.ContinueButton}>
                     <Text style={styles.continueText}>BACK TO HOME</Text>
                  </TouchableOpacity>
              </View>
              
           </Animatable.View>
          
        </View>
    );
}

export default RewardScreen;

const styles = StyleSheet.create({
    container:{

        backgroundColor:"#fff",
      
        position:"absolute",
           
        height:"100%",
        width:"100%",
        zIndex:15,
       

    },
    img:{
      width:"100%",
      height:"100%",
      position:"relative",
      bottom:0
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
       
        minHeight:60,
     
        borderRadius:15,
        backgroundColor:Colors.theamColor,
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
        backgroundColor:"#4343f4"
    },
    continueText:{
        padding:10,
        fontSize:16,
        fontFamily:"Montserrat-SemiBold",
        color:"#fff",
        lineHeight:25,
    

    }
})