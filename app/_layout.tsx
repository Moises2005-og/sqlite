import {Slot} from "expo-router"
import {SQLiteProvider} from "expo-sqlite"
import {initialiaseDatabase} from "../database/initialiseDatabase"

export default function Layout() {
    return(
        <SQLiteProvider databaseName="myDatabase.db" onInit={initialiaseDatabase}>
            <Slot/>
        </SQLiteProvider>
    )
}