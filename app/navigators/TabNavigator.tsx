import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, useNavigation } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { AddExpenseScreen, HomeScreen, TransactionsScreen, ProfilPageScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { createNativeStackNavigator } from "@react-navigation/native-stack"


export type TabParamList = {
  HomeStack: undefined 
  AddExpense: undefined
  ProfilPage: undefined
  DemoDebug: undefined
  DemoShowroom: undefined
  Transactions: undefined
}

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export type HomeStackParamList = {
  HomeScreen: undefined;
  Transactions: undefined;
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>();


function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="Transactions" component={TransactionsScreen} />
    </HomeStack.Navigator>
  );
}


const Tab = createBottomTabNavigator<TabParamList>()

export function TabNavigator() {
  const { bottom } = useSafeAreaInsets()
  const navigation = useNavigation<any>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
  
        <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel:"",
          tabBarIcon: ({ focused }) => (
            <Icon icon="bell" color={focused ? colors.palette.neutral100 : colors.palette.neutral500} size={30} />
          ),
        }}
      />

  
      <Tab.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{
          // tabBarLabel: translate("AddExpenseScreen:title"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="bell" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="ProfilPage"
        component={ProfilPageScreen}
        options={{
          // tabBarLabel: translate("AddExpenseScreen:title"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="bell" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />


        <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          // tabBarLabel: translate("AddExpenseScreen:title"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="bell" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />

    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}


