import {YMaps, Map, Placemark, RouteButton} from '@pbe/react-yandex-maps';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Geo = ({mark:{id, geo, text}}) => {    
    return (
        <>
            <Navbar/>
            <Header/>
            <div style={{display: 'flex'}}>
                <YMaps>
                    <Map defaultState={{ center: geo, zoom: 18 }} width='100%' height='700px'>
                        <Placemark
                            geometry={geo}
                            options={{
                                preset: 'islands#circleIcon',
                                iconImageSize: [40, 40],
                                iconColor: 'green',

                            }}
                            properties={{
                                iconContent: text,
                            }}
                        />
                        <RouteButton options={{ float: "right" }} />
                    </Map>
                </YMaps>
            </div>
            <Footer/>
        </>
    );
}
export default Geo;