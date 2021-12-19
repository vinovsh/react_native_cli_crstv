import React from 'react';
import {View,Text,Button,SafeAreaView,ToastAndroid,StyleSheet,ActivityIndicator,StatusBar,ScrollView,Dimensions,TextInput,Image, TouchableOpacity,Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import Colors from '../Components/ColorPalet';
import VideoPlayer from 'react-native-video-controls';
import {launchImageLibrary} from 'react-native-image-picker';
import config from '../config/config';
import axios from 'axios';
import Toast from 'react-native-toast-message';


const width=Dimensions.get('window').width;
const height=Dimensions.get('screen').height;
const AddVideoScreen = (props) => {
  var token=props.route.params.userToken;
  const { colors } = useTheme();
  
   const navigation = useNavigation();

   const [videoUrl,setVideoUrl]=React.useState(props.route.params.item.assets[0].uri)
   const [imageUrl,setImageoUrl]=React.useState()

   const [video,setVideo]=React.useState(props.route.params.item.assets[0]);
   const [image,setImage]=React.useState();
   const [title,setTitle]=React.useState();
   const [uploading,setUploading]=React.useState(false);

   const [progress,setProgress]=React.useState(0);
    
   const callback=(e)=>{
    if(e.didCancel==true){
      
    }else{
  
      setImageoUrl(e.assets[0].uri);
      setImage(e.assets[0]);
    }
  }
   const selectimage=()=>{
  
    launchImageLibrary({mediaType:'photo'}, callback);

  }

  const handleTitleChange=(title)=>{
     setTitle(title);
     
  }

  const showToast = () => {
    Toast.show({
      type: 'warning',
      text1: 'Message',
      text2: 'validation failed'
    });
  }

 

  const upload=async()=>{
    setUploading(true);
    if(video && title && image){
      let formData = new FormData();
      
      formData.append("video",  {type:video.type,uri:video.uri,name:video.fileName});
      formData.append("image",  {type:image.type,uri:image.uri,name:image.fileName});
      formData.append("title",  title);
      formData.append("token",  token);

      try{


   
                
        await axios.post(config.BASE_URL+'reels_upload', formData,{

          onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          
            setProgress(percentCompleted);
          }
        })
          
           .then(function (response) {
               var data=response.data;
               if(data.error==false){
                ToastAndroid.show('Successfully Updated', ToastAndroid.SHORT);
                navigation.navigate('ProfileScreen')
               }else{
                setUploading(false);
                showToast();
               }
              
           })
           .catch(function (error) {
                  setUploading(false);
                  Alert.alert('Error Message!', JSON.stringify(error.message), [
                   {text: 'Okay'}
                  ]);
                  return;
           });
        
     }catch(e){

         setUploading(false);
     
         Alert.alert('Error Message!', JSON.stringify(e.message), [
           {text: 'Okay'}
         ]);
         return;
     }
    

    }else{

      setUploading(false);

      Alert.alert('Wrong Input!', 'Plz fill all details', [
        {text: 'Okay'}
    ]);
    }
  }
    return (
        <View style={styles.container}>

          <ScrollView
             showsHorizontalScrollIndicator={false}
             showsVerticalScrollIndicator={false}
          >
              <View style={styles.screen}>

              <VideoPlayer
                   ref={(ref) => {
                   
                 }}
                  style={{width:'100%',height:width/1.8}}
                   source={{
                     uri:videoUrl,
                    
                   }}
                   repeat={true}
                   title=""
                   fullscreen={false}
                   resizeMode="contain"
                   controls={false}
                   disablePlayPause
                 disableSeekbar
                 disableVolume
                 disableTimer
                 disableBack
                 disableFullscreen
                 controls={false}
                 
        
                
           
           
               /> 

              </View>
              {uploading?

<View style={{width:width,flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

    <View style={{width:'80%',height:10,borderRadius:50,backgroundColor:'#d9dadb',marginTop:20}}>

         <View style={{width:progress+'%',height:'100%',backgroundColor:'#0fef4a',borderRadius:50}}></View>
    </View>
   <Text style={{fontSize:20,color:colors.text}}>{progress}%</Text>
</View>

:<></>


}

              <Text style={[styles.title, {
                color: colors.text
               }]}>Title</Text>

              <TextInput 
                  style={[styles.textInput, {
                    color: colors.text
                 }]}
                 placeholder="Enter Video Caption"
                 placeholderTextColor="#666666"
                    
                autoCapitalize="none"

                onChangeText={(val) => handleTitleChange(val)}
                 
                />

               <Text style={[styles.title, {
                color: colors.text
               }]}>Select Video Thumpnail</Text>

              <View style={{width:width,flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

             
             {imageUrl ?(
        
                <Image 

                    source={{
                     uri: imageUrl
                    }}
                   style={{width:150,height:150}}

                />

              ):(<>
                
                <Image 

                source={require('../assets/images/empty_image.png')}
                style={{width:150,height:150}}

              />
              
              </>)}
             

                <View style={{width:100,height:30,backgroundColor:'#007bffb3',position:'absolute',borderRadius:50,justifyContent:'center'}}>
                  <TouchableOpacity onPress={()=>{selectimage()}}>
                  <Text style={{color:'#fff',textAlign:'center'}}>Select image</Text>
                  </TouchableOpacity>

                </View>

              
                </View>

               

               

                
              
          </ScrollView> 
          <View style={styles.button}>

            {uploading?

                <TouchableOpacity onPress={()=>{upload()}}>
            
                  <Text style={{textAlign:'center',fontSize:20,color:"#fff"}}><ActivityIndicator size="small" color="#fff" /> Uploading..</Text>
                </TouchableOpacity>

              :

              
              <TouchableOpacity onPress={()=>{upload()}}>
            
                <Text style={{textAlign:'center',fontSize:20,color:"#fff"}}>Upload</Text>
             </TouchableOpacity>
             
             
            
          
          }
             

           

            
          </View> 

          <Toast />
      
        </View>
    );
}

export default AddVideoScreen;

const styles = StyleSheet.create({
    container:{
      flex:1,
      height:height
    },
    screen:{
      width:"100%",
      height:width/1.8,
      backgroundColor:"#000"
    },
    title: {
        color: '#05375a',
        fontSize: 18,
        margin:10
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        fontSize:20
    },
    button:{
        position:"absolute",
        width:"70%",
        height:60,
        left:"15%",
        borderRadius:50,
        backgroundColor:Colors.primary,
        bottom:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})