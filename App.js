import React from 'react';
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
import { AuthContext } from './Components/Context';
import RootStack from './Routs/RootStack';
import HomeStack from './Routs/HomeStack';


const App = () => {
  const[isDarkTheme,setIsDarkTheme]=React.useState(false);
   const CustomDefaultTheme={
      ...NavigationDefaultTheme,
      ...PaperDefaultTheme,
      colors:{

        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors
      }
   }

   const CustomDarkTheme={
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors:{

      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors
    }
 }
 
 const theme=isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

 const authContext = React.useMemo(() => ({

   toggleTheme: () => {
    setIsDarkTheme( isDarkTheme => !isDarkTheme );
  },

   SignupFormSubmit: (username,email,password) => {

    if(username && email && password){

    alert(username);
    }else{

    alert("please fill all data")
    }

 }

 }), []);
  return (
 
    <PaperProvider theme={theme}>

       <AuthContext.Provider value={authContext}>
           <NavigationContainer theme={theme}>
               <StatusBar translucent={true} hidden={false} style="black" backgroundColor="#00000040" />

               {/* <DrawerNavigater/> */}
             <RootStack/> 
              
            </NavigationContainer> 
       </AuthContext.Provider>
    </PaperProvider>
   
    

  
  )
}


export default App;

