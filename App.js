import React,{useEffect} from 'react';
import {Text,View} from "react-native";
import DrawerNavigater from './Routs/DrawerNavigater';
import {
   NavigationContainer,
   DefaultTheme as NavigationDefaultTheme,
   DarkTheme as NavigationDarkTheme
   } from '@react-navigation/native';
import {StatusBar } from 'react-native';
import Colors from './Components/ColorPalet';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Components/Context';
import RootStack from './Routs/RootStack';
import LoadingScreen from './Screens/LoadingScreen';


const App = () => {
  const[isDarkTheme,setIsDarkTheme]=React.useState(false);
const initialLoginState={
   isLoading:true,
   isAuthenticated:false,
   userName:'',
   userEmail:'',
   userToken:'',
   

}

const loginReducer=(prevState,action)=>{
    
   switch(action.type){

    case 'LOGIN':
      return{
        ...prevState,
        userToken:action.token,
        userName:action.name,
        userEmail:action.email,
        isLoading:false,
        isAuthenticated:true
      };
    case 'SIGNUP':
      return{

        ...prevState,
        userToken:action.token,
        userName:action.name,
        userEmail:action.email,
        isLoading:false,
        isAuthenticated:false
      };
    case 'OTP_VERIFY':
      return{
        ...prevState,
        userToken:action.token,
        userName:action.name,
        userEmail:action.email,
        isLoading:false,
        isAuthenticated:true
      };
    case 'AUTH_CHECK':
      return{
        ...prevState,
        userToken:action.token,
        userName:action.name,
        userEmail:action.email,
        isLoading:false,
        isAuthenticated:true
      };

    case 'LOGOUT':
      return{
        ...prevState,
        userToken:'',
        userName:'',
        userEmail:'',
        isLoading:false,
        isAuthenticated:false
      };
     
   }

}

const [loginState,dispatch]=React.useReducer(loginReducer,initialLoginState);



  
   const CustomDefaultTheme={
      ...NavigationDefaultTheme,
      ...PaperDefaultTheme,
      colors:{

        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        custom_text:"black",
        quiz_text:"#3D3E3E",
        quiz_small_text:"#6E6F6F"
      }
   }

   const CustomDarkTheme={
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors:{

      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      custom_text:"#fff",
      quiz_text:"#fff",
      quiz_small_text:"#eceaea"

    }
 }
 
 const theme=isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

 const authContext = React.useMemo(() => ({

   toggleTheme: async() => {

    try {
      var get_theme=await AsyncStorage.getItem('@isDarkTheme');
 
      if(get_theme !== null) {
        if(get_theme=="true"){
          setIsDarkTheme(isDarkTheme => false );
          try {
            await AsyncStorage.setItem('@isDarkTheme', JSON.stringify(false) );
            
          } catch (e) {
            console.log(e);
          }
        }else{
         
          setIsDarkTheme( isDarkTheme => true );
          try {
            await AsyncStorage.setItem('@isDarkTheme', JSON.stringify(true) );
            
          } catch (e) {
            console.log(e);
          }
  
        }
     }else{

      setIsDarkTheme( isDarkTheme => true );
      try {
        await AsyncStorage.setItem('@isDarkTheme', JSON.stringify(true) );
        
      } catch (e) {
        console.log(e);
      }
     }
      
      
    } catch (e) {
      console.log(e);
    }
 
    /* setIsDarkTheme( isDarkTheme => !isDarkTheme );

    try {
      await AsyncStorage.setItem('@isDarkTheme', JSON.stringify(isDarkTheme) );
      
    } catch (e) {
      console.log(e);
    } */
  },
   SignOut:async()=>{
      try {
         await AsyncStorage.removeItem('@user_token')
         dispatch({type:'LOGOUT'});
      } catch(e) {
         console.log(e);
      }

      
   },

   SignUpFormSubmit: (name,email,password) => {

    

         alert(name);
    

   },

   SignInFormSubmit: async(email,password) => {

     if(email=="user@gmail.com" && password=="admin123"){

      try {
        await AsyncStorage.setItem('@user_token', '123456789');
        dispatch({type:'LOGIN',token:'123456789',name:"vino",email:email});
      } catch (e) {
        console.log(e);
      }
       
     }

 }

 }), []);

 const getData = async () => {

  //initial theme section

   try {
    var def_theme=await AsyncStorage.getItem('@isDarkTheme');

    if(def_theme !== null) {
      if(def_theme=="true"){
        setIsDarkTheme( isDarkTheme => true );
      }else{
        setIsDarkTheme( isDarkTheme => false );

      }
   }
    
    
  } catch (e) {
    console.log(e);
  }

  //initial Auth section
try {
   const token = await AsyncStorage.getItem('@user_token')
  
   if(token !== null) {

    setTimeout(() => {

      dispatch({type:'AUTH_CHECK',token:'123456789',name:"vino",email:'user@gmail.com'});
     }, 2000)
   
   }else{
    dispatch({type:'LOGOUT'});
   }
} catch(e) {
   console.log(e);
}
}

 useEffect(() => {

 console.log('use')
    getData();
  
  
}, []);


  return (
 
    <PaperProvider theme={theme}>

       <AuthContext.Provider value={authContext}>
           <NavigationContainer theme={theme}>
           
            {loginState.isLoading ? (
               <LoadingScreen color="#fff"/>
               ):loginState.isAuthenticated ?(
                <>
               <StatusBar translucent={true} hidden={false} style="black" backgroundColor="#00000040" />

              <DrawerNavigater/>
              </>

               ):!loginState.isLoading ?(
             <RootStack/> 

               ):null}
              
            </NavigationContainer> 
       </AuthContext.Provider>
    </PaperProvider>
   
    

  
  )
}


export default App;

