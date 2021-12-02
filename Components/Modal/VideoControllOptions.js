import React from 'react';
import {View,Text,Button,StyleSheet,ToastAndroid, TouchableOpacity,Dimensions,TextInput,Alert,ActivityIndicator} from "react-native";
import * as Animatable from 'react-native-animatable';
import config from '../../config/config';
import axios from 'axios';



import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';


const width=Dimensions.get('window').width;
const VideoControllOptions = (props) => {
   
    
    const{colors}=useTheme();
    
    const modalControll=()=>{
        props.modalControll();
     }

    const shareVideo=()=>{
      
      props.shareVideo();

    } 
     
    
   
    return (
        <View visible={true}  style={styles.container}>
          <View style={styles.header}>
          
          </View>

          <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
          >
         <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-end'}}>

       
            <TouchableOpacity onPress={()=>{modalControll()}} activeOpacity={0.4}>
              <Icon style={{marginTop:10,marginRight:10}}  name="close"  size={30} color={colors.custom_text}/>  
            </TouchableOpacity>
     

         </View>

       <View style={styles.optionHolder}> 

           <View style={styles.card}>
             <TouchableOpacity onPress={()=>{props.editVideo()}} activeOpacity={0.6} style={styles.card}>
             <Icon style={{marginLeft:10}}  name="circle-edit-outline"  size={25} color={colors.custom_text}/>
             <Text style={{marginLeft:25,fontSize:20,color:colors.custom_text}}>Edit</Text>
             </TouchableOpacity>
           </View>

           <TouchableOpacity activeOpacity={0.6} onPress={()=>{props.deleteVideo()}} style={styles.card}>
             <Icon style={{marginLeft:10,color:colors.custom_text}}  name="delete"  size={25} color={colors.custom_text}/>
             <Text style={{marginLeft:25,fontSize:20,color:colors.custom_text}}>Delete</Text>
           </TouchableOpacity>
               
          
             <TouchableOpacity activeOpacity={0.6} onPress={()=>{shareVideo()}} style={styles.card}>
              <Icon style={{marginLeft:10,color:colors.custom_text}}  name="share"  size={25} color={colors.custom_text}/>
              <Text style={{marginLeft:25,fontSize:20,color:colors.custom_text}}>Share</Text>
             </TouchableOpacity>
           
             
       </View>
           
        
         

        </Animatable.View>
        </View>
    );
}

export default VideoControllOptions;

const styles = StyleSheet.create({
    container:{

        zIndex:10,
       
        height:"100%",
        width:width,
        position:"absolute",
       
    },
    header:{
     
    

        backgroundColor:'#00000052',
        height:"100%",
        width:width,
       
    },
    footer: {
    
        position:"absolute",
        bottom:0,
       
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
       
        //height:200,
        width:width,
        flex:1,
        flexDirection:'column',
        justifyContent:"center",
        
       // alignItems:'center'
    
    },
    optionHolder:{

      
        width:'100%',
     
        marginBottom:10
    },
    card:{
        flexDirection:'row',
        justifyContent:"flex-start",
        margin:5
    }
    
   
})