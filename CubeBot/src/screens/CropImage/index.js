import React, { Component } from 'react';
import {
    View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput, Image, RefreshControl,
    Alert, Dimensions
} from 'react-native';
import Orientation, { lockToLandscape } from 'react-native-orientation';
import Face from '../../components/Face';
import { RNCamera } from 'react-native-camera';
import styles from './styles';

import PixelColor from 'react-native-pixel-color';
import { getColorFromURL } from 'rn-dominant-color';
import ImageEditor from "@react-native-community/image-editor";

export default class CropImage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            faceAtual: 1,
            face: this.criaFaceVazia(1),
            detectada: false,
            img: '',
            crops: []
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
            const options = { quality: 1, base64: true, fixOrientation: true };
            const data = await this.camera.takePictureAsync(options)
            // alert(data.uri);


            // this.setState({ detectada: true, img: data.uri });

            // Image.getSize(data.uri, async (width, height) => {
            // alert('w' + width + ' h' + height);

            let crops = [];
            let width = 3000;
            let height = 5000;
            let umtercoLargura = width / 3;
            let umtercoAltura = height / 3;

            let y = 0;
            for (var i = 0; i < 3; i++) {
                let x = 0;
                for (var j = 0; j < 3; j++) {
                    let url = await ImageEditor.cropImage(data.uri, {
                        offset: { x, y },
                        size: { width: umtercoLargura, height: umtercoAltura }
                    });
                    crops.push(url);

                    x += umtercoLargura;
                }
                y += umtercoAltura;
            }

            // let x = 0, y = 0, _width = umtercoLargura, _height = umtercoAltura;
            // crops.push(await ImageEditor.cropImage(data.uri, { offset: { x, y }, size: { width: _width, height: _height } }));
            // x = umtercoLargura, y = 0, _width = umtercoLargura, _height = umtercoAltura;
            // crops.push(await ImageEditor.cropImage(data.uri, { offset: { x, y }, size: { width: _width, height: _height } }));
            // x += umtercoLargura, y = 0, _width = umtercoLargura, _height = umtercoAltura;
            // crops.push(await ImageEditor.cropImage(data.uri, { offset: { x, y }, size: { width: _width, height: _height } }));

            this.setState({ detectada: true, crops, img: data.uri });

            // ImageEditor.cropImage(data.uri, {
            //     offset: { x: width / 2, y: height / 2 },
            //     size: { width: 500, height: 500 }
            // }).then(async url => {
            //     // alert("Cropped image uri" + url);
            //     this.setState({ detectada: true, img: url });
            //     let colors = await getColorFromURL(url);
            //     alert(colors.primary)
            // })


            // });
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
        let { detectada, face, faceAtual, img, crops } = this.state;

        return (
            <View style={{
                flex: 1,
                backgroundColor: 'black'
            }}>
                {
                    detectada ?
                        <View style={styles.preview}>
                            {/* <Image source={{ uri: img }} style={styles.imagem} /> */}
                            <View style={styles.linha}>
                                <Image source={{ uri: crops[0] }} style={styles.imagem} />
                                <Image source={{ uri: crops[1] }} style={styles.imagem} />
                                <Image source={{ uri: crops[2] }} style={styles.imagem} />
                            </View>
                            <View style={styles.linha}>
                                <Image source={{ uri: crops[3] }} style={styles.imagem} />
                                <Image source={{ uri: crops[4] }} style={styles.imagem} />
                                <Image source={{ uri: crops[5] }} style={styles.imagem} />
                            </View>
                            <View style={styles.linha}>
                                <Image source={{ uri: crops[6] }} style={styles.imagem} />
                                <Image source={{ uri: crops[7] }} style={styles.imagem} />
                                <Image source={{ uri: crops[8] }} style={styles.imagem} />
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            <RNCamera
                                ref={camera => { this.camera = camera }}
                                style={styles.camera}
                                type={RNCamera.Constants.Type.back}
                                autoFocus={RNCamera.Constants.AutoFocus.on}
                                flashMode={RNCamera.Constants.FlashMode.off}
                            />
                            <View style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%'
                            }}>
                                <View style={[styles.linha, { marginTop: 200, marginLeft: 20, marginRight: 20 }]}>
                                    <View style={styles.mira} />
                                    <View style={styles.mira} />
                                    <View style={styles.mira} />
                                </View>
                                <View style={[styles.linha, { marginLeft: 20, marginRight: 20 }]}>
                                    <View style={styles.mira} />
                                    <View style={styles.mira} />
                                    <View style={styles.mira} />
                                </View>
                                <View style={[styles.linha, { marginBottom: 200, marginLeft: 20, marginRight: 20 }]}>
                                    <View style={styles.mira} />
                                    <View style={styles.mira} />
                                    <View style={styles.mira} />
                                </View>
                            </View>
                        </View>
                }
                <View style={{
                    flex: 1,
                    backgroundColor: 'black',
                    position: 'absolute',
                }}>
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
                </View>

            </View >
        );
    }
}
