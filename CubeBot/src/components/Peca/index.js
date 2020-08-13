import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';

export default function Peca(props) {
    const [cor, setCor] = useState(props.cor);

    return (
            <View style={[styles.peca, { backgroundColor: cor }]}></View>
    )
}