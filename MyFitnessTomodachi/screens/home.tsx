import { Box, Button, HStack, VStack, Center, Heading, Text } from "native-base"
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { HomeStackParamList } from "../types/HomeStackParamList";
import { useState } from "react";
import { Food } from "../types/food";
import FoodEntry from "../components/foodEntry";

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList,
                                                          'Home'>
export default function Home({ navigation }: { navigation: HomeScreenNavigationProp}) {
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

    const counts = new Map<number, number>()

    // ADDING THE DUMMY DATA
    // TODO: remove after connecting to api
    counts.set(1, 42)
    counts.set(2, 69)

    let totalCal = 0
    let totalProtein = 0
    let totalCarbs = 0
    let totalFat = 0
    for (const food of foods) {
        const qty = counts.get(food.id) as number
        totalCal += food.calories * qty 
        totalProtein += food.protein * qty
        totalCarbs += food.carbohydrates * qty
        totalFat += food.fat * qty
    }


    return (
        <Box>
            <HStack justifyContent="center" padding={"30px"}>
                <Center width={"50%"}>
                    <Text fontSize="xl"> Calories </Text>
                    <Heading fontSize='4xl'> {totalCal} </Heading>
                </Center>
                <VStack width={"50%"}>
                    <Text fontSize="lg"> Protein: {totalProtein}g</Text>
                    <Text fontSize="lg"> Carbs: {totalCarbs}g </Text>
                    <Text fontSize="lg"> Fat: {totalFat}g </Text>
                </VStack>
            </HStack>
            <VStack>
                <Heading paddingBottom={"10px"}>
                    Food Log
                </Heading>
                {
                    foods.map(food => {
                        const params = { food: food }
                        return <FoodEntry key={food.id}
                                          food={food}
                                          qty={counts.get(food.id) as number} 
                                          redirect={() => navigation.push("FoodDetails", params)}
                                          />
                    })
                }
            </VStack>
            <Button colorScheme="primary" 
                    variant="outline"
                    onPress={() => navigation.navigate('FoodList')}>
                Add Food
            </Button>
        </Box>
    )
}