import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './pages/Home';
import Search from './pages/Search';
import { StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

function Routes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        styles={styles.container}
        name="Home"
        component={Home}
        options={{ title: 'Minha Cidade' }}
      />

      <Drawer.Screen
        name="Search"
        component={Search}
        options={{ title: 'Procurar' }}
      />
    </Drawer.Navigator>
  );
}

export default Routes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    color: 'red',
  },
});
