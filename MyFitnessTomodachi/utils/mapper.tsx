import { Food } from "../types/food"
import { FoodResponse } from "../types/foodResponse";
export default class Mapper {
    static foodResponsetoFood(foodRes: FoodResponse): Food {
        return {
            id: foodRes.ID,
            name: foodRes.Name,
            unit: foodRes.Unit,
            calories: foodRes.Calories,
            protein: foodRes.Protein,
            carbohydrates: foodRes.Carbohydrates,
            fat: foodRes.Fat
        }
    }
    
    static foodResponseListToFoodList(foodResList: FoodResponse[]): Food[] {
        const res: Food[] = []
        for (const foodRes of foodResList) {
            res.push(this.foodResponsetoFood(foodRes)) 
        }
        return res
    }
}