import { View, Text, Button } from "react-native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { HomeStackParamList } from "../types/HomeStackParamList";

type FoodListNavProp = NativeStackNavigationProp<HomeStackParamList,
                                                 'FoodList'>
export default function FoodList({ navigation }: {navigation: FoodListNavProp }) {
    return (
        <View>
            <Text>
                food list
            </Text>
            <Button title='add new food' 
                    onPress={() => navigation.navigate('AddFood')} />

            <Button title='edit food' 
                    onPress={() => navigation.navigate('Food')} />
        </View>
    )
}