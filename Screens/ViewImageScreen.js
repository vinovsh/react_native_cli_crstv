import React from 'react';
import {View,Text,Button,NativeModules, StyleSheet,Dimensions,Animated, Image,TouchableOpacity,PermissionsAndroid,Platform} from "react-native";
import ProgressiveImage from '../Components/ProgressiveImage';
import { PinchGestureHandler,State } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import RNFetchBlob from 'rn-fetch-blob';
//const RNFetchBlob = NativeModules.RNFetchBlob;


const width=Dimensions.get("window").width;
const height=Dimensions.get('window').height;
const ViewImageScreen = ({route,navigation}) => {


 
 React.useEffect(() => {
  navigation.setOptions({ title:route.params.title });

}, []);
 const scale=new Animated.Value(1)


 /* image download section */

    const checkPermission=async()=>{
       
      if(Platform.OS=="ios"){
         downloadImage();
      }else{

        try {

          const granted=await PermissionsAndroid.request(
            
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title:"Srorage Permission Required",
              message:"App needs access to your storage to download photos"
            }

          )
         
          if(granted==PermissionsAndroid.RESULTS.GRANTED){

             console.log("storage permission granted");
             downloadImage();
          }else{
            alert("storage permission not granted");
          }
          
        } catch (error) {
           console.warn(error)
        }

      }

    }

    const downloadImage=()=>{
     let date=new Date();
     let image_url=route.params.img_url.uri;
     let ext=getExtention(image_url);
     ext='.'+ext[0];
     const {config,fs}=RNFetchBlob;
      //get congic and fs from RNFetchBlob
     let pictureDir=RNFetchBlob.fs.dirs.PictureDir 
     let options={
       fileCatch:true,
       addAndroidDownloads:{
            //related to the android only
            useDownloadManager:true,
            notification:true,
            path:pictureDir + '/image_'+Math.floor(date.getTime()+date.getSeconds() /2)+ext,
            description:"Image"
       }
     }

     config(options)
     .fetch('GET',image_url)
     .then(res=>{
         console.log('res->',JSON.stringify(res));
         alert("image downloaded successfully")
     })
    }

    const getExtention=filename=>{
      return /[.]/.exec(filename) ? /[^.]+$/.exec(filename):undefined
    }

 /* end image download section */



 const onZoomEventFunction=Animated.event(
   
     [{

        nativeEvent:{scale:scale}
     }],
     {
       useNativeDriver:true
     }
 
 )

 const onZoomStateChangeEvent=(event)=>{

     if(event.nativeEvent.oldState==State.ACTIVE){
         Animated.spring(
          scale,
           {

            toValue:1,
            useNativeDriver:true,

           }


         ).start()
     }

 }
    return (
        <View style={styles.container}>
          
            <View style={styles.image_box}>
              <PinchGestureHandler
                
                onGestureEvent={()=>{onZoomEventFunction}}
                onHandlerStateChange={(event)=>{onZoomStateChangeEvent(event)}}
              
              >
                {/* <ProgressiveImage
                   defaultImageSource={require('../assets/images/loadImage.png')}
                   source={route.params.img_url}
                   style={{ width:"100%",flex:1,transform:[{scale:scale}]}}
              
                />  */}
                <Animated.Image
                    source={{uri:route.params.img_url.uri}}
                    style={{ width:"100%",flex:1,transform:[{scale:scale}]}}
                />
         </PinchGestureHandler>
            </View>
           <View style={styles.download_box}>
             
              <View style={styles.download_circle}>
                <TouchableOpacity onPress={()=>{checkPermission()}}>    
                  <Feather 
                    name="download"
                    color="white"
                    size={25}
                  />
                  </TouchableOpacity>
              </View>
             
          </View> 
           
          
        </View>
    );
}

export default ViewImageScreen;
const styles = StyleSheet.create({
  container:{

    flex:1,
    
    flexDirection:"column",
   justifyContent:"center",
   alignItems:"center",
  
   backgroundColor:"black",
 
   
    
    
    
    
  },
  
  image_box:{
    width:"100%",
    height:width,
  
  },
  download_box:{
   /*  position:"relative",
    bottom:30,
    left:width/3,
    justifyContent:"center",
    alignItems:"center" */
    marginTop:20,
    width:"100%",
   
    

  },
  download_circle:{
     justifyContent:"flex-end",
     alignItems:"flex-end",
     marginRight:"10%"
     
  }

})