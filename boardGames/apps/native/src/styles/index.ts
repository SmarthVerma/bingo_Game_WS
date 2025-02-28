import { colors, fontSize } from "../constants/tokens";
import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  text: {
    fontSize: fontSize.base,
    color: colors.primary,
  },
});

export const utilsStyles = StyleSheet.create({});
