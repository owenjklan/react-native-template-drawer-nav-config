import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import ScreenBase from './ScreenBase.tsx';
import {
    ConfigurationContext,
    ConfigurationContextType,
} from '../contexts/configuration.tsx';

const SettingsScreen: React.FC = () => {
    const {
        dummyValue,
        updateDummyValue,
        configurationLoaded,
        loadConfiguration,
    } = useContext(ConfigurationContext) as ConfigurationContextType;
    //
    // useEffect(() => {
    //     if (!configurationLoaded) return;
    //     loadConfiguration();
    // }, []);

    return <ScreenBase></ScreenBase>;
};

const styles = StyleSheet.create({});

export default SettingsScreen;
