import { YMaps, Map } from '@pbe/react-yandex-maps';

const Geolocation = () => (
  <YMaps>
    <Map defaultState={{ center: [53.92109521712205, 27.59302856072052], zoom: 9 }} />
  </YMaps>
);

export default Geolocation;