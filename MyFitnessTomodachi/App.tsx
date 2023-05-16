import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/home'
import FoodDetails from './screens/foodDetails'
import AddFood from './screens/addFood'
import FoodList from './screens/foodList'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider } from 'native-base';

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="FoodDetails" component={FoodDetails} />    
                    <Stack.Screen name="AddFood" component={AddFood} />    
                    <Stack.Screen name="FoodList" component={FoodList} />    
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
