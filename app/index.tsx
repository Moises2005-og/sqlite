import { Input } from "@/components/input";
import { ItemList } from "@/components/itemList";
import { Product, useProductDatabase } from "@/database/useProductDatabase";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Pressable } from "react-native";

export default function Home() {

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [search, setSearch] = useState("")
    const [quantity, setQuantity] = useState("")
    const [products, setProducts] = useState<Product[] | any>([])
    const databaseProduct = useProductDatabase()

    const handleCreate = async() => {
        try {
            const response = await databaseProduct.create({
                name,
                quantity: Number(quantity)
            })
            alert("Produto cadastrado com o ID: " + response?.insertedRowId)
            setName("")
            setQuantity("")
        } catch (error) {
            console.log(error)
        }
        
    }

    const list = async () => {
        try {
            const response = await databaseProduct.searchByName("")
            setProducts(response)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        list()
    }, [search])

    console.log(products[0])

    return(
        <>
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
            <FlatList data={products} contentContainerStyle={{gap: 10}} renderItem={({item}) => 
                <Pressable style={{
                    width: "80%",
                }}>
                    <Text  style={{
                    backgroundColor: "gray",
                    padding: 7,
                    marginTop: 10, 
                    textAlign: "center",
                    marginLeft: 80,
                    borderRadius: 8
                }}>{item.name}</Text>
                </Pressable>}
            />
        </>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})