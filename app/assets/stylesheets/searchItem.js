import { StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 2,
        backgroundColor: Colors.darkGrey
    },
    image: {
        flex: 1,
        height: 75,
        resizeMode: 'contain',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    titlePlayIconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'transparent'
    }
});

export default styles;