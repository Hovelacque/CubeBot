import React, { useState } from 'react';
import { View } from 'react-native';
import Peca from '../Peca';
import styles from './styles';

export default function Face(props) {
    const [cor, setCor] = useState(props.cor);

    return (
        <View style={styles.container}>
            <View style={styles.linha}>
                <Peca cor={cor}></Peca>
                <Peca cor={cor}></Peca>
                <Peca cor={cor}></Peca>
            </View>
            <View style={styles.linha}>
                <Peca cor={cor}></Peca>
                <Peca cor={cor}></Peca>
                <Peca cor={cor}></Peca>
            </View>
            <View style={styles.linha}>
                <Peca cor={cor}></Peca>
                <Peca cor={cor}></Peca>
                <Peca cor={cor}></Peca>
            </View>
        </View>
    )
}