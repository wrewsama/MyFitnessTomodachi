import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { HomeStackParamList } from "../types/HomeStackParamList";
import { Box, Button, Text, Icon, Input, VStack, Modal, FormControl, HStack, InputGroup, InputRightAddon } from "native-base";
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react';
import { Food } from '../types/food';
import FoodEntry from '../components/foodEntry';
import { TouchableOpacity } from 'react-native';

type Props = NativeStackScreenProps<HomeStackParamList,
                                    'FoodList'>
export default function FoodList({ route, navigation }: Props) {
    const { addFood } = route.params as { addFood: Function}
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
        }, {
            id: 3,
            name: "dummy3",
            unit: "l",
            calories: 500,
            protein: 200,
            carbohydrates: 69,
            fat: 37
        }
    ])
    const [selectedFood, setSelectedFood] = useState<null | Food>(null)
    const [showModal, setShowModal] = useState(false)
    const [quantity, setQuantity] = useState('')

    const handleQuanityChange = (text: string) => setQuantity(text)

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

                        return (
                            <Box>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedFood(food)
                                        setShowModal(true)
                                    }}
                                    onLongPress={() => navigation.navigate("FoodDetails", params)}
                                    key={food.id}
                                >
                                    <FoodEntry
                                        food={food}
                                        qty={1} 
                                    />
                                </TouchableOpacity>
                            </Box>
                        )
                    })
                }
            </VStack>
            <Modal isOpen={showModal} onClose={()=>setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.Header>
                        {selectedFood ? selectedFood.name : ''} 
                    </Modal.Header>
                    <Modal.Body>
                        <HStack alignItems='center' justifyContent="space-between">
                            <Text>
                                Quantity: 
                            </Text>
                            <InputGroup w="60%">
                                <Input
                                    w="80%"
                                    value={quantity}
                                    onChangeText={handleQuanityChange}
                                    keyboardType="numeric"
                                />
                                <InputRightAddon
                                    children={selectedFood ? selectedFood.unit : ''}
                                />
                            </InputGroup>
                        </HStack>
                    </Modal.Body>
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
                                let qtyInt = parseInt(quantity)
                                if (isNaN(qtyInt)) {
                                    qtyInt = 0
                                }
                                addFood(selectedFood, qtyInt)
                                setShowModal(false)
                            }}>
                                Save
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Button onPress={() => navigation.navigate('AddFood')}> add food </Button>
        </Box>
    )
}