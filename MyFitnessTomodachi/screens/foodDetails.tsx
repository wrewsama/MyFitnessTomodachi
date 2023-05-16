import { Box } from "native-base";
import { Food } from "../types/food";
import type { HomeStackParamList } from "../types/HomeStackParamList";
import type { RouteProp } from "@react-navigation/native";


type FoodDetailsRouteProp = RouteProp<HomeStackParamList, "FoodDetails">
type FoodDetailsProp = { route : FoodDetailsRouteProp}
export default function FoodDetails({ route }: FoodDetailsProp) {
    const { food } = route.params as any
    return (
        <Box>
            {food.name}
        </Box>
    )
}