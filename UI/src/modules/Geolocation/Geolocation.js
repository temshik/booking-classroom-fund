import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import {mapMarkers} from "../../docs/data.ts";
// import {mark} from '../../Icons/marker1.png'


const Geolocation = () => (
    <>
        <div style={{display: 'flex'}}>
            <YMaps>
                <Map defaultState={{ center: [53.92109521712205, 27.59302856072052], zoom: 15 }} width='700px' height='700px'>
                    {mapMarkers.map(marker => {
                        return <Placemark
                            geometry={marker.geo}
                            options={{
                                 preset: 'islands#circleIcon',
                                //iconLayout: "default#image",
                                iconImageSize: [40, 40],
                                 iconColor: 'green',
                                //iconImageHref: '../../Icons/marker1.png'
                            }}
                            properties={{
                                iconContent: marker.text,
                            }}
                        />
                    })}
                </Map>
            </YMaps>
        </div>
    </>

);

export default Geolocation;