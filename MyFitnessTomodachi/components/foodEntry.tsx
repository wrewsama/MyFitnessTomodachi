import { Box, HStack, Text } from "native-base";
import { Food } from "../types/food";

type FoodEntryProp = {
    food: Food,
    qty: number
}

export default function FoodEntry({ food, qty }: FoodEntryProp) {
    return (
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
    )
}