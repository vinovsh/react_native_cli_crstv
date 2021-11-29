import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';
import {View,Text,Button,FlatList, StyleSheet,Alert,Modal,ToastAndroid,BackHandler} from "react-native"
import EditReels from '../Components/Reals/EditReels';
import VideoControllOptions from '../Components/Modal/VideoControllOptions';
import { useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation';

//loader
import LoadingScreen from './LoadingScreen';
import LoadmoreIndicator from '../Components/LoadmoreIndicator';

const MyVideosScreen = (props,{route}) => {

    var token=props.route.params.userToken;
    
    Orientation.lockToPortrait();

    const navigation = useNavigation();

    const[apidata,setApidata]=useState();
    const[loading,setLoading]=useState(true);
    const[currentPage,setCurrentPage]=useState(1);
    const[moreloading,setMoreloading]=useState(false);
    const[isShowModal,setIsShowModal]=React.useState(false);
    const[currentObjectData,setCurrentObjectData]=useState(null);
    const[refresh,setRefresh]=useState(false);

    

    const modalControll=(data)=>{

      if(data){

        setCurrentObjectData(data);
      }else{
        setCurrentObjectData(null);

      }
     
      setIsShowModal(!isShowModal);
    }

    const editVideo=()=>{
      setIsShowModal(!isShowModal);
    
      navigation.navigate('editVideosScreen',{video:currentObjectData});
    }

    const playerView=(data)=>{
      
      navigation.navigate('ReelPlayerScreen',{video:data});

    }

    const shareVideo=()=>{

      setIsShowModal(!isShowModal);
      if(currentObjectData.status==1){

      }else{

        ToastAndroid.show('Reel Under review', ToastAndroid.SHORT);
      }

    }

    const deleteVideo=()=>{
      setIsShowModal(!isShowModal);
      setRefresh(false);
      Alert.alert(
        "Are your sure?",
        "Are you sure do you want to delete this video?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
            

              try{
              
                axios.post(config.BASE_URL+'delete_reels', {
                     token: token,
                     id:currentObjectData.id
                    
                   })
                  
                   .then(function (response) {
                       var data=response.data;
                    
                       if(data.error==false){

                        const filteredData = apidata.videos.data.filter(item => item.id !== currentObjectData.id);
                        let CurrentApiData=apidata;
                        CurrentApiData.videos.data=filteredData;
                        setApidata(CurrentApiData);
                         
                        ToastAndroid.show(data.message, ToastAndroid.SHORT);
                        setRefresh(true)
                        
                       }else{
                          
                        ToastAndroid.show(data.message, ToastAndroid.SHORT);
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
              
              
             
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
    }

    

    const getdata=async ()=>{

      try{
              
        await axios.post(config.BASE_URL+'list_uploaded_videos?page='+currentPage, {
             token: token,
            
           })
          
           .then(function (response) {
               var data=response.data;
            
               if(data.error==false){
                 
                
                if(apidata){
                  var append_data=apidata.videos.data.concat(data.videos.data);
                  data.videos.data=append_data;
                  setApidata(data);
                 
                
               }else{ 
                
                 setApidata(data)
               

                }  
               
               setLoading(false)
               setMoreloading(false);
                
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
    

    onEnd=()=>{
      var c_page=apidata.videos.current_page;
      var l_page=apidata.videos.last_page;
     
     if(c_page<l_page){
       setMoreloading(true);
       setCurrentPage(c_page+1);
      
     }
    }

    React.useEffect(() => {
        //navigation.setOptions({ title:route.params.title });
        getdata();
      
      }, []);

     
    return (
      <>

      {currentObjectData?
      
        <Modal transparent visible={isShowModal}>
          <VideoControllOptions shareVideo={shareVideo} editVideo={editVideo} deleteVideo={deleteVideo} modalControll={modalControll} />
        </Modal>

        :

        <></>
      }
       
      {loading ?(
      
          <LoadingScreen color="#fff"/>

        ):(

      < >
            <FlatList

             style={styles.container}
             data={apidata.videos.data}
             renderItem={({item})=><EditReels playerView={playerView} modalControll={modalControll} item={item} />} 
             keyExtractor={(item) => item.id}
             
             showsVerticalScrollIndicator={false}
             showsHorizontalScrollIndicator={false}
            
             onEndReached={()=>{onEnd()}}
             //onEndReachedThreshold={0}
          
             ListFooterComponent={ moreloading ?(<LoadmoreIndicator /> ):(<></>)}
            />
 
      </>
        )}
        </>
    );
}

export default MyVideosScreen;

const styles = StyleSheet.create({

    container:{
        width:"100%",
        height:"100%",
        
    
    

    }
    
})