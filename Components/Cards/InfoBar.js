import React  from "react";
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity,na} from 'react-native';
import Colors from "../ColorPalet";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {useTheme} from 'react-native-paper';

const width=Dimensions.get('window').width;
const InfoBar =props=>{
    const navigation = useNavigation();
    const{colors}=useTheme();
    
    return (
       
       
       <View style={styles.container}>
          <TouchableOpacity  onPress={() => {navigation.navigate('QuizeScreen')}} activeOpacity={0.8} style={[styles.card,{backgroundColor:colors.custom_color,borderColor:colors.light}]}>

              <Icon color={Colors.primary} style={styles.icon} name="receipt-outline"></Icon>
              <Text style={[styles.title,{color:colors.custom_text}]}>Bible Quiz</Text>
              <View style={styles.button}>
                  <Icon color={Colors.theamColor} style={styles.arrowIcon} name="arrow-forward-outline"></Icon>
              </View>
            
          </TouchableOpacity>
       </View> 

      );



}

export default InfoBar;



const styles = StyleSheet.create({
    container:{
     
        flex:1,
        justifyContent:"center",
        alignItems:"center"

    },
    card:{
       
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        height:70,
        borderRadius:width,
       
        marginVertical:30,
        width:width/1.08,
        borderWidth:0.5,
     
      
    },
    icon:{

       fontSize:25,
       marginHorizontal:25,
      
      
    },
    title:{

      color:Colors.theamSecondary,
      fontFamily:"Montserrat-SemiBold",
      fontSize:15
    },
    button:{
      
        height:50,
        width:50,
        backgroundColor:Colors.primary,
        borderRadius:50,
        position:"absolute",
        right:15,
        shadowColor:"#0b11b1",
        elevation:5,
        padding:6,
        justifyContent:"center",
        alignItems:"center",


    },
    arrowIcon:{
      
        fontSize:25,
      
        position:"relative",
     
    }
  
   
  });


