import { View, Text, Button } from "react-native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { HomeStackParamList } from "../types/HomeStackParamList";

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList,
                                                          'Home'>
export default function Home({ navigation }: { navigation: HomeScreenNavigationProp}) {
    return (
        <View>
            <Text>
                home
            </Text>
            <Button title='add food' onPress={() => navigation.navigate('FoodList')}/>
        </View>
    )
}