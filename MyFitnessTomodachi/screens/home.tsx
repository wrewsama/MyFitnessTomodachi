import { Box, Button, HStack, VStack, Center, Heading, Text, Modal } from "native-base"
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { HomeStackParamList } from "../types/HomeStackParamList";
import { useState } from "react";
import { Food } from "../types/food";
import FoodEntry from "../components/foodEntry";
import { TouchableOpacity } from "react-native";

type FoodWithQuantity = Food & { quantity: number }
type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList,
                                                          'Home'>
export default function Home({ navigation }: { navigation: HomeScreenNavigationProp}) {
    const [foods, setFoods] = useState<FoodWithQuantity[]>([])
    const [selectedFoodId, setSelectedFoodId] = useState(0)
    const [showModal, setShowModal] = useState(false)

    let totalCal = 0
    let totalProtein = 0
    let totalCarbs = 0
    let totalFat = 0
    for (const food of foods) {
        totalCal += food.calories * food.quantity
        totalProtein += food.protein * food.quantity
        totalCarbs += food.carbohydrates * food.quantity
        totalFat += food.fat * food.quantity
    }

    const addFood = (food: Food, quantity: number) => {
        const foodEntry = foods.find(f => f.id === food.id)

        // if the food is already in the list (check by id)
        if (foodEntry) {
            // we increment the quantity 
            const newFoodEntry = Object.assign({}, foodEntry)
            newFoodEntry.quantity += quantity 
            const newFoods = [...foods.filter(f => f.id !== food.id), newFoodEntry]
            setFoods(newFoods) 

        } else {
            // else we insert the food and its quantity
            const newFoodEntry = { ...food, quantity }
            setFoods([...foods, newFoodEntry])
        }
    }

    const deleteSelectedFood = () => {
        setFoods(foods.filter(f => f.id !== selectedFoodId))
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
                        return (
                            <Box key={food.id}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("FoodDetails", params)}
                                    onLongPress={() => {
                                        setSelectedFoodId(food.id)
                                        setShowModal(true)
                                    }}
                                >
                                    <FoodEntry
                                        food={food}
                                        qty={food.quantity} 
                                    />
                                </TouchableOpacity>
                            </Box>
                        )
                    })
                }
            </VStack>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.Header>
                        Delete Food?  
                    </Modal.Header> 

                    <Modal.Footer>
                        <Button.Group>
                            <Button
                                variant='ghost'
                                colorScheme='blueGray'
                                onPress={() => setShowModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button onPress={() => {
                                deleteSelectedFood()
                                setShowModal(false)
                            }}>
                               Delete 
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Button colorScheme="primary" 
                    variant="outline"
                    onPress={() => navigation.navigate('FoodList', { addFood })}>
                Add Food
            </Button>
        </Box>
    )
}