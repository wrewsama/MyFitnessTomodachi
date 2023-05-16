import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { HomeStackParamList } from "../types/HomeStackParamList";
import { Box, Button, Text, Icon, Input, VStack } from "native-base";
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react';
import { Food } from '../types/food';
import FoodEntry from '../components/foodEntry';

type FoodListNavProp = NativeStackNavigationProp<HomeStackParamList,
                                                 'FoodList'>
export default function FoodList({ navigation }: {navigation: FoodListNavProp }) {
    const [foods, setFoods] = useState<Food[]>([
        {
            id: 1,
            name: "dummy1",
            unit: "g",
            calories: 50,
            protein: 4,
            carbohydrates: 3,
            fat: 2
        }, {
            id: 2,
            name: "dummy2",
            unit: "g",
            calories: 40,
            protein: 3,
            carbohydrates: 5,
            fat: 2.5
        }
    ])

    return (
        <Box>
            <Input placeholder="Search"
                   variant="filled"
                   width="100%"
                   borderRadius="10"
                   py="1"
                   px="2"
                   InputLeftElement={
                       <Icon ml="2"
                             size="4"
                             color="gray.400"
                             as={
                                 <Ionicons name="ios-search" />
                                 } />
                        } />

            <VStack>
                {
                    foods.map(food => {
                        const params = { food: food }
                        return <FoodEntry key={food.id}
                                          food={food}
                                          qty={1} 
                                          redirect={() => navigation.navigate("FoodDetails", params)}
                                          />
                    })
                }
            </VStack>
            <Button onPress={() => navigation.navigate('AddFood')}> add food </Button>
        </Box>
    )
}