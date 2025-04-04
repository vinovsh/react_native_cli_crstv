import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';
import {View,Text,Button,FlatList, StyleSheet,Alert} from "react-native"
import CardWithTitle from '../Components/Cards/CardWithTitle';
import NoData from '../Components/Nodata';

//loader
import LoadingScreen from './LoadingScreen';
import LoadmoreIndicator from '../Components/LoadmoreIndicator';

const ListRecentVideosScreen = (props,{route,navigation}) => {
    var token=props.route.params.userToken;

    const[apidata,setApidata]=useState();
    const[loading,setLoading]=useState(true);
    const[currentPage,setCurrentPage]=useState(1);
    const[moreloading,setMoreloading]=useState(false);



    const getdata=async ()=>{

        try{
                
          await axios.post(config.BASE_URL+'recent_videos_feed?page='+currentPage, {
               token: token,
              
             })
            
             .then(function (response) {
                 var data=response.data;
              
                 if(data.error==false){
                   
                 if(apidata){
                     var append_data=apidata.recent_videos.data.concat(data.recent_videos.data);
                     data.recent_videos.data=append_data;
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
        var c_page=apidata.recent_videos.current_page;
        var l_page=apidata.recent_videos.last_page;
       
       if(c_page<l_page){
         setMoreloading(true);
         setCurrentPage(c_page+1);
        
       }
      }


    React.useEffect(() => {
       // navigation.setOptions({ title:route.params.title });
        getdata();
      
      }, [currentPage]);

     
    return (
       <>
        {loading ?(
        
            <LoadingScreen color="#fff"/>
 
          ):(

        < >
            <FlatList

             style={styles.container}
            
             data={apidata.recent_videos.data}
             renderItem={({item})=><CardWithTitle title={item.title} navigate_to="ListRecentVideoPlayerScreen" source={{uri:item.thumpnail}} item={item} />}
             keyExtractor={(item) => item.id}
             
             showsVerticalScrollIndicator={false}
             showsHorizontalScrollIndicator={false}
             onEndReached={()=>{onEnd()}}
             //onEndReachedThreshold={0}
             numColumns={2}
             ListFooterComponent={ moreloading ?(<LoadmoreIndicator /> ):(<></>)}
             ListEmptyComponent={
                  
              <NoData />
             
             }
             
            />



          
        </>
        )}
        </>
    );
}

export default ListRecentVideosScreen;

const styles = StyleSheet.create({

    container:{
        width:"100%",
        height:"100%",
        
    
    

    }
    
})