import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle, TextInput } from "react-native"
import { Button, Screen, Text, TextField } from "../components"
import { TabScreenProps } from "../navigators/TabNavigator"
import { colors, spacing } from "../theme"
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-date-picker'
import LinearGradient from "react-native-linear-gradient"
import axios from 'axios'
import { Divider } from "app/components/Divider"
import { TouchableOpacity } from "react-native-gesture-handler"
import Config from "app/config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Icon } from "react-native-paper"


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
        user: "67c57fff771bc20a4a2aaeba", 
        amount: Number(amount), 
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
          <Text preset="subheading" tx="AddExpense:title" style={$title} />
        <View style={$amountWrapperContainer}>
          <View style={$amountWrapper}>
            <Text style={$dollarSign}>$</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0"
              style={$amountText}
            />
          </View>
          </View>


          <Divider size={40} />

          <SelectList
            setSelected={setSelectedCategory}
            data={categories}
            placeholder="Select Category"
            boxStyles={$dropdown}
          />

          <Divider size={40} />

          {!expanded ? (
           <TouchableOpacity style={$dropdownRow} onPress={() => setExpanded(true)}>
            <Icon source="note-text-outline" size={20} color={colors.text} />
            <Text style={$dropdownText}>Notes</Text>
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

        <TouchableOpacity style={$dropdownRow} onPress={() => setOpen(true)}>
          <Icon source="calendar-month-outline" size={20} color={colors.text} />
          <Text style={$dropdownText}>{date.toDateString()}</Text>
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
      <View style={$buttonWrapper}>
        <TouchableOpacity onPress={handleSaveExpense} activeOpacity={0.8}>
          <LinearGradient
            colors={["#4F46E5", "#EC4899", "#F97316"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={$saveButton}
          >
            <Text style={$saveButtonText}>SAVE</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Screen>
      )
    }
  

/**  STYLING */

  const $container: ViewStyle = {
    paddingTop: spacing.lg + spacing.xl,
    paddingHorizontal: spacing.lg,
    backgroundColor: "#F9FAFB",
  }
  
  const $title: TextStyle = {
    marginBottom: spacing.sm,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
    color: colors.palette.neutral900,
  }

  const $amountWrapperContainer: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
  }
  
  const $amountWrapper: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    width: "80%",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: spacing.lg,
  }
  
  const $dollarSign: TextStyle = {
    fontSize: 20,
    color: "#6B7280", 
    marginRight: spacing.xs,
  }
  
  const $amountText: TextStyle = {
    fontSize: 28,
    textAlign: "left",
    fontWeight: "500",
    color: "#7C3AED", 
  }
  const $dropdownRow: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.palette.neutral300,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm, // if you're using RN 0.71+, otherwise use marginRight
  }
  
  const $dropdownText: TextStyle = {
    color: colors.text,
    fontSize: 16,
  }
  
  const $dropdown: ViewStyle = {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.palette.neutral300,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  }

  const $buttonWrapper: ViewStyle = {
    marginBottom: 30,
    width: "100%",
  }
  const $saveButton: ViewStyle = {
    borderRadius: 30,
    paddingVertical: 14,
    height: 80,
    alignItems: "center",
  }

  const $saveButtonText: TextStyle = {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  }


