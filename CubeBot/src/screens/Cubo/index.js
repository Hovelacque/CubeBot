import React, { useContext, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, Image, RefreshControl, Alert } from 'react-native';
import Face from '../../components/Face';
import styles from './styles';

export default function Cubo({ navigation }) {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.vazio} />
                <Face cor='yellow' />
                <View style={styles.vazio} />
                <View style={styles.vazio} />
            </View>
            <View style={styles.container}>
                <Face cor='green' />
                <Face cor='orange' />
                <Face cor='blue' />
                <Face cor='red' />
            </View>
            <View style={styles.container}>
                <View style={styles.vazio} />
                <Face cor='white' />
                <View style={styles.vazio} />
                <View style={styles.vazio} />
            </View>
        </SafeAreaView >
    );
}
