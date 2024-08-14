import { StyleSheet } from "react-native";

export const containerStyles = StyleSheet.create({
  defaultContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    flex: 1,
  },
  selected: {
    backgroundColor: "#f5f5f5",
  },
  start: {
    backgroundColor: "#0072f0",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 0,
  },
  end: {
    backgroundColor: "#0072f0",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 0,
  },
});

export const textStyles = StyleSheet.create({
  defaultDayText: {
    textAlign: "center",
    fontWeight: "500",
    alignSelf: "center",
  },
  today: {
    color: "#0072f0",
  },
  active: {
    color: "#5a5a5a",
  },
  startEnd: {
    color: "#ffffff",
  },
  inactive: {
    color: "#cacaca",
  },
});
