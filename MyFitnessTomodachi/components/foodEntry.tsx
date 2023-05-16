import { Box, HStack, Text } from "native-base";
import { Food } from "../types/food";
import { TouchableOpacity } from "react-native";

type FoodEntryProp = {
    food: Food,
    qty: number
    redirect: Function
}

export default function FoodEntry({ food, qty, redirect }: FoodEntryProp) {
    return (
        <TouchableOpacity onPress={() => redirect()}>
            <HStack display="flex" justifyContent="space-between" paddingBottom="10px">
                <Box paddingLeft="10px">
                    <Text bold>
                        {food.name}
                    </Text>
                    <Text>
                        {qty} {food.unit}
                    </Text>
                </Box>
                <Box paddingRight="10px">
                    <Text>
                        {qty * food.calories}
                    </Text>
                </Box>
            </HStack>
        </TouchableOpacity>
    )
}