import React, { useState } from 'react';
import { View } from 'react-native';
import Peca from '../Peca';
import styles from './styles';

export default function Face(props) {

    return (
        <View style={styles.container}>
            <View style={styles.linha}>
                <Peca cor={props.matriz[0][0]}></Peca>
                <Peca cor={props.matriz[0][1]}></Peca>
                <Peca cor={props.matriz[0][2]}></Peca>
            </View>
            <View style={styles.linha}>
                <Peca cor={props.matriz[1][0]}></Peca>
                <Peca cor={props.matriz[1][1]}></Peca>
                <Peca cor={props.matriz[1][2]}></Peca>
            </View>
            <View style={styles.linha}>
                <Peca cor={props.matriz[2][0]}></Peca>
                <Peca cor={props.matriz[2][1]}></Peca>
                <Peca cor={props.matriz[2][2]}></Peca>
            </View>
        </View>
    )
}