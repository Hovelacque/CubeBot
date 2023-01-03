import { cor, face } from "./consts";
// import { Face } from "./face";

export class Cubo {

    cuboMatriz: number[][][];

    // faces: Face[] = [];

    constructor() {
        this.cuboMatriz = [
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]], //0 - cima (amarelo)
            [[1, 1, 1], [1, 1, 1], [1, 1, 1]], //1 - direita(verde)
            [[2, 2, 2], [2, 2, 2], [2, 2, 2]], //2 - centro (laranja)
            [[3, 3, 3], [3, 3, 3], [3, 3, 3]], //3 - esquerda (azul)
            [[4, 4, 4], [4, 4, 4], [4, 4, 4]], //4 - esquerda 2 (vermelho)
            [[5, 5, 5], [5, 5, 5], [5, 5, 5]], //5 - baixo (branco)
        ];
        // this.faces = [
        //     new Face(cor.Azul);
        // ]
    }

    rodaHorario(face: number) {
        let novaMatriz = { ...this.cuboMatriz };
        novaMatriz[face] = this.cuboMatriz[face].map((row, i) =>
            row.map((val, j) => this.cuboMatriz[face][this.cuboMatriz[face].length - 1 - j][i])
        );
        this.cuboMatriz = novaMatriz;
    };

    private rodaAntiHorario(face: number) {
        let novaMatriz = { ...this.cuboMatriz };
        novaMatriz[face] = this.cuboMatriz[face].map((row, i) =>
            row.map((val, j) => this.cuboMatriz[face][j][row.length - 1 - i])
        );
        this.cuboMatriz = novaMatriz;
    };

    private linhaParaColuna(faceOrigem: number, linhaOrigem: number, faceDestino: number, colunaDestino: number, invertida: boolean = false) {
        let linha = this.getLinha(faceOrigem, linhaOrigem);
        this.setColuna(faceDestino, colunaDestino, linha, invertida);
    };

    private colunaParaLinha(faceOrigem: number, colunaOrigem: number, faceDestino: number, linhaDestino: number, invertida: boolean = false) {
        let coluna = this.getColuna(faceOrigem, colunaOrigem);
        this.setLinha(faceDestino, linhaDestino, coluna, invertida);
    };

    private colunaParaColuna(faceOrigem, faceDestino, colunaOrigem, colunaDestino = -1, invertida = false) {
        if (colunaDestino == -1)
            colunaDestino = colunaOrigem;
        let coluna = this.getColuna(faceOrigem, colunaOrigem);
        this.setColuna(faceDestino, colunaDestino, coluna, invertida);
    };

    private linhaParaLinha(faceOrigem, faceDestino, linha) {
        let linhaOrigem = this.getLinha(faceOrigem, linha);
        this.setLinha(faceDestino, linha, linhaOrigem);
    };

    private setColuna(faceDestino, colunaDestino, pecas, espelhadas = false) {
        let novaMatriz = { ...this.cuboMatriz };
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
        this.cuboMatriz = novaMatriz;
    };

    private setLinha(faceDestino, linhaDestino, pecas, espelhadas = false) {
        let novaMatriz = { ...this.cuboMatriz };
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
        this.cuboMatriz = novaMatriz;
    };

    getFace(face: number): number[][] {
        return [...this.cuboMatriz[face]];
    };

    getLinha(face: number, linha: number): number[] {
        return [...this.cuboMatriz[face][linha]];
    };

    getColuna(face: number, coluna: number): number[] {
        return [
            this.cuboMatriz[face][0][coluna],
            this.cuboMatriz[face][1][coluna],
            this.cuboMatriz[face][2][coluna]
        ];
    };

    u() {
        let linha0DoCentro = this.getLinha(face.Centro, 0);
        this.linhaParaLinha(face.Direita, face.Centro, 0);
        this.linhaParaLinha(face.Tras, face.Direita, 0);
        this.linhaParaLinha(face.Esquerda, face.Tras, 0);
        this.setLinha(face.Esquerda, 0, linha0DoCentro);
        this.rodaHorario(face.Cima);
    };
}