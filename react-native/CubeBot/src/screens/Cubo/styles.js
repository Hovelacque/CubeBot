import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'row'
    },
    vazio: {
        height: 135,
        width: 135
    },
    button: {
        height: 50,
        width: 100,
        margin: 2,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;