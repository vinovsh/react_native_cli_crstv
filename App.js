import React from 'react';
import DrawerNavigater from './Routs/DrawerNavigater';
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar } from 'react-native';
import Colors from './Components/ColorPalet';


const App = () => {
 
 
  return (

    <NavigationContainer>
      <StatusBar  backgroundColor={Colors.brandLightBlue} />

        <DrawerNavigater/>

    </NavigationContainer>
  )
}


export default App;

