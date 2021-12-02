import React from "react";
import {View,Text,TouchableOpacity,StyleSheet,Image,TextInput,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import Colors from "../ColorPalet";

const width=Dimensions.get('window').width;

const EditProfile=()=>{

    const{colors}=useTheme();
    const [uploading,setUploading]=React.useState(false);


    const upload=async()=>{

    }

    return(

      <View style={styles.container}>

          <View style={styles.header}>

            <TouchableOpacity onPress={()=>{modalControll()}} activeOpacity={0.4}>
              <Icon style={{margin:10}}  name="close"  size={30} color={colors.custom_text}/>  
            </TouchableOpacity> 
          </View>

          <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                
               <View style={styles.profileBox}>

                   <Image 
                      style={[styles.profile,{borderColor:colors.light}]}
                      source={{
                          uri:'https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg'
                      }}
                   
                   />

              </View>
              <View style={styles.nameBox}>

              <TextInput 
                  style={[styles.textInput, {
                    color: colors.text
                 }]}
                 placeholder="Enter Name"
                 placeholderTextColor="#666666"
                    
                autoCapitalize="none"
               // value={'title'}

               // onChangeText={(val) => handleTitleChange(val)}
                 
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