import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, View } from 'react-native';
import * as Location from 'expo-location';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';

import api, { key } from '../../services/api';

//dados ficticios
/*const mylist = [
  {
    date: '15/03',
    weekday: 'Seg',
    max: 28,
    min: 17,
    description: 'Tempestades',
    condition: 'storm',
  },
  {
    date: '16/03',
    weekday: 'Ter',
    max: 27,
    min: 18,
    description: 'Tempestades',
    condition: 'clear_day',
  },
  {
    date: '17/03',
    weekday: 'Qua',
    max: 28,
    min: 18,
    description: 'Tempestades',
    condition: 'storm',
  },
  {
    date: '18/03',
    weekday: 'Qui',
    max: 28,
    min: 18,
    description: 'Tempestades',
    condition: 'storm',
  },
  {
    date: '19/03',
    weekday: 'Sex',
    max: 27,
    min: 19,
    description: 'Tempestades isoladas',
    condition: 'storm',
  },
  {
    date: '20/03',
    weekday: 'Sáb',
    max: 27,
    min: 18,
    description: 'Parcialmente nublado',
    condition: 'cloudly_day',
  },
  {
    date: '21/03',
    weekday: 'Dom',
    max: 28,
    min: 19,
    description: 'Ensolarado com muitas nuvens',
    condition: 'cloudly_day',
  },
  {
    date: '22/03',
    weekday: 'Seg',
    max: 30,
    min: 18,
    description: 'Parcialmente nublado',
    condition: 'cloudly_day',
  },
  {
    date: '23/03',
    weekday: 'Ter',
    max: 30,
    min: 20,
    description: 'Tempo nublado',
    condition: 'cloud',
  },
  {
    date: '24/03',
    weekday: 'Qua',
    max: 28,
    min: 20,
    description: 'Tempestades',
    condition: 'storm',
  },
];*/

export default function Home() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const [icon, setIcon] = useState({ name: 'cloud', color: '#fff' });
  const [background, setBackground] = useState(['#1ed6ff', '#97c1ff']);

  useEffect(() => {
    //cria e já chama automaticamente requisição da localizacao gps
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permissão negada para acessar localização');
        setLoading(false);
        return;
      }

      //pegar localização
      let location = await Location.getCurrentPositionAsync({});
      //console.log(location.coords);

      //weather?key=2f37ea1c&lat=-23.682&lon=-46.875
      const response = await api.get(
        `/weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
      );

      setWeather(response.data.results);
      console.log(weather);

      //verificar se esta de dia ou noite (mudar background)
      if (response.data.results.currently === 'noite') {
        setBackground(['#0c3741', '#0f2f61']);
      }

      switch (response.data.results.condition_slug) {
        case 'clear_day':
          setIcon({ name: 'partly-sunny', color: '#ffb300' });
          break;
        case 'rain':
          setIcon({ name: 'rainy', color: '#fff' });
          break;
        case 'storm':
          setIcon({ name: 'rainy', color: '#fff' });
          break;
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 17, fontStyle: 'italic' }}>
          Carregando dados...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <Header weather={weather} icon={icon} background={background} />
      <Conditions weather={weather} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ paddingBottom: '5%' }}
        style={styles.list}
        data={weather.forecast}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <Forecast data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f0ff',
    paddingTop: '5%',
  },
  list: {
    marginTop: 10,
    marginLeft: 10,
  },
});
