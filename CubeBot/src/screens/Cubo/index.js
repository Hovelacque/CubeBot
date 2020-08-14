import React, { useContext, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, Image, RefreshControl, Alert } from 'react-native';
import Orientation from 'react-native-orientation';
import Face from '../../components/Face';
import styles from './styles';

export default function Cubo({ navigation }) {

    const [cuboMatriz, setCuboMatriz] = useState([
        [[1, 1, 1], [1, 1, 1], [1, 2, 3]], //0 - cima (amarelo)
        [[2, 2, 1], [2, 2, 2], [2, 2, 3]], //1 - direita(verde)
        [[3, 3, 3], [3, 3, 3], [3, 3, 3]], //2 - centro (laranja)
        [[4, 4, 4], [5, 4, 4], [6, 4, 4]], //3 - esquerda (azul)
        [[5, 5, 5], [5, 5, 5], [5, 5, 5]], //4 - esquerda 2 (vermelho)
        [[4, 5, 6], [6, 6, 6], [6, 6, 6]], //5 - baixo (branco)
    ]);

    useEffect(() => {
        Orientation.lockToLandscape();
    }, [])

    function rodaHorario(face) {
        let novaMatriz = { ...cuboMatriz };
        novaMatriz[face] = cuboMatriz[face].map((row, i) =>
            row.map((val, j) => cuboMatriz[face][cuboMatriz[face].length - 1 - j][i])
        );
        setCuboMatriz(novaMatriz);
    };

    function rodaAntiHorario(face) {
        let novaMatriz = { ...cuboMatriz };
        novaMatriz[face] = cuboMatriz[face].map((row, i) =>
            row.map((val, j) => cuboMatriz[face][j][row.length - 1 - i])
        );
        setCuboMatriz(novaMatriz);
    };

    function linhaParaColuna(faceOrigem, linhaOrigem, faceDestino, colunaDestino) {
        let novaMatriz = { ...cuboMatriz };
        novaMatriz[faceDestino][0][colunaDestino] = cuboMatriz[faceOrigem][linhaOrigem][0];
        novaMatriz[faceDestino][1][colunaDestino] = cuboMatriz[faceOrigem][linhaOrigem][1];
        novaMatriz[faceDestino][2][colunaDestino] = cuboMatriz[faceOrigem][linhaOrigem][2];
        setCuboMatriz(novaMatriz);
    };

    function colunaParaLinha(faceOrigem, colunaOrigem, faceDestino, linhaDestino) {
        let novaMatriz = { ...cuboMatriz };
        novaMatriz[faceDestino][linhaDestino][0] = cuboMatriz[faceOrigem][2][colunaOrigem];
        novaMatriz[faceDestino][linhaDestino][1] = cuboMatriz[faceOrigem][1][colunaOrigem];
        novaMatriz[faceDestino][linhaDestino][2] = cuboMatriz[faceOrigem][0][colunaOrigem];
        setCuboMatriz(novaMatriz);
    };

    function f() {
        rodaHorario(2);
        let linhaSuperior = { ...cuboMatriz[0][2] };
        //vd -> am
        colunaParaLinha(1, 2, 0, 2);
        //b -> vd
        linhaParaColuna(5, 0, 1, 2);
        //az -> b
        colunaParaLinha(3, 0, 5, 0);
        //am -> az
        let novaMatriz = { ...cuboMatriz };
        novaMatriz[3][0][0] = linhaSuperior[0];
        novaMatriz[3][1][0] = linhaSuperior[1];
        novaMatriz[3][2][0] = linhaSuperior[2];
        setCuboMatriz(novaMatriz);
    };

    function fi() {
        f(); f(); f();
    };


    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 3 }}>
                <View style={styles.container}>
                    <View style={styles.vazio} />
                    <Face matriz={cuboMatriz[0]} />
                    <View style={styles.vazio} />
                    <View style={styles.vazio} />
                </View>
                <View style={styles.container}>
                    <Face matriz={cuboMatriz[1]} />
                    <Face matriz={cuboMatriz[2]} />
                    <Face matriz={cuboMatriz[3]} />
                    <Face matriz={cuboMatriz[4]} />
                </View>
                <View style={styles.container}>
                    <View style={styles.vazio} />
                    <Face matriz={cuboMatriz[5]} />
                    <View style={styles.vazio} />
                    <View style={styles.vazio} />
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.button} onPress={() => rodaHorario(2)}>
                        <Text>Horario</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => rodaAntiHorario(2)}>
                        <Text>Anti Horario</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.button} onPress={() => f()}>
                        <Text>F</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => fi()}>
                        <Text>F'</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}
