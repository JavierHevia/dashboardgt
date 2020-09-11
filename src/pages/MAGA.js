import React, { Component } from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBContainer } from 'mdbreact'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, CardGroup, CardSubtitle, CardHeader } from 'reactstrap'
import Chart from 'react-google-charts'
import { trackPromise } from 'react-promise-tracker'
import Loader from '../components/Loaderpg'
import PARSER from 'babyparse'
var csv2

class home extends Component {
    state = { loading: true };
    sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    wait = async (milliseconds = 2000) => {
        await this.sleep(milliseconds);
        this.setState({
            loading: false,
            textcsv2: ""
        });
        this.readcsv2(require('../carga/MAGA/2/data.csv'))
        this.generate2()
    };

    componentDidMount() {
        this.wait(Math.random() * (1600 - 1000) + 1000)
    }

    readcsv2 = file => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    this.setState({
                        textcsv2: allText
                    });
                }
            }
        };
        rawFile.send(null);
    };

    generate2() {
        PARSER.parse(this.state.textcsv2, {
            complete: function (results) {
                // console.log(results);
                csv2 = results
            }
        })
    }

    grap = () => {

        if (this.state.loading) {
            return <Loader />
        } else {
            if (csv2 !== undefined) {
                // alert(csv.data[1])
                return (
                    <Card className="text-center">
                        <CardBody>
                            <CardTitle>Ministerio de Agricultura, Ganadería y Alimentación </CardTitle>
                            <Chart
                                width={'auto'}
                                height={'auto'}
                                chartType="ColumnChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    [
                                        'Element',
                                        'Porcentaje',

                                        { role: 'style' },
                                        {
                                            sourceColumn: 0,
                                            role: 'annotation',
                                            type: 'string',
                                            calc: 'stringify',
                                        },
                                    ],
                                    [csv2.data[6][0], parseInt(csv2.data[6][1]) / parseInt(csv2.data[6][2]) * 100, 'color: #ABBEE6', null],
                                    [csv2.data[5][0], parseInt(csv2.data[5][1]) / parseInt(csv2.data[5][2]) * 100, 'color: #CBAACB', null],
                                    [csv2.data[4][0], parseInt(csv2.data[4][1]) / parseInt(csv2.data[4][2]) * 100, 'color: #FFFFB5', null],
                                    [csv2.data[3][0], parseInt(csv2.data[3][1]) / parseInt(csv2.data[3][2]) * 100, 'color: #FFCCB6', null],
                                    [csv2.data[2][0], parseInt(csv2.data[2][1]) / parseInt(csv2.data[2][2]) * 100, 'color: #F3B0C3', null],
                                    [csv2.data[1][0], parseInt(csv2.data[1][1]) / parseInt(csv2.data[1][2]) * 100, 'color: #8ED1FC', null],
                                ]}
                                options={{
                                    width: '100%',
                                    height: 400,
                                    bar: { groupWidth: '100%' },
                                    legend: { position: 'none' },
                                }}
                                // For tests
                                rootProps={{ 'data-testid': '6' }}
                            />
                        </CardBody>
                    </Card>
                )
            }else {
                return(
                  <Loader />
                )
            }
        }
    }

    grap2 = () => {
        if (this.state.loading) {
            return <Loader />
        } else {
            return (
                <Card className="text-center">
                    <CardBody>
                        <Chart
                            width={'auto'}
                            height={'500px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Detalle', 'Gasto'],
                                ['FIDEICOMISO FONACON-MINFIN', 17139849.48],
                                ['FIDEI.FONDO NACIONAL DE DESARROLLO FONADES', 709.60],
                                ['FONDO PRIVAT.DIREC.DE LA NORMATIVIDAD DE LA PESCA', 1403407.53],
                                ['FIDEICOMISO FONAGRO', 22014.65],
                                ['CIPREDA', 8.16],
                                ['FIDEICOMISO PARA EL DESARROLLO RURAL GUATE INVIERTE', 386938.79]
                            ]}
                            options={{
                                // title: 'My Daily Activities',
                                // Just add this option
                                width: '100%',
                                sliceVisibilityThreshold: .0,
                                pieHole: 0.3,
                                slices: {
                                    0: { color: '#8ED1FC', offset: 0.3 },
                                    1: { color: '#F3B0C3' },
                                    2: { color: '#FFCCB6' },
                                    3: { color: '#FFFFB5' },
                                    4: { color: '#CBAACB' },
                                    5: { color: '#ABBEE6' }
                                }

                            }}
                            rootProps={{ 'data-testid': '3' }}
                        />
                    </CardBody>
                </Card>
            )
        }
    }

    render() {

        return (
            <>

                <div className='col-11 col-md-11 m-5'>
                    <div class='row'>
                        <div class='col-md-auto'>
                        </div>
                        <div class='col-3'>
                            <h1>  ¿Cuánto de presupuesto nacional se le asignó? </h1>
                            <CardBody>
                                Presupuesto asignado de 2015 a 2020
                            </CardBody>
                        </div>
                        <div class='col-8'>
                            <this.grap />
                        </div>
                    </div>
                </div>

                <div className='col-11 col-md-11 m-5'>
                    <div class='row'>
                        <div class='col-md-auto'>
                        </div>
                        <div class='col-3'>
                            <h1>  ¿Cuánto es el ingreso mensual? </h1>
                            <CardBody>
                                Presupuesto por mes
                            </CardBody>
                        </div>
                        <div class='col-8'>
                            <this.grap2 />
                        </div>
                    </div>
                </div>
            </>
        )

    }
}
export default home
