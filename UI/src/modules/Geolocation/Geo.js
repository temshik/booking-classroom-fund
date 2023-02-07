import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';



const Geo = ({mark:{id, geo, text}}) => {
    // console.log('mark ', id, geo, text)
    return (
        <>
            <div style={{display: 'flex'}}>
                <YMaps>
                    <Map defaultState={{ center: [53.92109521712205, 27.59302856072052], zoom: 18 }} width='700px' height='700px'>
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
                    </Map>
                </YMaps>
            </div>


        </>

    );

}
export default Geo;