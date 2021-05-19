import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/colors';
import { Welcome } from '../Pages/Welcome';
import { UserIdentification } from '../Pages/UserIdentification';
import { Confirmation } from '../Pages/Confirmation';

import { PlantSave } from '../Pages/PlantSave';
import { MyPlants } from '../Pages/MyPlants';
import AuthRoutes from './tab.routes';
const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <StackRoutes.Navigator
    headerMode="none"
    screenOptions={{ cardStyle: { backgroundColor: colors.white } }}
  >
    <StackRoutes.Screen name="Welcome" component={Welcome} />
    <StackRoutes.Screen
      name="UserIdentification"
      component={UserIdentification}
    />
    <StackRoutes.Screen name="Confirmation" component={Confirmation} />
    <StackRoutes.Screen name="PlantSelect" component={AuthRoutes} />
    <StackRoutes.Screen name="PlantSave" component={PlantSave} />
    <StackRoutes.Screen name="MyPlants" component={AuthRoutes} />
  </StackRoutes.Navigator>
);
export default AppRoutes;
