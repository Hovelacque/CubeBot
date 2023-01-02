import React, { createContext, useState, useContext } from 'react';
import MovimentosContext from './movimentos';

const FormulasContext = createContext({});

export const FormulasProvider = ({ children }) => {

    const {
        f, fi,
        u, ui,
        l, li,
        r, ri,
        d, di,
        b, bi
    } = useContext(MovimentosContext);

    function montaCruz() {
        peca1Cruz(44);
    }

    function f2f() {
        peca1Cruz(10);
    }

    /*
    * Posição Destino = 47/39
    */
    function peca1Cruz(origem) {
        switch (origem) {
            case 44:
                di();
                break;
            case 42:
                di(); di();
                break;
            case 45:
                d();
                break;
            case 30:
                l(); b();
                break;
            case 21:
                b();
                break;
            case 10:
                li(); b();
                break;
            case 22:
                fi(); d(); d();
                break;
            case 23:
                l(); di();
                break;
            case 33:
                f(); l(); di();
                break;
            case 24:
                ri(); d();
                break;
            case 13:
                f(); ri(); d();
                break;
            case 7:
                f(); f(); d(); d();
                break;
            case 4:
                l(); l(); di();
                break;
            case 2:
                b(); b();
                break;
            case 5:
                ui(); ui(); b(); b();
                break;
            case 25:
                ri(); d();
                break;
            case 16:
                r(); bi();
                break;
            case 36:
                ri(); b();
                break;
            case 26:
                bi();
                break;
            case 27:
                r(); d();
                break;
            case 19:
                bi(); r();; d();
                break;
            case 28:
                li(); di();
                break;
        }
    }

    return (
        <FormulasContext.Provider value={{ montaCruz, f2f }}>
            {children}
        </FormulasContext.Provider>
    );
}

export default FormulasContext;
