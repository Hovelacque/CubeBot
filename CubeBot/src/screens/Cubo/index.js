import React, { useContext, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, Image, RefreshControl, Alert } from 'react-native';
import Orientation from 'react-native-orientation';
import Face from '../../components/Face';
import styles from './styles';

const face = {
    Amarela: 0,
    Verde: 1,
    laranja: 2,
    Azul: 3,
    Vermelha: 4,
    Branca: 5
}

export default function Cubo({ navigation }) {

    const [cuboMatriz, setCuboMatriz] = useState([
        [[1, 1, 1], [1, 1, 1], [1, 2, 3]], //0 - cima (amarelo)
        [[2, 2, 1], [2, 2, 2], [2, 2, 3]], //1 - direita(verde)
        [[3, 3, 3], [2, 3, 1], [3, 3, 3]], //2 - centro (laranja)
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

    function linhaParaColuna(faceOrigem, linhaOrigem, faceDestino, colunaDestino, invertida = false) {
        let linha = getLinha(faceOrigem, linhaOrigem);
        setColuna(faceDestino, colunaDestino, linha, invertida);
    };

    function colunaParaLinha(faceOrigem, colunaOrigem, faceDestino, linhaDestino, invertida = false) {
        let coluna = getColuna(faceOrigem, colunaOrigem);
        setLinha(faceDestino, linhaDestino, coluna, invertida);
    };

    function colunaParaColuna(faceOrigem, faceDestino, colunaOrigem, colunaDestino = -1, invertida = false) {
        if (colunaDestino == -1)
            colunaDestino = colunaOrigem;
        let coluna = getColuna(faceOrigem, colunaOrigem);
        setColuna(faceDestino, colunaDestino, coluna, invertida);
    };

    function linhaParaLinha(faceOrigem, faceDestino, linha) {
        let linhaOrigem = getLinha(faceOrigem, linha);
        setLinha(faceDestino, linha, linhaOrigem);
    };

    function getLinha(face, linha) {
        return { ...cuboMatriz[face][linha] };
    };

    function getColuna(face, coluna) {
        return [
            cuboMatriz[face][0][coluna],
            cuboMatriz[face][1][coluna],
            cuboMatriz[face][2][coluna]
        ];
    };

    function setColuna(faceDestino, colunaDestino, pecas, espelhadas = false) {
        let novaMatriz = { ...cuboMatriz };
        if (espelhadas) {
            novaMatriz[faceDestino][0][colunaDestino] = pecas[2];
            novaMatriz[faceDestino][1][colunaDestino] = pecas[1];
            novaMatriz[faceDestino][2][colunaDestino] = pecas[0];
        }
        else {
            novaMatriz[faceDestino][0][colunaDestino] = pecas[0];
            novaMatriz[faceDestino][1][colunaDestino] = pecas[1];
            novaMatriz[faceDestino][2][colunaDestino] = pecas[2];
        }
        setCuboMatriz(novaMatriz);
    };

    function setLinha(faceDestino, linhaDestino, pecas, espelhadas = false) {
        let novaMatriz = { ...cuboMatriz };
        if (espelhadas) {
            novaMatriz[faceDestino][linhaDestino][0] = pecas[2];
            novaMatriz[faceDestino][linhaDestino][1] = pecas[1];
            novaMatriz[faceDestino][linhaDestino][2] = pecas[0];
        }
        else {
            novaMatriz[faceDestino][linhaDestino][0] = pecas[0];
            novaMatriz[faceDestino][linhaDestino][1] = pecas[1];
            novaMatriz[faceDestino][linhaDestino][2] = pecas[2];
        }
        setCuboMatriz(novaMatriz);
    };

    function f() {
        let linhaSuperior = getLinha(face.Amarela, 2);
        colunaParaLinha(face.Verde, 2, face.Amarela, 2, true);
        linhaParaColuna(face.Branca, 0, face.Verde, 2);
        colunaParaLinha(face.Azul, 0, face.Branca, 0, true);
        setColuna(face.Azul, 0, linhaSuperior);

        rodaHorario(face.laranja);
    };

    function fi() {
        let linhaSuperior = getLinha(face.Amarela, 2);
        colunaParaLinha(face.Azul, 0, face.Amarela, 2);
        linhaParaColuna(face.Branca, 0, face.Azul, 0, true);
        colunaParaLinha(face.Verde, 2, face.Branca, 0);
        setColuna(face.Verde, 2, linhaSuperior, true);

        rodaAntiHorario(face.laranja);
    };

    function u() {
        let centro = getLinha(face.laranja, 0);
        linhaParaLinha(face.Azul, face.laranja, 0);
        linhaParaLinha(face.Vermelha, face.Azul, 0);
        linhaParaLinha(face.Verde, face.Vermelha, 0);
        setLinha(face.Verde, 0, centro);

        rodaHorario(face.Amarela);
    };

    function ui() {
        let centro = getLinha(face.laranja, 0);
        linhaParaLinha(face.Verde, face.laranja, 0);
        linhaParaLinha(face.Vermelha, face.Verde, 0);
        linhaParaLinha(face.Azul, face.Vermelha, 0);
        setLinha(face.Azul, 0, centro);

        rodaAntiHorarioorario(face.Amarela);
    };

    function l() {
        let centro = getColuna(face.laranja, 0);
        colunaParaColuna(face.Amarela, face.laranja, 0);
        colunaParaColuna(face.Vermelha, face.Amarela, 2, 0, true);
        colunaParaColuna(face.Branca, face.Vermelha, 0, 2, true);
        setColuna(face.Branca, 0, centro);

        rodaHorario(face.Verde);
    };

    function li() {
        let centro = getColuna(face.laranja, 0);
        colunaParaColuna(face.Branca, face.laranja, 0);
        colunaParaColuna(face.Vermelha, face.Branca, 2, 0, true);
        colunaParaColuna(face.Amarela, face.Vermelha, 0, 2, true);
        setColuna(face.Amarela, 0, centro);

        rodaAntiHorario(face.Verde);
    };

    function r() {
        let centro = getColuna(face.laranja, 2);
        colunaParaColuna(face.Branca, face.laranja, 2);
        colunaParaColuna(face.Vermelha, face.Branca, 0, 2, true);
        colunaParaColuna(face.Amarela, face.Vermelha, 2, 0, true);
        setColuna(face.Amarela, 2, centro);

        rodaHorario(face.Azul);
    };

    function ri() {
        let centro = getColuna(face.laranja, 2);
        colunaParaColuna(face.Amarela, face.laranja, 2);
        colunaParaColuna(face.Vermelha, face.Amarela, 0, 2, true);
        colunaParaColuna(face.Branca, face.Vermelha, 2, 0, true);
        setColuna(face.Branca, 2, centro);

        rodaAntiHorario(face.Azul);
    };


    function d() {
        let centro = getLinha(face.laranja, 2);
        linhaParaLinha(face.Verde, face.laranja, 2);
        linhaParaLinha(face.Vermelha, face.Verde, 2);
        linhaParaLinha(face.Azul, face.Vermelha, 2);
        setLinha(face.Azul, 2, centro);

        rodaHorario(face.Branca);
    };

    function di() {
        let centro = getLinha(face.laranja, 0);
        linhaParaLinha(face.Azul, face.laranja, 2);
        linhaParaLinha(face.Vermelha, face.Azul, 2);
        linhaParaLinha(face.Verde, face.Vermelha, 2);
        setLinha(face.Verde, 2, centro);

        rodaAntiHorarioorario(face.Branca);
    };

    function b() {
        let linhaSuperior = getLinha(face.Amarela, 0);
        colunaParaLinha(face.Azul, 2, face.Amarela, 0);
        linhaParaColuna(face.Branca, 2, face.Azul, 2, true);
        colunaParaLinha(face.Verde, 0, face.Branca, 2);
        setColuna(face.Verde, 0, linhaSuperior, true);

        rodaHorario(face.Vermelha);
    };

    function bi() {
        let linhaSuperior = getLinha(face.Amarela, 0);
        colunaParaLinha(face.Verde, 0, face.Amarela, 0, true);
        linhaParaColuna(face.Branca, 2, face.Verde, 0);
        colunaParaLinha(face.Azul, 2, face.Branca, 2, true);
        setColuna(face.Azul, 2, linhaSuperior);

        rodaAntiHorario(face.Vermelha);
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
                    <TouchableOpacity style={styles.button} onPress={() => f()}>
                        <Text>F</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => fi()}>
                        <Text>F'</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.button} onPress={() => u()}>
                        <Text>U</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => ui()}>
                        <Text>U'</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.button} onPress={() => l()}>
                        <Text>L</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => li()}>
                        <Text>L'</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.button} onPress={() => r()}>
                        <Text>R</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => ri()}>
                        <Text>R'</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.button} onPress={() => d()}>
                        <Text>D</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => di()}>
                        <Text>D'</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.button} onPress={() => b()}>
                        <Text>B</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => bi()}>
                        <Text>B'</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}
