import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './app/home/Home';
import Map from './app/map/Map';
import Login from './app/notlogged/login/Login';
import Redirection from './app/profile/Redirection';

const Stack = createStackNavigator();


export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Map' component={Map} />
        <Stack.Screen name='Profile' component={Redirection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

