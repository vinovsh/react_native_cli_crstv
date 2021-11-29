import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';
import {View,Text,Button,FlatList, StyleSheet,Alert} from "react-native"
import PeopleCard from '../Components/profile/PeopleCard';

//loader
import LoadingScreen from './LoadingScreen';
import LoadmoreIndicator from '../Components/LoadmoreIndicator';

const ReferredPeopleScreen = (props,{route,navigation}) => {

    var token=props.route.params.userToken;

    const[apidata,setApidata]=useState();
    const[loading,setLoading]=useState(true);
    const[currentPage,setCurrentPage]=useState(1);
    const[moreloading,setMoreloading]=useState(false);

    const getdata=async ()=>{

      try{
              
        await axios.post(config.BASE_URL+'referred_people_list?page='+currentPage, {
             token: token,
            
           })
          
           .then(function (response) {
               var data=response.data;
            
               if(data.error==false){
                 
                
                if(apidata){
                  var append_data=apidata.users.data.concat(data.users.data);
                  data.users.data=append_data;
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
      var c_page=apidata.users.current_page;
      var l_page=apidata.users.last_page;
     
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
      {loading ?(
      
          <LoadingScreen color="#fff"/>

        ):(

      < >
            <FlatList

             style={styles.container}
             data={apidata.users.data}
             renderItem={({item})=>
            
            <>
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
              <PeopleCard item={item} />
            </>
            
            } 
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

export default ReferredPeopleScreen;

const styles = StyleSheet.create({

    container:{
        width:"100%",
        height:"100%",
        
    
    

    }
    
})