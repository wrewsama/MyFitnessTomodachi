import { Box, HStack, Input, InputGroup, InputRightAddon, Text, VStack } from "native-base";
import { Food } from "../types/food";
import type { HomeStackParamList } from "../types/HomeStackParamList";
import type { RouteProp } from "@react-navigation/native";
import { useState } from "react";


type FoodDetailsRouteProp = RouteProp<HomeStackParamList, "FoodDetails">
type FoodDetailsProp = { route : FoodDetailsRouteProp }
export default function FoodDetails({ route }: FoodDetailsProp) {
    const { food } = route.params as { food: Food } 
    const [calories, setCalories] = useState(food.calories.toString())
    const [protein, setProtein] = useState(food.protein.toString())
    const [carbs, setCarbs] = useState(food.carbohydrates.toString())
    const [fat, setFat] = useState(food.fat.toString())
    const [unit, setUnit] = useState(food.unit)

    const handleCalChange = (text: string) => setCalories(text)
    const handleProteinChange = (text: string) => setProtein(text)
    const handleCarbChange = (text: string) => setCarbs(text)
    const handleFatChange = (text: string) => setFat(text)
    const handleUnitChange = (text: string) => setUnit(text)
    return (
        <Box padding="10px">
            <VStack>
                <HStack justifyContent="space-between">
                    <Text fontSize="lg">
                        Calories: 
                    </Text>
                    <InputGroup w="60%">
                        <Input
                            w="80%"
                            value={calories}
                            onChangeText={handleCalChange}
                        />
                        <InputRightAddon children={"cal"} />
                    </InputGroup>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text fontSize="lg">
                        Protein: 
                    </Text>
                    <InputGroup w="60%">
                        <Input
                            w="80%"
                            value={protein}
                            onChangeText={handleProteinChange}
                        />
                        <InputRightAddon children={"g"} />
                    </InputGroup>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text fontSize="lg">
                        Carbohydrates: 
                    </Text>
                    <InputGroup w="60%">
                        <Input
                            w="80%"
                            value={carbs}
                            onChangeText={handleCarbChange}
                        />
                        <InputRightAddon children={"g"} />
                    </InputGroup>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text fontSize="lg">
                        Fat: 
                    </Text>
                    <InputGroup w="60%">
                        <Input
                            w="80%"
                            value={fat}
                            onChangeText={handleFatChange}
                        />
                        <InputRightAddon children={"g"} />
                    </InputGroup>
                </HStack>
                <HStack justifyContent="space-between">
                    <Text fontSize="lg">
                        Unit: 
                    </Text>
                    <Input
                        size="lg"
                        w='10%'
                        marginRight="10px"
                        variant="unstyled"
                        value={unit.toString()}
                        onChangeText={handleUnitChange}
                     />
                </HStack>
            </VStack>
        </Box>
    )
}