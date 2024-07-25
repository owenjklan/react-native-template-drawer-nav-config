import React from 'react';

import {createContext, ReactNode, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ConfigurationData = {
    dummyValue: number;
};

export type ConfigurationContextType = {
    dummyValue: number;
    updateDummyValue: (newDummyValue: string) => void;

    configurationLoaded: boolean;
    loadConfiguration: () => void;
};

export const ConfigurationContext =
    createContext<ConfigurationContextType | null>(null);

const ConfigurationProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [configurationLoaded, setConfigurationLoaded] = useState(false);

    const [dummyValue, setDummyValue] = useState<number>(1);

    const updateDummyValue = (newDummyValue: string) => {
        // Only update if we're provided a non-empty string.
        // The settings screen may call this legitimately with an empty string
        // when the user clears the contents of the input field.
        if (
            newDummyValue !== undefined &&
            newDummyValue !== null &&
            newDummyValue !== ''
        ) {
            try {
                setDummyValue(parseInt(newDummyValue, 10));
            } catch (e) {
                // It the event of bad data, fallback to 5
                setDummyValue(5);
            }
        }
    };

    const saveConfiguration = async () => {
        const storedConfiguration = {
            dummyValue: dummyValue,
        };
        const storedConfigurationJSON = JSON.stringify(
            storedConfiguration,
            null,
            4,
        );
        await AsyncStorage.setItem(
            'configuration',
            storedConfigurationJSON,
        ).then(
            () => {
                console.log('Saved configuration');
                console.log(storedConfigurationJSON);
            },
            (saveFailure) => {
                console.log(
                    'Failed saving configuration data! Error:',
                    saveFailure,
                );
            },
        );
    };

    const loadConfiguration = () => {
        AsyncStorage.getItem('configuration', (error, result) => {
            if (error) {
                console.log('Error loading settings at startup: ', error);
                // Load default configuration
                updateDummyValue('5');
                setConfigurationLoaded(true); // This controls display of the hostname entry
                return;
            }

            if (!result) {
                // Create default settings, save them and carry on
                // Load default configuration
                updateDummyValue('5');
            } else {
                const loadedSettings = JSON.parse(result);
                updateDummyValue(loadedSettings.dummyValue);
            }
            setConfigurationLoaded(true);
        });
    };

    useEffect(() => {
        saveConfiguration();
    }, [dummyValue]);

    return (
        <ConfigurationContext.Provider
            value={{
                dummyValue,
                updateDummyValue,
                configurationLoaded,
                loadConfiguration,
            }}>
            {children}
        </ConfigurationContext.Provider>
    );
};

export default ConfigurationProvider;
