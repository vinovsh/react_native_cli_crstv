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

/* import{ AuthContext } from '../components/context'; */

const MenuSlider = (props) => {

    const paperTheme = useTheme();

   /*  const { signOut, toggleTheme } = React.useContext(AuthContext); */

    return(
        <View style={{flex:1,backgroundColor:Colors.secondaryTheam}}>
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
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Main')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Main')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="lock" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Privacy Policy"
                            onPress={() => {props.navigation.navigate('Main')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="star" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Rate Us"
                            onPress={() => {props.navigation.navigate('Main')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="share-variant" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Share Us"
                            onPress={() => {props.navigation.navigate('Main')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
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
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
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
      color:Colors.primaryTheam
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      color:Colors.primaryTheam
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
      color:Colors.primaryTheam
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