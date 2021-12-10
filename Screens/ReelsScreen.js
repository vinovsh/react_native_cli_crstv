import React,{useState} from 'react';
import {FlatList,View,Text,Button,SafeAreaView,StyleSheet,StatusBar,Alert,Linking} from "react-native";
import ReelsContainer from '../Components/Reals/ReelsContainer';
import config from '../config/config';
import axios from 'axios';


import LoadmoreIndicator from '../Components/LoadmoreIndicator';
import LoadingScreen from './LoadingScreen';
const ReelsScreen = (props) => {


  var token=props.route.params.userToken;



  const[apidata,setApidata]=useState(null);
  const[loading,setLoading]=useState(true);
  const[currentPage,setCurrentPage]=useState(1);
  const[moreloading,setMoreloading]=useState(false);
  const[apiLoading,setApiLoading]=useState(true);

  const[viewableId,setViewableId]=React.useState(0);

   

      const getdata=async ()=>{

        try{
                
          await axios.post(config.BASE_URL+'get_reels?page='+currentPage, {
               token: token,
               reel_id:props.route.params.reel_id
              
              
             })
            
             .then(function (response) {
                 var data=response.data;
              
                 if(data.error==false){
                   
                 if(apidata){
                     var append_data=apidata.reels.data.concat(data.reels.data);
                     data.reels.data=append_data;
                     setApidata(data);
                   
                  }else{ 
                   
                   // setApidata(data)
                   if(data.selected_reel==null){

                       setApidata(data)
                       setLoading(false)
                       setMoreloading(false);
                   }else{

                      let new_data=[];
                      new_data[0]=data.selected_reel[0];
                      for(i=1;i<=data.reels.data.length;i++){
                        new_data[i]=data.reels.data[i-1];
                      }

                      data.reels.data=new_data;
                      setApidata(data);

                      setLoading(false)
                      setMoreloading(false);

                   }
             
                }  
                  
                  
                  
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
        var c_page=apidata.reels.current_page;
        var l_page=apidata.reels.last_page;
       
       if(c_page<l_page){
         setMoreloading(true);
         setCurrentPage(c_page+1);
        
       }
      }

      
      const onViewableItem=(val)=>{

        
         
      }
    
      const onViewRef = React.useRef((viewableItems)=> {
       // console.log(viewableItems)
        setViewableId(viewableItems.viewableItems[0].key)
        // Use viewable items in state or as intended
      
    })


 

    Linking.addEventListener('url', event =>{

      if(event){

         setLoading('true');
         setApidata(null);
         if(apiLoading==true){
          setApiLoading(false)
         }else{

          setApiLoading(true)
         }
      }
    } 
     
    
   
   );
   
   

    
    React.useEffect(() => {
     
      getdata();
    
    }, [currentPage,apiLoading]);


    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
    return (

      <>
      {loading ?(
      
          <LoadingScreen color="#fff"/>

        ):(

      < >
         
         <View style={styles.container}>
             <StatusBar translucent={true} backgroundColor="#ff000000" barStyle="light-content"/>
        <FlatList
          style={{ display: "flex",
          flexGrow: 1,}}
          onEndReached={(val)=>{console.log("end")}}
          onViewableItemsChanged={onViewRef.current}
       //  onViewableItemsChanged={(val)=>{onViewableItem(val)}}
          data={apidata.reels.data}
          renderItem={({item,index})=><ReelsContainer index={index} active_id={viewableId}  item={item}/>}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
         
          pagingEnabled
          onEndReached={()=>{onEnd()}}
          ListFooterComponent={ moreloading ?(<LoadmoreIndicator /> ):(<></>)}
        />
      </View>
      
      </>
      )}

      </>
       
    );
}

export default ReelsScreen;

const styles = StyleSheet.create({
    container:{
      flex:1
    }
})