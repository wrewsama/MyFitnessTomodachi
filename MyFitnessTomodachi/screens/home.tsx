import { Box, Button, HStack, VStack, Center, Heading, Text } from "native-base"
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { HomeStackParamList } from "../types/HomeStackParamList";

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList,
                                                          'Home'>
export default function Home({ navigation }: { navigation: HomeScreenNavigationProp}) {
    return (
        <Box>
            <HStack justifyContent="center" padding={"30px"}>
                <Center width={"50%"}>
                    <Text fontSize="xl"> Calories </Text>
                    <Heading fontSize='4xl'> 6969 </Heading>
                </Center>
                <VStack width={"50%"}>
                    <Text fontSize="lg"> Protein: 69g </Text>
                    <Text fontSize="lg"> Carbohydrates: 69g </Text>
                    <Text fontSize="lg"> Fat: 69g </Text>
                </VStack>
            </HStack>
            <Button onPress={() => navigation.navigate('FoodList')}/>
        </Box>
    )
}