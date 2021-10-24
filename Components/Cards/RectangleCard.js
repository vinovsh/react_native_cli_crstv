import React  from "react";
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity} from 'react-native';
import Colors from "../ColorPalet";
import Icon from 'react-native-vector-icons/Ionicons';

import ProgressiveImage from "../ProgressiveImage";
 
const width=Dimensions.get('window').width;
const RectangleCard =props=>{

    
    return (
        <View>
    
       
       
        
        <TouchableOpacity activeOpacity={0.8} style={styles.container}>
       {/* <Image style={styles.image} resizeMode='cover'  source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXVmXoBJuxtsP2iKFPfkJ1_v9TB937JnqxJw&usqp=CAU"}} />  */}
            <ProgressiveImage
                defaultImageSource={require('.././../assets/images/loaderAnimation.gif')}
               source={props.source}
               style={styles.image}
              
         /> 
         
        </TouchableOpacity>

        </View>
      );



}

export default RectangleCard;



const styles = StyleSheet.create({
 
    container:{
       
        width:width/2.3,
       
        margin:(width-((width/2.3)*2))/4,
        height:width/1.7,
        borderRadius:15,
        backgroundColor:Colors.theamColor,
       // borderWidth: 1, 
      //  borderColor: Colors.LightBlack,
       
        //borderStyle:'solid',
        shadowColor:Colors.shadow,
        elevation:7,
       
        padding:0,
        
        
   
       
    },
    image:{
        width:"100%",
        resizeMode:"cover",
       flex:1,
       borderRadius:15,
     

    },
    
   
  });


