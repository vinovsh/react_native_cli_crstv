import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';
import {View,Text,Button,ScrollView,TouchableOpacity,Dimensions,StyleSheet,FlatList,Alert,Modal,Linking} from "react-native";
import Orientation from 'react-native-orientation';
import Colors from '../Components/ColorPalet';
import AutoScrolling from "react-native-auto-scrolling";
import {useTheme } from 'react-native-paper';

//components

import LivePlayer from '../Components/Player/LivePlayer';
import CategoryTitle from '../Components/CategoryTitle';
import SquareCard from '../Components/Cards/SquareCards';
import StatusVideoCard from '../Components/Cards/StatusVideoCard';
import InfoBar from '../Components/Cards/InfoBar';
import RealsCard from '../Components/Reals/RealsCard';
import EventCard from '../Components/Cards/EventCard';
import RectangleCard from '../Components/Cards/RectangleCard';
import SocialShare from '../Components/SocialShare';
import VideoCard from '../Components/Cards/ViedoCard';
import UploadReels from '../Components/UploadReels';

import BottomTabNavigater from '../Components/BottomTabNavigater';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




//loader
import HomeLoader from '../Components/skeloton/HomeLoader';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import {RewardedAd, RewardedAdEventType, BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';




const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

 const adUnitId = config.AD_STATUS=='test'? TestIds.BANNER : config.BANNER_AD_ID;

 const adUnitIdReward = config.AD_STATUS=='test'? TestIds.REWARDED :config.REWARDEd_AD_ID;


  const rewarded = RewardedAd.createForAdRequest(adUnitIdReward, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['game', 'clothing', 'flight', 'hotel', 'travel', 'location','job','education','christian'],
  });



const Home = (props, { navigation }) => {




    var token=props.route.params.userToken;

    const { colors } = useTheme();
    
    Orientation.lockToPortrait();
    function navHandler(){
         navigation.navigate("Live", { body: 'hi' })

    }
    const[apidata,setApidata]=useState();
    const[loading,setLoading]=useState(true);
    const[uploading,setUploading]=useState(false);

    const[showBannerAd,setShowBannerAd]=useState(false);

    const [isLoadApi, setIsLoadApi] = useState(true);

    const [isAdLoaded, setIsAdLoaded] = useState(false);
    const [isAdLoadedAgain, setIsAdLoadedAgain] = useState(false);

    const [canILoadAdd, setCanILoadAdd] = useState(false);
  
    const [showUpdatePopup, setShowUpdatePopup] = useState(true);

    const upload_reels_box=()=>{

      if(uploading==true){

        setUploading(false);

      }else{
        
        setUploading(true);

      }
    }
    
    const getdata=async ()=>{

      try{
              
        await axios.post(config.BASE_URL+'home_feed', {
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

    const checkTime = async () => {

      try {
        var time=await AsyncStorage.getItem('@adLoadTime');
      
       if(time !== null) {

          time_int=parseInt(time);

          var currentTimeInSeconds=Math.floor(Date.now()/1000);

          if(currentTimeInSeconds >=time_int){
            
            setCanILoadAdd(true);

          }else{
            
            setCanILoadAdd(false);

          }
         
       } else {
         
         setCanILoadAdd(true);
       } 
        
        
      } catch (e) {
        console.log(e);
      } 

    }


   const updateTime=async()=>{

      try {
        var currentTimeInSeconds=Math.floor(Date.now()/1000); //unix timestamp in seconds
        await AsyncStorage.setItem('@adLoadTime', JSON.stringify(currentTimeInSeconds+1800) );
      
      } catch (e) {
        console.log(e);
      }

   } 

  React.useEffect(() => {

   /* if(isLoadApi==true){
      setIsLoadApi(false); */
      getdata();

  /*  } */

    checkTime();

   const eventListener = rewarded.onAdEvent((type, error, reward) => {
     
    if (type === RewardedAdEventType.LOADED) {
      setIsAdLoaded(true);
    }

    if(type==="closed"){

      setIsAdLoadedAgain(!isAdLoadedAgain);
      setIsAdLoaded(false);

  
        
     
      
    }

   

    
  });

  // Start loading the rewarded ad straight away
  rewarded.load();

  // Unsubscribe from events on unmount
  return () => {
    eventListener();
  };
    
  

 
   
  
   
  
  }, []);

 

  if(isAdLoaded===true){
    if(canILoadAdd==true){
      setTimeout(() => {
        if (isAdLoaded === true) {
          setIsAdLoaded(false);
          setCanILoadAdd(false);
          updateTime();
          rewarded.show();
         
        }


      }, 5000);

     

    }
   
  }
 
    return (
        <>
      {loading ?(
        
           <HomeLoader />

         ):(
            <>
             
              {apidata.show_update_popup === 1 && showUpdatePopup===true && apidata.version !== config.VERSION ?
                <Modal transparent={true} >
                  
                  <View style={{height:300,width:width-20,backgroundColor:"#fff",marginTop:(height-300)/2,borderRadius:20,margin:10,justifyContent:"center",alignItems:'center'}}>
                   
                     <Icon 
                        name="close" 
                        color='#000'
                        size={40}
                        style={{
                           position: 'absolute',
                           top: 10,
                           right:10
                      }}
                      
                      onPress={() => {
                        
                        setShowUpdatePopup(false);

                      }}
                      />
                   
                    
                    <TouchableOpacity
                      
                      activeOpacity={0.8}
                      onPress={() => {
                        
                        Linking.openURL('https://play.google.com/store/apps/details?id=com.app.crstv');
                      }}
                    
                    
                    >
                    <View
                      
                      style={{
                        height: 60,
                        width: width - 70,
                        backgroundColor: Colors.pink,
                        borderRadius: 20,
                        justifyContent:'center'
                      }}
                    
                    >
                      <Text style={{textAlign:'center',alignItems:'center',fontSize:20,color:'#fff'}}>Update</Text>
                      
                      </View>
                      
                      </TouchableOpacity>
                  </View>

                </Modal>

                :

                <></>
           
              }

           {uploading ?(
        
               <UploadReels upload_reels_box ={upload_reels_box} />

              ):(<></>)}
            
            <ScrollView   showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}> 
             <LivePlayer video={apidata.live_tv.url}/>
            
             

              <AutoScrolling style={{margin:10}} duration={apidata.live_tv.speed}>

                <Text style={{color:colors.custom_text}}>{apidata.live_tv.scrolling_text}</Text>
         
              </AutoScrolling>
            
            <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
               <SquareCard
                   title="Daily Verse"
                    source={{uri:apidata.daily_verse.image}}
              />
               <StatusVideoCard
                  title="Whatsapp Status"
                  videoSource={{
                    uri: apidata.whatsapp_status.video,
                      
                 }}
               
               />
            </View>
            <InfoBar/>
            <CategoryTitle title="Crstv Competition" display="none"/>
            <RealsCard upload_reels_box ={upload_reels_box} />
            <CategoryTitle title="Events" display="none"/>
           
         
            <FlatList 
              horizontal
              showsHorizontalScrollIndicator={false}
               showsVerticalScrollIndicator={false}
              data={apidata.events}

              renderItem={({item}) => (

                <EventCard
                source={{uri:item.image}}
          
               />
  
             )}
             ListEmptyComponent={
                       
              <View style={{height:60,width:width, flexDirection:'row', justifyContent:"center",alignItems:'center',}}>
                 <Text style={{textAlign:'center'}}>No Data</Text>
              </View>
            
            }
             keyExtractor={(item) => item.id}
            
            />
 
              

               
         

            <CategoryTitle title="Recent Videos" navigate_to="ListRecentVideoScreen" api_fetch_key="recent_videos" display="flex">
              </CategoryTitle>
            <FlatList 
               horizontal
               showsHorizontalScrollIndicator={false}
               showsVerticalScrollIndicator={false}
               data={apidata.recent_videos}

               renderItem={({item}) => (

                <VideoCard title={item.title} id={4} navigate_to="ListRecentVideoPlayerScreen" item={item} source={{uri:item.thumpnail}} />

               )}
               ListEmptyComponent={
                       
                <View style={{height:60,width:width, flexDirection:'row', justifyContent:"center",alignItems:'center',}}>
                   <Text style={{textAlign:'center'}}>No Data</Text>
                </View>
              
              }
              keyExtractor={(item) => item.id}
            
            />

                  
            


            <CategoryTitle title="Our Shows" navigate_to="ListCategoryScreen"  display="flex">
              </CategoryTitle>
            <FlatList 
               horizontal={true} 
               showsHorizontalScrollIndicator={false} 
               showsVerticalScrollIndicator={false}

               data={apidata.categorys}

               renderItem={({item}) => (

                <VideoCard title={item.name} id={4} navigate_to="ListVideoScreen" item={item} video={item.image} source={{uri:item.image}} />

               )}

               ListEmptyComponent={
                       
                <View style={{height:60,width:width, flexDirection:'row', justifyContent:"center",alignItems:'center',}}>
                   <Text style={{textAlign:'center'}}>No Data</Text>
                </View>
              
              }
              keyExtractor={(item) => item.id}
               
            />

                 
                 


          


            <CategoryTitle title="Tv Channels" navigate_to="ListChannelsScreen" display="flex">
              </CategoryTitle>
            <FlatList 
                horizontal={true} 
                showsHorizontalScrollIndicator={false} 
                showsVerticalScrollIndicator={false}

                data={apidata.tv_channels}

                renderItem={({item}) => (

                  <RectangleCard item={item} source={{uri:item.image}} />

                )}

                ListEmptyComponent={
                       
                  <View style={{height:60,width:width, flexDirection:'row', justifyContent:"center",alignItems:'center',}}>
                     <Text style={{textAlign:'center'}}>No Data</Text>
                  </View>
                
                }
                keyExtractor={(item) => item.id}
               
            />

                

            <SocialShare social={apidata.social_media} />


            <View style={{height:showBannerAd? 'auto':0}}>  
                   <BannerAd
                       visible={false}
                     unitId={adUnitId}
    
                    onAdFailedToLoad={(event)=>{
                      setShowBannerAd(false);
                    
                    }}

                    onAdLoaded={() => { 
                      setShowBannerAd(true);
                    
                    }}
                     size={BannerAdSize.SMART_BANNER}
                     requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                     }}
                  />

              </View>

 
         </ScrollView>
         <BottomTabNavigater active={'home'} />
         </>

        )}
        </>
    );
}

export default Home;

const styles = StyleSheet.create({
 
   player:{
    borderRadius:15,
   },
    playerContainer:{

        width:width/2.4,
        height:width/2.4,
        borderRadius:15,
        marginTop:10, 
        marginBottom:10,
    
    }

  });