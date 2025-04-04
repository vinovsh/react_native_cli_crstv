import React  from "react";
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity,Linking } from 'react-native';
import Colors from "./ColorPalet";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';


 
const width=Dimensions.get('window').width;
const SocialShare =props=>{

    const { colors } = useTheme();
    return (
        <View style={{width:"100%"}}>
           <Text style={[styles.text,{color:colors.custom_text}]}>Follow Us On</Text>
       
           <View style={styles.container}>

               <TouchableOpacity activeOpacity={0.6} style={styles.items}>
                    <Icon onPress={() => Linking.openURL(props.social.facebook)} style={styles.icon} name="facebook-f" size={30} color={Colors.primary} />
                </TouchableOpacity>
               <TouchableOpacity activeOpacity={0.6} style={styles.items}>
                    <Icon onPress={() => Linking.openURL(props.social.instagram)} style={styles.icon} name="instagram" size={30} color="#EF7C00" />
                </TouchableOpacity>
               <TouchableOpacity activeOpacity={0.6} style={styles.items}>
                    <Icon onPress={() => Linking.openURL(props.social.youtube)} style={styles.icon} name="youtube" size={30} color="#F70000" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.items}>
                    <Icon onPress={() => Linking.openURL(props.social.whatsapp)} style={styles.icon} name="whatsapp" size={30} color="#16e616" />
                </TouchableOpacity>
               
           </View> 
        </View>
      );



}

export default SocialShare;



const styles = StyleSheet.create({
 
    container:{
      
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        margin:10,
        

       
    },
    items:{
        width:50,
        height:50,
        borderRadius:50,
        shadowColor:Colors.shadow,
        //elevation:1,
        //padding:2,
        marginHorizontal:10,
        backgroundColor:Colors.theamColor,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
        
    },
    text:{
       textAlign:"center",
       marginTop:15,
       fontSize:25,
       fontFamily:"Birthstone-Regular"
      // fontFamily:"Montserrat-SemiBold"
    },
    icon:{

       
    }
  
  });


