import React from 'react';
import {View,Text,Button,StyleSheet, TouchableOpacity,Dimensions,Modal} from "react-native";
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {launchImageLibrary} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const width=Dimensions.get('window').width;
const UploadReels = (props) => {


    const navigation = useNavigation();
    const[errorMessage,setErrorMessage]=React.useState();
    const{colors}=useTheme();
    const upload_reels_box=()=>{
       props.upload_reels_box();
    }  


    const callback=(e)=>{
       if(e.didCancel==true){
          console.log('cancel');
       }else{
     
        
          if(e.assets[0].duration>600){
            setErrorMessage('Video too large');
          }else{
            
            upload_reels_box();
            navigation.navigate('UploadVideo',{item:e});
           

          }
       }
     }

    const selectVideo=()=>{
  
        launchImageLibrary({mediaType:'video',durationLimit:15}, callback);

    }
   
    return (
        <Modal transparent style={styles.container}>
          <View style={styles.header}>
          
          </View>

          <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
          >
         <View style={{position:'absolute',top:10,right:15}}>
            <TouchableOpacity onPress={()=>{upload_reels_box()}} activeOpacity={0.4}>
              <Icon  name="close"  size={30} color={'#000'}/>  
            </TouchableOpacity>
         </View>     
           <Text style={{textAlign:'center',margin:10,color:"red"}}>{errorMessage}</Text>
            <TouchableOpacity onPress={()=>{selectVideo()}} activeOpacity={0.6}>
                <View style={styles.button}>
                    <Text style={{textAlign:"center",textAlignVertical:'center',fontSize:20,color:"#fff"}}>Select Video</Text>
                </View>
            </TouchableOpacity>
            <Text style={{textAlign:'center',marginTop:10}}>Max video length 10 minutes</Text>
        </Animatable.View>
        </Modal>
    );
}

export default UploadReels;

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
       
        height:"30%",
        width:width,
        flex:1,
        flexDirection:'column',
        justifyContent:"center",
        
       // alignItems:'center'
    
    },
    button:{
        height:50,
        width:"80%",
        backgroundColor:Colors.primary,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",
        bottom:0,
        left:"10%",
        
       
    }
})