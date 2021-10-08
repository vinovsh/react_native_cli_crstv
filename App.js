import React from 'react';
import {Text,View} from "react-native";
import DrawerNavigater from './Routs/DrawerNavigater';
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar } from 'react-native';
import Colors from './Components/ColorPalet';


const App = () => {
 
 
  return (
 
 
     <NavigationContainer>
      <StatusBar translucent={true} hidden={false} style="black" backgroundColor="#00000040" />

        <DrawerNavigater/>

    </NavigationContainer> 
   
    

  
  )
}


export default App;

