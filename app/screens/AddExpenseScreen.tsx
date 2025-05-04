import React, { FC, useState } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../components"
import { TabScreenProps } from "../navigators/TabNavigator"
import { colors, spacing } from "../theme"
import { SelectList } from 'react-native-dropdown-select-list'
import categories from '../data/categories.json'
import DatePicker from 'react-native-date-picker'
import { isRTL } from "../i18n"
import axios from 'axios'
import { Divider } from "app/components/Divider"
import { TouchableOpacity } from "react-native-gesture-handler"
import Config from "app/config"


export const AddExpenseScreen: FC<TabScreenProps<"AddExpense">> = function AddExpenseScreen(_props) {

  const [selectedCategory, setSelectedCategory] = useState("")
  const [note, setNote] = useState<string>("");
  const [expanded, setExpanded] = useState(false)
  const [date,setDate] =useState(new Date());
  const [open,setOpen] = useState(false);
  const [amount,setAmount] = useState<string>("0");
    
  const categories = [
    {key:'1', value:'Food'},
    {key:'2', value:'Appliances'},
    {key:'3', value:'Transportation'},
    {key:'4', value:'Computers'},
    {key:'5', value:'Entertainment'},
    {key:'6', value:'Home'},
    {key:'7', value:'Drinks'},
    {key:'8', value:'Clothes'},
    {key:'9', value:'Health'},
    {key:'10', value:'Beauty'},
    {key:'11', value:'Education'},
    {key:'12', value:'Gifts'},
    {key:'13', value:'Other'},
  ]

  // Save Expense to API
  const handleSaveExpense = async () => {

    // const storedUser = await AsyncStorage.getItem("user");
    // if (!storedUser) {
    //   alert("User not found. Please log in.");
    //   return;
    // }
    // const userData = JSON.parse(storedUser);
    // const userId = userData.id; // Ensure this matches your backend schema
    // if ( !amount || !selectedCategory) {
    //   alert("Amount and Categories are required")
    //   return;
    // }

  console.log("Sending request to API:", `${Config.API_URL}/expenses/add`);
  console.log("Request body:", {
    user: "67c57fff771bc20a4a2aaeba",
    // user: userId,
    amount: Number(amount),
    category: selectedCategory,
    note,
    date,
  });

    try {
      const response = await axios.post(`${Config.API_URL}/expenses/add`, {
        user: "67c57fff771bc20a4a2aaeba", // Replace with real user ID
        amount: Number(amount), // Convert amount to number
        category: selectedCategory,
        note,
        date,
      })
      console.log("API Response addexpenses file:", response.data);
      console.log("Expense saved:", response.data)
      alert("Expense added successfully!")

        // Reset fields after saving
        setAmount("");
        setSelectedCategory("");
        setNote("");
        setDate(new Date());

    } catch (error) {
      console.error("❌ Error adding expense:", error.response?.data || error.message);
      alert("Failed to add expense. Please try again.");
    }
  }

    return (
        <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
          <Text preset="formLabel" tx="AddExpense.title" style={$title} />
   
          <TextField
            placeholder="$" 
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            containerStyle={$inputContainer}
            style={$inputText}
            />

          <Divider size={40} />

          <SelectList
            setSelected={setSelectedCategory}
            data={categories}
            placeholder="Select Category"
            boxStyles={$dropdown}
          />

          <Divider size={40} />

          {!expanded ? (
            <TouchableOpacity style={$dropdown} onPress={() => setExpanded(true)}>
              <Text style={{ color: colors.text }}>Notes</Text>
            </TouchableOpacity>
          ) : (
            <TextField
              placeholder="Notes"
              containerStyle={$dropdown}
              multiline
              numberOfLines={5}
              value={note}
              onChangeText={setNote}
              onBlur={() => setExpanded(false)}
            />
          )}

        <Divider size={40} />

        <TouchableOpacity style={$dropdown} onPress={() => setOpen(true)}>
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>

        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          theme="dark"
          onConfirm={(selectedDate) => {
            setOpen(false)
            setDate(selectedDate)
          }}
          onCancel={() => setOpen(false)}
        />

      <Divider size={80} />

      <Button onPress={handleSaveExpense} text="Save" />
       
    </Screen>
      )
    }
  

      /** 🔹 STYLING */

  const $container: ViewStyle = {
    paddingTop: spacing.lg + spacing.xl,
    paddingHorizontal: spacing.lg,
  }
  
  const $title: TextStyle = {
    marginBottom: spacing.sm,
  }

const $inputContainer: ViewStyle = {
  borderRadius: 20,
  borderWidth: 1,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
}

const $inputText: TextStyle = {
  textAlign: "center",
  fontSize: 18,
}

const $dropdown: ViewStyle = {
  borderRadius: 20,
  borderWidth: 1,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
}

