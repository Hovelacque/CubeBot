import { Cubo } from '../src/cubo';
import { cor, face } from '../src/consts';

describe('Cubo', () => {
    test('construção', () => {
        //Arrange
        let cubo = new Cubo();
        //Act
        //Assert
        expect(cubo.cuboMatriz.length).toBe(6);
        expect(cubo.cuboMatriz).toEqual([
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]], //0 - cima (amarelo)
            [[1, 1, 1], [1, 1, 1], [1, 1, 1]], //1 - direita(verde)
            [[2, 2, 2], [2, 2, 2], [2, 2, 2]], //2 - centro (laranja)
            [[3, 3, 3], [3, 3, 3], [3, 3, 3]], //3 - esquerda (azul)
            [[4, 4, 4], [4, 4, 4], [4, 4, 4]], //4 - esquerda 2 (vermelho)
            [[5, 5, 5], [5, 5, 5], [5, 5, 5]], //5 - baixo (branco)
        ]);
    });
    test('getLinha', () => {
        //Arrange
        let cubo = new Cubo();
        //Act
        let faceAmarelaLinha0 = cubo.getLinha(face.Cima, 0);
        //Assert
        expect(faceAmarelaLinha0).toEqual([cor.Amarela, cor.Amarela, cor.Amarela]);
    });
    test('getColuna', () => {
        //Arrange
        let cubo = new Cubo();
        //Act
        let faceAmarelaColuna0 = cubo.getColuna(face.Cima, 0);
        //Assert
        expect(faceAmarelaColuna0).toEqual([cor.Amarela, cor.Amarela, cor.Amarela]);
    });
    test('getFace', () => {
        //Arrange
        let cubo = new Cubo();
        //Act
        let faceAmarela = cubo.getFace(face.Cima);
        //Assert
        expect(faceAmarela).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    });
    test('rodaHorario', () => {
        //Arrange
        let cubo = new Cubo();
        cubo.cuboMatriz[face.Cima] = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
        //Act
        cubo.rodaHorario(face.Cima);
        let faceCima = cubo.getFace(face.Cima);
        //Assert
        expect(faceCima).toEqual([[6, 3, 0], [7, 4, 1], [8, 5, 2]]);
    });
});

describe('Movimentos Básicos', () => {
    test("U", () => {
        //Arrange
        let cubo = new Cubo();
        //Act
        cubo.u();
        //Assert
        expect(cubo.getLinha(face.Centro, 0)).toEqual([cor.Azul, cor.Azul, cor.Azul]);
        expect(cubo.getLinha(face.Direita, 0)).toEqual([cor.Vermelha, cor.Vermelha, cor.Vermelha]);
        expect(cubo.getLinha(face.Tras, 0)).toEqual([cor.Verde, cor.Verde, cor.Verde]);
        expect(cubo.getLinha(face.Esquerda, 0)).toEqual([cor.Laranja, cor.Laranja, cor.Laranja]);
    });
    test("U'", () => {
        //Arrange
        let cubo = new Cubo();
        //Act
        cubo.ui();
        //Assert
        expect(cubo.getLinha(face.Centro, 0)).toEqual([cor.Verde, cor.Verde, cor.Verde]);
        expect(cubo.getLinha(face.Direita, 0)).toEqual([cor.Laranja, cor.Laranja, cor.Laranja]);
        expect(cubo.getLinha(face.Tras, 0)).toEqual([cor.Azul, cor.Azul, cor.Azul]);
        expect(cubo.getLinha(face.Esquerda, 0)).toEqual([cor.Vermelha, cor.Vermelha, cor.Vermelha]);
    });
});