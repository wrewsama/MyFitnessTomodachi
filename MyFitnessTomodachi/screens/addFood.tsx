import { Alert, Box, Button, HStack, Icon, Input, InputGroup, InputRightAddon, Text, VStack } from "native-base";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons'
import Api from "../api/api";

export default function AddFood() {
    // Use States
    const [completed, setCompleted] = useState(false)
    const [error, setError] = useState(false)
    const [name, setName] = useState('')
    const [calories, setCalories] = useState('')
    const [protein, setProtein] = useState('')
    const [carbs, setCarbs] = useState('')
    const [fat, setFat] = useState('')
    const [unit, setUnit] = useState('')

    // Input change handlers
    const handleNameChange = (text: string) => setName(text)
    const handleCalChange = (text: string) => setCalories(text)
    const handleProteinChange = (text: string) => setProtein(text)
    const handleCarbChange = (text: string) => setCarbs(text)
    const handleFatChange = (text: string) => setFat(text)
    const handleUnitChange = (text: string) => setUnit(text)

    // Button handler
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

        // Save to backend
        const newFood = {
            name,
            calories: newCal,
            protein: newProtein,
            carbohydrates: newCarbs,
            fat: newFat,
            unit
        }
        Api.addFood(newFood)
            .then(res => {
                setCompleted(true)
            })
            .catch(e => {
                console.error(e)
            })
    }

    return (
        <Box padding='10px'>
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

            {
                completed && (
                    <Alert colorScheme='success'>
                        Food Added!
                    </Alert>
                )
            }
            <VStack>
                <HStack justifyContent="space-between">
                    <Text fontSize="lg">
                        Name: 
                    </Text>
                    <InputGroup w="60%">
                        <Input
                            w="80%"
                            value={name}
                            onChangeText={handleNameChange}
                        />
                    </InputGroup>
                </HStack>
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
                onPress={onSave}
                variant="outline"
            >
                Save
            </Button>
        </Box>
    )
}