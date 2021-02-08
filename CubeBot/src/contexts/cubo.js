import React, { createContext, useState } from 'react';

const CuboContext = createContext({});

export const CuboProvider = ({ children }) => {

    const [cuboMatriz, setCuboMatriz] = useState([
        [[1, 1, 1], [1, 1, 1], [1, 2, 3]], //0 - cima (amarelo)
        [[2, 2, 1], [2, 2, 2], [2, 2, 3]], //1 - direita(verde)
        [[3, 3, 3], [2, 3, 1], [3, 3, 3]], //2 - centro (laranja)
        [[4, 4, 4], [5, 4, 4], [6, 4, 4]], //3 - esquerda (azul)
        [[5, 5, 5], [5, 5, 5], [5, 5, 5]], //4 - esquerda 2 (vermelho)
        [[4, 5, 6], [6, 6, 6], [6, 6, 6]], //5 - baixo (branco)
    ]);

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

    return (
        <CuboContext.Provider value={{
            cuboMatriz,

            rodaHorario, rodaAntiHorario,
            linhaParaColuna, colunaParaLinha, colunaParaColuna, linhaParaLinha,
            getLinha, setLinha, getColuna, setColuna
        }}>
            {children}
        </CuboContext.Provider>
    );
}

export default CuboContext;
