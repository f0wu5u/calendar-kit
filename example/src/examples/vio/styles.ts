import { StyleSheet } from "react-native";

export const textStyles = StyleSheet.create({
  defaultDayText: {
    textAlign: "center",
    fontWeight: "500",
    alignSelf: "center",
  },
  selected: {
    color: "#3C69F5",
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

export const containerStyles = StyleSheet.create({
  defaultContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    flexGrow: 0.85,
  },
  selected: {
    backgroundColor: "#E6E9FD",
  },
  startBorders: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  endBorders: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  start: {
    backgroundColor: "#3C69F5",
    paddingStart: 8,
  },
  end: {
    backgroundColor: "#3C69F5",
    paddingEnd: 8,
  },
  weekend: {
    backgroundColor: "#F8F6F5",
    borderRadius: 8,
  },
});
