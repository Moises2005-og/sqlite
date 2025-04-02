import { Input } from "@/components/input";
import { useProductDatabase } from "@/database/useProductDatabase";
import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Home() {

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const databaseProduct = useProductDatabase()

    const handleCreate = async() => {
        try {
            const response = await databaseProduct.create({
                name,
                quantity: Number(quantity)
            })
            alert("Produto cadastrado com o ID: " + response?.insertedRowId)
        } catch (error) {
            console.log(error)
        }
        
    }

    const list = async () => {
        try {
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <View style={styles.container}>
            <View style={{
                flexDirection: "column",
                gap: 10,
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Input placeholder="Nome" onChangeText={setName} value={name}/>
                <Input placeholder="Quantidade" onChangeText={setQuantity} value={quantity}/>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={{
                backgroundColor: "#054f77",
                width: "80%",
                padding: 13,
                borderRadius: 7,
                marginTop: 10
            }} onPress={handleCreate}>
                <Text style={{
                    color: "#FFF",
                    textAlign: "center",
                }}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})