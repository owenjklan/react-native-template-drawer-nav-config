import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import ScreenBase from './ScreenBase.tsx';
import {
    ConfigurationContext,
    ConfigurationContextType,
} from '../contexts/configuration.tsx';
import LargeIconButton from '../components/LargeIconButton.tsx';

const MainScreen: React.FC = () => {
    const {configurationLoaded, loadConfiguration} = useContext(
        ConfigurationContext,
    ) as ConfigurationContextType;

    useEffect(() => {
        loadConfiguration();
    }, []);

    const buttonOnePressed = () => {
        Alert.alert('Button pressed', 'You pressed the first button.');
    };

    const buttonTwoPressed = () => {
        Alert.alert('Button pressed', 'You pressed the second button.');
    };

    return (
        <ScreenBase>
            <View style={styles.largeButtonRow}>
                <LargeIconButton
                    onPress={buttonOnePressed}
                    iconName={'view-gallery'}
                    style={styles.buttonsStyle}
                    iconStyle={styles.buttonsIcons}
                    label={'First\nButton'}
                    labelStyle={styles.buttonsLabels}
                />
                <LargeIconButton
                    onPress={buttonTwoPressed}
                    iconName={'camera-image'}
                    style={styles.buttonsStyle}
                    iconStyle={styles.buttonsIcons}
                    label={'Second\nButton'}
                    labelStyle={styles.buttonsLabels}
                />
            </View>
            {configurationLoaded && <Text>Configuration has been loaded</Text>}
        </ScreenBase>
    );
};

const styles = StyleSheet.create({
    basicText: {
        fontSize: 20,
        color: 'black',
    },
    largeButtonRow: {
        flexDirection: 'row',
    },
    buttonsStyle: {
        backgroundColor: 'lightgoldenrodyellow',
        marginHorizontal: 10,
    },
    buttonsLabels: {
        color: 'black',
        fontSize: 20,
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsIcons: {
        color: 'lightblue',
    },
});

export default MainScreen;
