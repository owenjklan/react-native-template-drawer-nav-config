/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './gesture-handler.native';

import React from 'react';

// Navigation imports
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

// Contexts
import ConfigurationProvider from './contexts/configuration.tsx';

// Screen components
import MainScreen from './screens/MainScreen.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';

const Drawer = createDrawerNavigator();

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <ConfigurationProvider>
                <Drawer.Navigator initialRouteName="MainScreen">
                    <Drawer.Screen
                        name="MainScreen"
                        options={{title: 'Project Name'}}
                        component={MainScreen}
                    />
                    <Drawer.Screen
                        name="OCRProcessingScreen"
                        options={{
                            title: 'Settings',
                            headerShown: true,
                        }}
                        component={SettingsScreen}
                    />
                </Drawer.Navigator>
            </ConfigurationProvider>
        </NavigationContainer>
    );
}

// const styles = StyleSheet.create({});

export default App;
