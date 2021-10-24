import React  from "react";
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity} from 'react-native';
import Colors from "../ColorPalet";
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import ProgressiveImage from "../ProgressiveImage";
 
const width=Dimensions.get('window').width;
const CardWithTitle =props=>{

    const{colors}=useTheme();
    const navigation = useNavigation(); 
    return (
        <View>
    
       
       
        
        <TouchableOpacity  onPress={()=>{navigation.navigate(props.navigate_to,{ id:props.item.id, name:props.item.name, image:props.item.image, video:props.item.video})}} activeOpacity={0.8} style={styles.container1}>

            <View style={styles.container}>
       {/* <Image style={styles.image} resizeMode='cover'  source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXVmXoBJuxtsP2iKFPfkJ1_v9TB937JnqxJw&usqp=CAU"}} />  */}
            <ProgressiveImage
                defaultImageSource={require('.././../assets/images/loaderAnimation.gif')}
               source={props.source}
               style={styles.image}
              
         /> 
           
           </View>
           <Text ellipsizeMode='tail' numberOfLines={2} style={[styles.CategoryTitle,{color:colors.custom_text}]}>{props.item.name}</Text>
        
         
        </TouchableOpacity>
       

        </View>
      );



}

export default CardWithTitle;



const styles = StyleSheet.create({
    container1:{
       
        width:width/2.3,
       
        margin:(width-((width/2.3)*2))/4,
        
        
        
   
       
    },
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
       // margin:10,
        padding:0,
        
        
   
       
    },
    image:{
        width:"100%",
        resizeMode:"cover",
       flex:1,
       borderRadius:15,
     

    },
    CategoryTitle:{
        marginTop:5,
        
        fontSize:15,
       
        paddingHorizontal:0,
        fontFamily:"Montserrat-SemiBold",
        
     
      
    
        
       }
    
   
  });


