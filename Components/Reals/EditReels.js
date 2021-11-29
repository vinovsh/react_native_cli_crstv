import React  from "react";
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity} from 'react-native';
import Colors from "../ColorPalet";

import ProgressiveImage from "../ProgressiveImage";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { color } from "react-native-reanimated";
import {useTheme} from 'react-native-paper';


const width=Dimensions.get("window").width;
const EditReels =props=>{
    const navigation = useNavigation();
    const paperTheme = useTheme();

    const modalControll=()=>{

      props.modalControll(props.item);
    }

    const playerView=()=>{

       props.playerView(props.item);
    }
  
    
    return (
        <TouchableOpacity onPress={()=>{playerView()}}  activeOpacity={0.9}>
        <View style={[styles.container,{borderColor:paperTheme.colors.light}]}>

          <View style={styles.image_card}>
            <Image
              style={styles.image}
              
              source={{uri:props.item.image}}
            
            />
          </View>
          <View style={styles.content}>

              <View style={styles.upper}>
                 
                 <Text numberOfLines={3} style={{fontSize:16,fontFamily:"Montserrat-Medium",margin:5,color:paperTheme.colors.custom_text}}>{props.item.title}</Text>

              </View>
              <View style={styles.lower}>

                     <Feather 
                       name="thumbs-up"
                       color={'#15d212'}
                       size={20}
                     /> 
                     <Text style={{fontSize:20,color:paperTheme.colors.custom_text}}>{' '}{props.item.likes}</Text>
                    

                     <Icon
                     
                     name="clock"
                     color={'orange'}
                     style={{paddingLeft:5}}
                     size={20}
                    
                   />
                  {props.item.status==0?
                   <Text style={{fontSize:15,color:'orange'}}>{' '}Under review</Text>
                  :<></>}
                  </View>
                  
            </View>
            <TouchableOpacity onPress={()=>{modalControll()}} style={{position:'absolute',top:5,right:0}}>
            <Icon 
                  
                  name="dots-vertical"
                  color={paperTheme.colors.custom_text}
                  size={30}
            />
            </TouchableOpacity>


        </View>
        </TouchableOpacity>
       
      );

}

export default EditReels;
const styles = StyleSheet.create({

    container:{

        width:'95%',
        height:100,
      
        borderRadius:10,
        margin:'2.5%',
        flexDirection:'row',
        borderWidth:0.2,
        
    },
    image_card:{
        
        borderRadius:10,
        width:'45%',
        height:'100%',
       backgroundColor:'#000'
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
     
       borderTopLeftRadius:10,
        borderBottomLeftRadius:10
     
     
    },
    content:{
        width:'50%',
        height:'100%',
        flexDirection:'column'
       
    },
    upper:{
      
        width:'100%',
        height:'70%',
    },
    lower:{
      
        width:'100%',
        height:'30%',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:5
    }

});
