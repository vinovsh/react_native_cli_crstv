import React,{useState} from 'react';
import { View, StyleSheet,Image,Alert,FlatList,TouchableOpacity,Dimensions,Modal,ActivityIndicator} from 'react-native';
import config from '../config/config';
import axios from 'axios';
import Colors from '../Components/ColorPalet';
import { useNavigation } from '@react-navigation/native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
  
    Drawer,
    Text,
  
 
  
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../Components/Context';
import { color } from 'react-native-reanimated';

import CategoryTitle from '../Components/CategoryTitle';
import ProfileIcon from '../Components/profile/ProfileIcon';

import VideoControllOptions from '../Components/Modal/VideoControllOptions';

//loader
import LoadingScreen from './LoadingScreen';


const width=Dimensions.get('window').width;

const ProfileScreen = (props) => {

    const navigation = useNavigation();

    const paperTheme = useTheme();
    const {toggleTheme,SignOut } = React.useContext(AuthContext);

    const[apidata,setApidata]=useState();
    const[videoapidata,setVideoApidata]=useState();
    const[loading,setLoading]=useState(true);
    const[isShowModal,setIsShowModal]=React.useState(false);
  
 

    var name=props.route.params.userName;
    var email=props.route.params.userEmail;
    var code=props.route.params.userCode;
    var stars=props.route.params.userStars;
    var token=props.route.params.userToken;


  



    
   
    const getdata=async ()=>{

      try{
              
        await axios.post(config.BASE_URL+'referrals_sample_profile', {
             token: token,
            
           })
          
           .then(function (response) {
               var data=response.data;
            
               if(data.error==false){
                 
                
                setApidata(data)
                setLoading(false)
                
               }else{
                  
                Alert.alert('Error Message!', JSON.stringify(data.message), [
                  {text: 'Okay'}
                 ]);
                 return;
                }
           })
           .catch(function (error) {
          
                  Alert.alert('Error Message!', JSON.stringify(error.message), [
                   {text: 'Okay'}
                  ]);
                  return;
           });
        
     }catch(e){
     
         Alert.alert('Error Message!', JSON.stringify(e.message), [
           {text: 'Okay'}
         ]);
         return;
     }
    }



  React.useEffect(() => {

 
    getdata();
    
  
  
  }, []);


    return(

    
      <>

       
      {loading ?(
      
          <LoadingScreen color="#fff"/>

        ):(

      < >
    
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15,paddingBottom:15, }}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://www.unigreet.com/wp-content/uploads/2020/04/Sweet-girl-dp.jpg'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{name}</Title>
                                <Caption style={styles.caption}>{email}</Caption>
                            </View>
                        </View>

                        <View style={[styles.edit,{borderColor:paperTheme.colors.custom_text}]}>
                              <Icon 
                                name="circle-edit-outline" 
                                style={{color:paperTheme.colors.custom_text}}
                                size={25}
                                />
                        </View>
                      

                    </View>

                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-evenly',marginTop:10}}>
                        <View style={[styles.button,{backgroundColor:Colors.primary}]}>
                          
                               <Icon 
                                name="hexagram" 
                                color='#ffff'
                                size={25}
                                />
                                <Text style={{fontSize:22,color:'#ffff'}}>{stars}</Text>
                              
                        </View>

                        <View style={[styles.button,{backgroundColor:'#15d212'}]}>
                          
                               
                                <Text style={{fontSize:15,color:'#ffff'}}>Rewards</Text>
                              
                        </View>
                    </View>

                   <View style={{flexDirection:'row'}}>

                     <View style={[styles.card,{borderColor:paperTheme.colors.light}]}>
                       <Text style={[styles.title,{margin:10,fontSize:20}]}>50</Text>
                       <Text style={styles.caption}>Referral</Text>

                    </View>
                    <View style={[styles.card,{borderColor:paperTheme.colors.light}]}>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => {}} >
                      <Image 
                        style={styles.leader}
                        source={require('../assets/images/leader.png')}
                      
                      />
                      </TouchableOpacity>

                    </View>

                  </View>

                  <View>

                     <CategoryTitle title="Referrals" navigate_to="ListRecentVideoScreen" api_fetch_key="recent_videos" display="flex"/>
                    

                     <FlatList 
                        style={{borderBottomWidth:0.6,borderBottomColor:paperTheme.colors.light,}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={apidata.profiles}

                        renderItem={({item}) => (

                          <ProfileIcon title={item.name} id={4} navigate_to="ListRecentVideoPlayerScreen" item={item} source={{uri:item.profile}} />

                        )}
                       keyExtractor={(item) => item.id}
                       ListEmptyComponent={
                       
                        <View style={{height:60,width:width, flexDirection:'row', justifyContent:"center",alignItems:'center',}}>
                           <Text style={{textAlign:'center'}}>No Data</Text>
                        </View>
                      
                      }
                     
            
                    />



                    
                  </View>


                  <View  style={{width:width, flexDirection:'column', justifyContent:"center",alignItems:'center',}}>
                           <TouchableOpacity onPress={()=>{navigation.navigate('myVideosScreen')}} activeOpacity={0.6}>
                           <View style={{width:200,height:35,backgroundColor:'orange',borderRadius:10,justifyContent:'center',alignItems:'center',marginTop:60}}>
                              <Text style={{color:'#fff',fontSize:20,textAlign:'center'}}>My Videos</Text>
                           </View>
                           </TouchableOpacity>
                  </View>

                   
                  
                </View>

                
            </DrawerContentScrollView>

    
                  
                
                 

               
           
        </View>

        </>
        )}
        </>

        

        
    );
}
export default ProfileScreen;
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
     
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
     
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
     
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    button:{
        width:"40%",
        height:50,
       
        borderRadius:50,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:"center",
    },
    edit:{
        width:50,
        height:50,
       
        borderRadius:50,
        position:'absolute',
        right:10,
        
        borderWidth:0.1,
        justifyContent:'center',
        alignItems:'center'
        
    },
    card:{
      
        height:60,
        borderWidth:0.2,
        marginTop:10,
        width:'50%',
        justifyContent:'center',
        alignItems:'center',
       
    },
    leader:{
        width:40,
        height:40,
    }
  });