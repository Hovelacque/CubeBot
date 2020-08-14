import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function Peca(props) {
    let [backgroundColor, setBackgroundColor] = useState('white');

    useEffect(() => {
        setBackgroundColor('white');
        switch (props.cor) {
            case 1:
                setBackgroundColor('yellow');
                break;
            case 2:
                setBackgroundColor('green');
                break;
            case 3:
                setBackgroundColor('orange');
                break;
            case 4:
                setBackgroundColor('blue');
                break;
            case 5:
                setBackgroundColor('red');
                break;
        }
    })

    return (
        <View style={[styles.peca, { backgroundColor }]}>
            {__DEV__ ? <Text>{props.cor}</Text> : null}
        </View>
    )
}