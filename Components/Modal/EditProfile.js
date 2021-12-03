import React from "react";
import {View,Text,TouchableOpacity,StyleSheet,Image,TextInput,Dimensions,ActivityIndicator,Alert,ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import Colors from "../ColorPalet";
import {launchImageLibrary} from 'react-native-image-picker';
import config from "../../config/config";
import axios from 'axios';
import { AuthContext } from "../Context";

const width=Dimensions.get('window').width;

const EditProfile=(props)=>{


  const { profileUpdate } = React.useContext(AuthContext);
   
   var token=props.token

    const{colors}=useTheme();
    const [imageUrl,setImageoUrl]=React.useState(props.profile)

  
   const [image,setImage]=React.useState();
    const [uploading,setUploading]=React.useState(false);
    const [name,setName]=React.useState(props.name);

    const handleTitleChange=(val)=>{

      setName(val);
    }
    const upload=async()=>{

      setUploading(true);
      if(name){
        let formData = new FormData();
      
        if(image){
          formData.append("profile",  {type:image.type,uri:image.uri,name:image.fileName});
        }
     
        formData.append("name",  name);
        formData.append("token",  token);
    

      try{


   
                
        await axios.post(config.BASE_URL+'edit_profile', formData,{

          onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          
           // setProgress(percentCompleted);
          }
        })
          
           .then(function (response) {
               var data=response.data;
               if(data.error==false){

                profileUpdate(data.name,data.profile);
                props.updateProfile(data.name,data.profile)
                ToastAndroid.show('Successfully Updated', ToastAndroid.SHORT);
              
                
             
            props.closeModal();
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

    return(

      <View style={styles.container}>

          <View style={styles.header}>

            <TouchableOpacity onPress={()=>{props.closeModal()}} activeOpacity={0.4}>
              <Icon style={{margin:10}}  name="close"  size={30} color={colors.custom_text}/>  
            </TouchableOpacity> 
          </View>

          <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                
               <View style={styles.profileBox}>

                   {imageUrl?
                     
                     <Image 
                      style={[styles.profile,{borderColor:colors.light}]}
                      source={{
                          uri:imageUrl
                      }}
                   
                   />

                   :

                   <Image 
                   style={[styles.profile,{borderColor:colors.light}]}
                   source={require('../../assets/images/profile.png')}
                
                />
                  
                   }

                   <Icon style={{position:'absolute'}} onPress={()=>{selectimage()}}  name="circle-edit-outline"  size={50} color={'#fff'}/>  

              </View>
              <View style={styles.nameBox}>

              <TextInput 
                  style={[styles.textInput, {
                    color: colors.text
                 }]}
                 placeholder="Enter Name"
                 placeholderTextColor="#666666"
                    
                autoCapitalize="none"
                value={name}

                onChangeText={(val) => handleTitleChange(val)}
                 
                />

              </View>

          </View>

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


          
      </View>
    )
}

export default EditProfile;
const styles = StyleSheet.create({
   container:{

     flex:1,
     
  },
  header:{
      width:'100%',
      height:60,
      flexDirection:'row',
   //   backgroundColor:'red',
      justifyContent:'flex-end',
      alignItems:'center'
  },
  profileBox:{
      justifyContent:'center',
      alignItems:'center'
  },
  profile:{
      width:100,
      height:100,
      borderRadius:50,
      borderWidth:1,
  },
  nameBox:{

    justifyContent:'center',
    alignItems:'center',
    margin:20,
    width:'100%'
  },
  textInput:{

    
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    fontSize:20,
    borderBottomColor:'#000',
    borderBottomWidth:2,
    width:width/2,
    textAlign:'center'
    
   
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