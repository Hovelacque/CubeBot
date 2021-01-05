import React, { createContext, useState, useContext } from 'react';
import { face } from './consts';

import CuboContext from './cubo';

const MovimentosContext = createContext({});

export const MovimentosProvider = ({ children }) => {

    const {
        rodaHorario, rodaAntiHorario,
        linhaParaColuna, colunaParaLinha, colunaParaColuna, linhaParaLinha,
        getLinha, setLinha, getColuna, setColuna
    } = useContext(CuboContext);

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

        rodaAntiHorario(face.Branca);
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
        <MovimentosContext.Provider value={{
            f, fi,
            u, ui,
            l, li,
            r, ri,
            d, di,
            b, bi
        }}>
            {children}
        </MovimentosContext.Provider>
    );
}

export default MovimentosContext;
