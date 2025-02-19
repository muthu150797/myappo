import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MyCustomComponent() {
    const map = useMap();
    if (!map) {
      console.log('Map is not available');
      return null;
    }
    console.log('Map is available', map);
    return <div>Map loaded</div>;
}

export default function MyMap() {
  return (
 <div>  <MyCustomComponent />
 </div>
    
  );
}