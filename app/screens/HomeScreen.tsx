import React, { FC } from "react"
import { View, ViewStyle, Image, ScrollView } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { Card as PaperCard, Text, FAB, Avatar } from "react-native-paper"
import { spacing } from "app/theme"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamList } from "../navigators/TabNavigator"

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, "HomeScreen">

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const goToTransactions = () => navigation.navigate("Transactions")

  return (
    <View style={$root}>
      <ScrollView contentContainerStyle={$scrollContent}>

        {/* Header */}
        <View style={$header}>
          <Avatar.Image size={40} source={{ uri: "https://i.pravatar.cc/100" }} />
          <View>
            <Text variant="labelSmall">Welcome!</Text>
            <Text variant="titleMedium">John Doe</Text>
          </View>
        </View>

        {/* Total Balance Card */}
        <LinearGradient
            colors={["#4F46E5", "#EC4899", "#F97316"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={$gradientCard}
          >
            <Text variant="labelMedium" style={{ color: "white" }}>
              Total Balance
            </Text>
            <Text variant="displaySmall" style={{ color: "white", fontWeight: "bold" }}>
              $4800.00
            </Text>
            <View style={$balanceRow}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Avatar.Icon size={24} icon="arrow-down" style={{ backgroundColor: "#34D399" }} />
                <Text style={{ color: "#D1FAE5" }}>2,500.00</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Avatar.Icon size={24} icon="arrow-up" style={{ backgroundColor: "#F87171" }} />
                <Text style={{ color: "#FECACA" }}>800.00</Text>
              </View>
            </View>
          </LinearGradient>


        {/* Transactions Section */}
        <View style={$transactionsHeader}>
          <Text variant="titleMedium">Transactions</Text>
          <Text onPress={goToTransactions} style={{ color: "#7572FF" }}>
            View All
          </Text>
        </View>

        {/* Transactions List */}
        <PaperCard style={$transactionCard}>
          <PaperCard.Title
            title="Food"
            left={(props) => <Avatar.Icon {...props} icon="silverware-fork-knife" style={{ backgroundColor: "#FCD34D" }} />}
            right={() => (
              <View style={$amountRight}>
                <Text>-$45.00</Text>
                <Text variant="labelSmall">Today</Text>
              </View>
            )}
          />
        </PaperCard>

        <PaperCard style={$transactionCard}>
          <PaperCard.Title
            title="Shopping"
            left={(props) => <Avatar.Icon {...props} icon="shopping" style={{ backgroundColor: "#A78BFA" }} />}
            right={() => (
              <View style={$amountRight}>
                <Text>-$280.00</Text>
                <Text variant="labelSmall">Today</Text>
              </View>
            )}
          />
        </PaperCard>

      

      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={$fab}
        onPress={() => console.log("Add new")}
        customSize={56}
      />
    </View>
  )
}

// Styles
const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#F9FAFB",
}

const $scrollContent: ViewStyle = {
  padding: spacing.lg,
  paddingBottom: 100,
}

const $header: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: spacing.lg,
  marginBottom: spacing.lg,
  gap: spacing.md,
}

const $gradientCard: ViewStyle = {
  borderRadius: 20,
  padding: 20,
  marginBottom: spacing.lg,
  height: 200,

}

const $balanceRow: ViewStyle = {
flexDirection: "row",
gap: spacing.md,
marginTop: spacing.md,
}

const $transactionsHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.sm,
}

const $transactionCard: ViewStyle = {
  marginBottom: spacing.sm,
}

const $amountRight: ViewStyle = {
  alignItems: "flex-end",
  paddingRight: spacing.sm,
}

const $fab: ViewStyle = {
  position: "absolute",
  bottom: 16,
  alignSelf: "center",
  backgroundColor: "#7C3AED",
}
