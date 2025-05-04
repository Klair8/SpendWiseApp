import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Card, Icon, ListItem, Screen, Text, TextField } from "../components"
import { BaseToggleInputProps, Toggle } from "../components/Toggle/Toggle"
import { ToggleProps } from "../components/Toggle/Toggle"
import { TabScreenProps } from "../navigators/TabNavigator"
import { colors, spacing } from "../theme"
import { useNavigation } from "@react-navigation/native"
import { Divider } from "app/components/Divider"

function ControlledToggle(props: ToggleProps<boolean>) {
  const [value, setValue] = React.useState(props.value || false)
  return <Toggle {...props} value={value} onPress={() => setValue(!value)} />
}

export const TransactionsScreen: FC<TabScreenProps<"Transactions">> = function TransactionsScreen(_props) {
    
    
    const navigation = useNavigation<any>() ;
      
    const navigationBack =()=>{
        navigation.navigate("HomeStack", {screen:"HomeScreen"})
    }
    
    const MySwitch = ({ on, outerStyle, innerStyle }: BaseToggleInputProps<boolean>) => (
      <View style={[outerStyle, { justifyContent: "center" }]}>
        <View
          style={[
            innerStyle,
            {
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: on ? "green" : "red",
              marginLeft: on ? 30 : 0,
            },
          ]}
        />
      </View>
    )
    
    
    return (
        <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
          <Text preset="heading" tx="TransactionsScreen:title" style={$title} />
        <Text  onPress={navigationBack}>Go back</Text>
          <ControlledToggle
            ToggleInput={MySwitch}
          value={true}
             label="`income /expense switch "
            // switchAccessibilityMode="text"
               inputOuterStyle={{
                      width: 70,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: colors.palette.accent300,
                      borderColor: colors.palette.accent500,
                    }}
                    inputInnerStyle={{
                      backgroundColor: colors.palette.accent500,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
            />
       
   
           <Divider size={50}  />         
          <Text>Date</Text>
          <Divider size={20}  /> 
           <TextField
            placeholder="Categories" /> 
            <TextField
            placeholder="Note" /> 

        <Divider size={250}  /> 
        <Button>save</Button>
      
        </Screen>
      )
    }
  
  const $container: ViewStyle = {
    paddingTop: spacing.lg + spacing.xl,
    paddingHorizontal: spacing.lg,
  }
  
  const $title: TextStyle = {
    marginBottom: spacing.sm,
  }
