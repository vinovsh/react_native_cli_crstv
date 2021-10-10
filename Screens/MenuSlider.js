import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../Components/ColorPalet';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../Components/Context';

/* import{ AuthContext } from '../components/context'; */

const MenuSlider = (props) => {

    


    const paperTheme = useTheme();
    const {toggleTheme } = React.useContext(AuthContext);

   /*  const { signOut, toggleTheme } = React.useContext(AuthContext); */

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15,paddingBottom:15, borderBottomColor: '#f4f4f4', borderBottomWidth: 1}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://www.unigreet.com/wp-content/uploads/2020/04/Sweet-girl-dp.jpg'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Ashley</Title>
                                <Caption style={styles.caption}>Ashley@gmail.com</Caption>
                            </View>
                        </View>

                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({size,color}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label={({color}) => <Text style={{color:color}}>Home</Text>}
                            onPress={() => {props.navigation.navigate('Main')}}
                        />
                        <DrawerItem 
                            icon={({size,color}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label={({color}) => <Text style={{color:color}}>Profile</Text>}
                            onPress={() => {props.navigation.navigate('Main')}}
                        />
                        <DrawerItem 
                            icon={({size,color}) => (
                                <Icon 
                                name="lock" 
                                color={color}
                                size={size}
                                />
                            )}
                            label={({color}) => <Text style={{color:color}}>Privacy Policy</Text>}
                            onPress={() => {props.navigation.navigate('Main')}}
                        />
                        <DrawerItem 
                            icon={({size,color}) => (
                                <Icon 
                                name="star" 
                                color={color}
                                size={size}
                                />
                            )}
                            label={({color}) => <Text style={{color:color}}>Rate Us</Text>}
                            onPress={() => {props.navigation.navigate('Main')}}
                        />
                        <DrawerItem 
                            icon={({size,color}) => (
                                <Icon 
                                name="share-variant" 
                               
                                size={size}
                                color={color}
                                />
                            )}
                            label={({color}) => <Text style={{color:color}} >Share Us</Text>}
                            onPress={() => {props.navigation.navigate('Main')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple  onPress={() => {toggleTheme()}} >
                            <View style={styles.preference}>
                                <Text >Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({size,color}) => (
                        <Icon 
                        name="exit-to-app" 
                     
                        size={size}
                        color={color}
                        />
                    )}
                    label={({color}) => <Text style={{color:color}} >Sign Out</Text>}
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}
export default MenuSlider;
const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
     
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
     
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
     
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });