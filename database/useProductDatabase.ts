import { useSQLiteContext } from "expo-sqlite"

export type Product = {
    id: number,
    name: string,
    quantity: number
}

export function useProductDatabase() {
    
    const database = useSQLiteContext()
    const create = async(data: Omit<Product, "id">) => {
        const statement = await  database.prepareAsync("INSERT INTO products (name, quantity) VALUES ($name, $quantity)")

        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $quantity: data.quantity
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return {insertedRowId}
        } catch (error) {
            console.log(error)
        } finally {
            await statement.finalizeAsync()
        } 
    }

    const searchByName = async (name: string) => {
        try {
            const query = "SELECT * FROM products WHERE name LIKE?"
            const response = await database.getAllAsync<Product>(query, `%${name}%`)

            return response
        } catch(err) {
            console.log(err)
        }
    }

    return {create, searchByName}
}