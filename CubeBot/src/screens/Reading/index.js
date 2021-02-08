import React, { Component } from 'react';
import {
    View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, Image, RefreshControl,
    Alert, Dimensions
} from 'react-native';
import Orientation from 'react-native-orientation';
import Face from '../../components/Face';
import { RNCamera } from 'react-native-camera';
import styles from './styles';

import PixelColor from 'react-native-pixel-color';
import { getColorFromURL } from 'rn-dominant-color';
import ImageEditor from "@react-native-community/image-editor";

export default class Reading extends Component {

    constructor(props) {
        super(props);

        this.state = {
            faceAtual: 1,
            face: this.criaFaceVazia(1),
            detectada: false,
            img: ''
        };
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    criaFaceVazia = (face) => {
        return [[0, 0, 0], [0, face, 0], [0, 0, 0]]
    }

    detectar = async () => {
        if (this.camera) {
            const options = { quality: 1, base64: true, orientation: Orientation.portrait };
            const data = await this.camera.takePictureAsync(options)
            // alert(data.uri);


            // this.setState({ detectada: true, img: data.uri });

            Image.getSize(data.uri, (width, height) => {
                // alert('w' + width + ' h' + height);


                ImageEditor.cropImage(data.uri, {
                    offset: { x: width / 2, y: height / 2 },
                    size: { width: 500, height: 500 }
                }).then(async url => {
                    // alert("Cropped image uri" + url);
                    this.setState({ detectada: true, img: url });
                    let colors = await getColorFromURL(url);
                    alert(colors.primary)
                })


            });
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
        let windowWidth = Dimensions.get('window').width;
        let { detectada, face, faceAtual, img } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                {
                    detectada ?
                        <View style={styles.preview}>
                            <Image source={{ uri: img }} style={{
                                height: '100%',
                                width: '100%',
                                resizeMode: 'contain'
                            }} />
                        </View>
                        :
                        <View style={{
                            flex: 5,
                            backgroundColor: 'red',
                            flexDirection: 'row',
                        }}>

                            <RNCamera
                                ref={camera => { this.camera = camera }}
                                style={styles.camera}
                                type={RNCamera.Constants.Type.back}
                                autoFocus={RNCamera.Constants.AutoFocus.on}
                                flashMode={RNCamera.Constants.FlashMode.off}
                            />
                            <View stlye={{
                                flex: 1,
                                // zIndex: 5,
                                // position: 'absolute',
                                // top: 0,
                                // left: 0
                                // justifyContent: "center",
                                // alignItems: "center",
                            }}>
                                <View stlye={{
                                    flexDirection: 'row',
                                    backgroundColor: 'blue',
                                    flex: 1,
                                    width: '100%',
                                    height: '100%'
                                    // flexDirection: 'row',
                                    // justifyContent: "center",
                                    // alignItems: "center",
                                }}>
                                    <View style={styles.mira} />
                                    <View style={styles.mira} />
                                    <View style={styles.mira} />
                                </View>
                            </View>

                        </View>
                }
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
