import { Alert, Box, Button, HStack, Icon, Input, InputGroup, InputRightAddon, Text, VStack } from "native-base";
import { Food } from "../types/food";
import type { HomeStackParamList } from "../types/HomeStackParamList";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons'
import Api from "../api/api";


type Props = NativeStackScreenProps<HomeStackParamList,
                                    'FoodDetails'>
type Params = { food: Food }
export default function FoodDetails({ route, navigation }: Props) {
    const { food } = route.params as Params

    // Use States
    const [calories, setCalories] = useState(food.calories.toString())
    const [protein, setProtein] = useState(food.protein.toString())
    const [carbs, setCarbs] = useState(food.carbohydrates.toString())
    const [fat, setFat] = useState(food.fat.toString())
    const [unit, setUnit] = useState(food.unit)
    const [error, setError] = useState(false)

    // change handlers
    const handleCalChange = (text: string) => setCalories(text)
    const handleProteinChange = (text: string) => setProtein(text)
    const handleCarbChange = (text: string) => setCarbs(text)
    const handleFatChange = (text: string) => setFat(text)
    const handleUnitChange = (text: string) => setUnit(text)

    // button handlers
    const onSave = () => {
        let newCal: number
        let newProtein: number
        let newCarbs: number
        let newFat: number
        newCal = parseFloat(calories)
        newProtein = parseFloat(protein)
        newCarbs = parseFloat(carbs)
        newFat = parseFloat(fat)

        // checking for invalid (not number) inputs
        if ([newCal, newProtein, newCarbs, newFat].some(isNaN)) {
            setError(true)
            return
        } 

        setError(false)

        const newFood: Food = {
            id: food.id,
            name: food.name,
            calories: newCal,
            protein: newProtein,
            carbohydrates: newCarbs,
            fat: newFat,
            unit: unit
        }

        // TODO: POST to backend
        console.log(newFood)
    }

    const onDelete = () => {
        Api.deleteFood(food.id)
            .then(res => {
                navigation.pop()
            })
            .catch(e => {
                console.error(e)
            })
    }
    return (
        <Box padding="10px">
            {
                error && (
                    <Alert status='error' colorScheme='error'>
                        <HStack >
                            <Icon 
                                mr='2'
                                size='5'
                                color='danger'
                                as={
                                    <Ionicons name="alert-circle-outline" />
                                }
                             />
                            <Text>
                                Invalid Input
                            </Text>
                        </HStack>
                    </Alert>
                )
            }
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
                            keyboardType="numeric"
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
                            keyboardType="numeric"
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
                            keyboardType="numeric"
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
                            keyboardType="numeric"
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
                        w='48%'
                        marginRight="46px"
                        value={unit.toString()}
                        onChangeText={handleUnitChange}
                     />
                </HStack>
            </VStack>
            <Button 
                marginTop="10px"
                onPress={onSave}
            >
                Save
            </Button>
            <Button 
                colorScheme="danger"
                onPress={onDelete}
            >
                Delete
            </Button>
        </Box>
    )
}