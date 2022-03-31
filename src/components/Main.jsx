import React from 'react';
import Historial from './Historial';
import Opciones from './Opciones';
import data from './data.json';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opcionElegida: '',
            historial: [],
            numeroDeHistoria: 0,
        }
    }

    handleReset = () => {
        this.setState({
            opcionElegida: '',
            historial: [],
            numeroDeHistoria: 0
        })
    };

    handleClick = (e) => {
        const letraPulsada = e.target.id;
        if (this.state.numeroDeHistoria >= 7) {
            alert('Esta historia terminó. Para volver a comenzar presione "Reset"');

        } else if (letraPulsada === 'A' && this.state.opcionElegida !== 'A') {
            this.setState({
                opcionElegida: 'A',
                numeroDeHistoria: this.state.numeroDeHistoria + 1,
            });

        } else if (letraPulsada === 'A' && this.state.opcionElegida === 'A') {
            this.setState({
                numeroDeHistoria: this.state.numeroDeHistoria + 2,
            });

        } else if (letraPulsada === 'B' && this.state.opcionElegida === 'A') {
            this.setState({
                numeroDeHistoria: this.state.numeroDeHistoria + 3,
                opcionElegida: 'B',
            });

        } else if (letraPulsada === 'B') {
            this.setState({
                opcionElegida: 'B',
                numeroDeHistoria: this.state.numeroDeHistoria + 2,
            });
        }
    }
    componentDidUpdate(prevState) {
        if (prevState.numeroDeHistoria !== this.state.numeroDeHistoria) {
            this.state.historial.push(this.state.opcionElegida);
        }
    }

    render() {
        return (
            <div className="main">
                <div className='divBtnReset'>
                    <button onClick={this.handleReset} className={"btnReset"}>Reset</button>
                </div>
                <div className="layout">
                    <h1 className="historia">{data[this.state.numeroDeHistoria].historia}</h1>

                    <Opciones
                        handleClick={this.handleClick}
                        OpcionA={data[this.state.numeroDeHistoria].opciones.a}
                        OpcionB={data[this.state.numeroDeHistoria].opciones.b}
                    />

                    <Historial
                        opcionElegida={this.state.opcionElegida}
                        historial={this.state.historial.map(
                            (element, index) => (
                                <li key={index}>{element}</li>
                            ),
                            data[this.state.numeroDeHistoria].id
                        )}
                    />
                </div>
            </div>

        )
    }


}


export default Main;
