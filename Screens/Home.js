import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';
import {View,Text,Button,ScrollView,TouchableOpacity,Dimensions,StyleSheet,FlatList} from "react-native";
import Orientation from 'react-native-orientation';
import Colors from '../Components/ColorPalet';
import AutoScrolling from "react-native-auto-scrolling";

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


//loader
import HomeLoader from '../Components/skeloton/HomeLoader';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';



const width=Dimensions.get('window').width;


const Home = (props,{navigation}) => {

    var token=props.route.params.userToken;
    
    Orientation.lockToPortrait();
    function navHandler(){
         navigation.navigate("Live", { body: 'hi' })

    }
    const[apidata,setApidata]=useState();
    const[loading,setLoading]=useState(true);

    
    
    
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

  React.useEffect(() => {

 
    getdata();
    
  
  
  }, []);


 
    return (
        <>
      {loading ?(
        
           <HomeLoader />

         ):(
           <>
          
            <ScrollView   showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}> 
             <LivePlayer video={apidata.live_tv.url}/>
            
             

              <AutoScrolling style={{margin:10}} duration={apidata.live_tv.speed}>

                <Text>{apidata.live_tv.scrolling_text}</Text>
         
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
            <RealsCard/>
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

                <VideoCard title={item.title} id={4} navigate_to="ListVideoPlayerScreen" video={item.video_link} source={{uri:item.thumpnail}} />

           )}
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

                <VideoCard title={item.name} id={4} navigate_to="ListVideoScreen" video={item.image} source={{uri:item.image}} />

           )}
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

                  <RectangleCard source={{uri:item.image}} />

                )}
                keyExtractor={(item) => item.id}
               
            />

                

            <SocialShare />

 
         </ScrollView>
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