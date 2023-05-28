import axios from "axios";
import { Food } from "../types/food";

const http = axios.create({
    baseURL: "http://192.168.50.138:8080",
    headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": ""
    }
})

export default class Api {
    static getAllFoods() {
        return http.get("/food")
    }
}