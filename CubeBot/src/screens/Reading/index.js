import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, Image, RefreshControl, Alert } from 'react-native';
import Orientation from 'react-native-orientation';
import Face from '../../components/Face';
import { RNCamera } from 'react-native-camera';
import styles from './styles';

export default class Reading extends Component {

    constructor(props) {
        super(props);

        this.state = {
            faceAtual: 1,
            face: this.criaFaceVazia(1),
            detectada: false
        };
    }

    componentWillMount() {
        Orientation.lockToPortrait();
    }

    criaFaceVazia = (face) => {
        return [[0, 0, 0], [0, face, 0], [0, 0, 0]]
    }

    detectar = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            // alert(data.uri);

            this.setState({ detectada: true })
        }
    }

    proximo = () => {
        let faceAtual = this.state.faceAtual + 1;
        this.setState({
            faceAtual,
            face: this.criaFaceVazia(faceAtual),
            detectada: false
        })
    }

    repetir = () => {
        this.setState({ detectada: false })
    }

    resolver = () => {
        this.setState({ detectada: false })
    }

    render() {
        let { detectada, face, faceAtual } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <RNCamera
                    ref={camera => { this.camera = camera }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <View style={styles.preview}>
                    <Face matriz={face} />
                </View>
                {
                    detectada ?
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this.repetir} style={styles.capture}>
                                <Text style={styles.buttonText}> REPETIR </Text>
                            </TouchableOpacity>
                            {
                                faceAtual < 6 ?
                                    <TouchableOpacity onPress={this.proximo} style={styles.capture}>
                                        <Text style={styles.buttonText}> PROXIMA FACE </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={this.resolver} style={styles.capture}>
                                        <Text style={styles.buttonText}> RESOLVER </Text>
                                    </TouchableOpacity>
                            }
                        </View>
                        :
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this.detectar} style={styles.capture}>
                                <Text style={styles.buttonText}> DETECTAR </Text>
                            </TouchableOpacity>
                        </View>
                }
            </SafeAreaView >
        );
    }
}
