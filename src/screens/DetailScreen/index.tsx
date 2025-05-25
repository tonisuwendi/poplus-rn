import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useRef, useState } from 'react';
import MapView, { Polygon, PROVIDER_DEFAULT } from 'react-native-maps';
import statesGeoJSON from '../../assets/data/us-states.json';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import { ArrowLeft } from 'lucide-react-native';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({ route }: DetailScreenProps) => {
  const { state } = route.params;
  const [polygonData, setPolygonData] = useState<any[]>([]);
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleGetPolygonData = useCallback(() => {
    const selectedState = statesGeoJSON.features.find(
      (feature) => feature.properties.NAME.toLowerCase() === state['Slug State'].toLowerCase()
    );
    if (!selectedState) { return; }

    const { coordinates } = selectedState.geometry;
    const { type } = selectedState.geometry;

    let extractedPolygons: any[] = [];

    if (type === 'Polygon') {
      extractedPolygons = [coordinates];
    } else if (type === 'MultiPolygon') {
      extractedPolygons = coordinates;
    }

    const parsedPolygons = extractedPolygons.map((polygon: any) =>
      polygon[0].map(([lon, lat]: [number, number]) => ({
        latitude: lat,
        longitude: lon,
      }))
    );

    setPolygonData(parsedPolygons);

    setTimeout(() => {
      const allCoords = parsedPolygons.flat();
      if (mapRef.current && allCoords.length > 0) {
        mapRef.current.fitToCoordinates(allCoords, {
          edgePadding: { top: 80, bottom: 80, left: 40, right: 40 },
          animated: true,
        });
      }
    }, 500);
  }, [state]);

  useEffect(() => {
    setTimeout(() => {
      handleGetPolygonData();
    }, 1000);
  }, [handleGetPolygonData]);

  if (polygonData.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator animating={true} size="large" />
        <Text>Loading Maps...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ArrowLeft />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: 37.0902,
          longitude: -95.7129,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {polygonData.map((polygonCoords, index) => (
          <Polygon
            key={index}
            coordinates={polygonCoords}
            strokeColor="#0000FF"
            fillColor="rgba(0,0,255,0.1)"
            strokeWidth={2}
          />
        ))}
      </MapView>
      <View style={styles.bottomContainer}>
        <Image
          source={{ uri: state.image }}
          width={500}
          height={300}
          style={styles.boxImage}
        />
        <Text style={styles.stateName}>{state.State}</Text>
        <Text style={styles.population}>Population ({state.Year}): {state.Population.toLocaleString('en-US')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
