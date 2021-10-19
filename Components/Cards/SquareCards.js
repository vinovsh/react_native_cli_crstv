import React  from "react";
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity} from 'react-native';
import Colors from "../ColorPalet";
import Icon from 'react-native-vector-icons/Ionicons';

import ProgressiveImage from "../ProgressiveImage";
import { color } from "react-native-reanimated";
import {useTheme} from 'react-native-paper';
const width=Dimensions.get('window').width;
const SquareCard =props=>{
  const{colors}=useTheme();
    
    return (
        <View>
    
          <Text style={[styles.CategoryTitle,{color:colors.custom_text}]}>Daily Verse</Text>
       
        
        <TouchableOpacity activeOpacity={0.8} style={styles.container}>
       {/* <Image style={styles.image} resizeMode='cover'  source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXVmXoBJuxtsP2iKFPfkJ1_v9TB937JnqxJw&usqp=CAU"}} />  */}
            <ProgressiveImage
                defaultImageSource={require('.././../assets/images/loadImage.png')}
               source={props.source}
               style={styles.image}
              
         /> 
           <View style={styles.shareBox}>
           <TouchableOpacity>
             <Icon color={Colors.theamColor} style={{fontSize:20,fontWeight:700}} name="share-social-outline"></Icon>
           </TouchableOpacity>
           </View>
        </TouchableOpacity>

        </View>
      );



}

export default SquareCard;



const styles = StyleSheet.create({
 
    container:{
       
        width:width/2.3,
        height:width/2.3,
        borderRadius:15,
        backgroundColor:Colors.theamColor,
       // borderWidth: 1, 
      //  borderColor: Colors.LightBlack,
       
        //borderStyle:'solid',
        shadowColor:Colors.shadow,
        elevation:7,
        margin:10,
        padding:0,
        
        
   
       
    },
    image:{
        width:"100%",
        resizeMode:"cover",
       flex:1,
       borderRadius:15,
     

    },
    shareBox:{
        width:40,
        height:30,
        backgroundColor:"#000000b3",
        position:"absolute",
        bottom:0,
        right:0,
        borderBottomEndRadius:15,
        borderTopLeftRadius:30,
        justifyContent:"center",
        alignItems:"center"
    },
    CategoryTitle:{
        marginTop:10,
        
        fontSize:15,
       
        paddingHorizontal:15,
        fontFamily:"Montserrat-SemiBold",
     
      
    
        
       }
   
  });


