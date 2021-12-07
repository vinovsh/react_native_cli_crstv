import React from 'react';
import {View,Text,Button,StyleSheet,ActivityIndicator,Image,Dimensions,TouchableOpacity} from "react-native";
import Colors from '../ColorPalet';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const width=Dimensions.get("screen").width;
const ContinueScreen =props=>{
    
    const navigation = useNavigation();
    const backToHome=()=>{
        navigation.navigate('Home')
    }

    const nextQuestion=()=>{

      props.nextQuestion();
    }
  
    return (
        <View style={styles.container}>
      

           <Animatable.View animation="bounceIn" style={styles.bottomPotion}>
           <Image style={styles.img} source={require('../../assets/images/sad.png')} />
          
               <Text style={styles.largeText}>Wrong Answer</Text>
               <View>
                   <Text>Total Stars:<Text style={{fontWeight:"700"}}>10</Text></Text>  
                </View> 
               
              

               
             
           </Animatable.View>
           <Text style={styles.largeText}>Continue?</Text>

           <TouchableOpacity activeOpacity={0.8} onPress={(val) =>{alert('ads')}} style={styles.adButton}>
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

           <TouchableOpacity activeOpacity={0.6} onPress={() =>{nextQuestion()}} style={styles.ContinueButton}>
                     <Text style={styles.continueText}>Spend 50</Text>
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
        backgroundColor:"#F59137"
    },
    continueText:{
       // padding:10,
        fontSize:16,
        fontFamily:"Montserrat-SemiBold",
        color:"#fff",
       // lineHeight:25,
    

    }
})