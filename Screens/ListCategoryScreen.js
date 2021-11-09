import React,{useState} from 'react';
import config from '../config/config';
import axios from 'axios';
import {View,Text,Button,FlatList, StyleSheet} from "react-native"
import CardWithTitle from '../Components/Cards/CardWithTitle';

//loader
import LoadingScreen from './LoadingScreen';

const ListCategoryScreen = (props,{route,navigation}) => {

    var token=props.route.params.userToken;

    const[apidata,setApidata]=useState();
    const[loading,setLoading]=useState(true);

    const getdata=async ()=>{

      try{
              
        await axios.post(config.BASE_URL+'categorys_feed', {
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
             data={apidata.categorys}
             renderItem={({item})=><CardWithTitle  source={{uri:item.image}} item={item} />}
             keyExtractor={(item) => item.id}
             
             showsVerticalScrollIndicator={true}
             numColumns={2}
            />
 
      </>
        )}
        </>
    );
}

export default ListCategoryScreen;

const styles = StyleSheet.create({

    container:{
        width:"100%",
        height:"100%",
        
    
    

    }
    
})