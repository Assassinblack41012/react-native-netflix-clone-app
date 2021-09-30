import React from 'react'
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import View from '../View';
import Text from './../Text';
import Colors from './../../constants/Colors';
import ActivityIndicatorWrapper from './../ActivityIndicatorWrapper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    label: {
        fontSize: 10,
        marginTop: 5,
        color: Colors.grey
    }
});

const FontAwesomeButton = ({ name, size, color = '#FFF', label = 'Label', isSolid = false, isLoading = false, onPress }) => 
{
    return (
        <TouchableOpacity onPress={ onPress }>
            <View style={ styles.container }>
                <ActivityIndicatorWrapper
                    isLoading={ isLoading }
                    component={
                        <FontAwesome5 
                            name={ name }
                            size={ size }
                            color={ color }
                            solid={ isSolid }
                        />
                    }
                />
                <Text style={ styles.label }>{ label.toUpperCase() }</Text>
            </View>
        </TouchableOpacity>
    )
}

export default FontAwesomeButton
