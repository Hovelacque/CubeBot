import React, { useContext, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, Image, RefreshControl, Alert } from 'react-native';
import Orientation from 'react-native-orientation';
import Face from '../../components/Face';
import styles from './styles';

import CuboContext from '../../contexts/cubo';
import MovimentosContext from '../../contexts/movimentos';
import FormulasContext from '../../contexts/formulas';


export default function Cubo({ navigation }) {

    const { cuboMatriz } = useContext(CuboContext);
    const {
        f, fi,
        u, ui,
        l, li,
        r, ri,
        d, di,
        b, bi
    } = useContext(MovimentosContext);
    const { montaCruz, f2f } = useContext(FormulasContext);

    useEffect(() => {
        Orientation.lockToLandscape();
    }, [])


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
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.button} onPress={() => montaCruz()}>
                        <Text>CRUZ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => f2f()}>
                        <Text>F2f</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}
