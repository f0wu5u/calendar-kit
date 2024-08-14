import { StyleSheet } from "react-native";

export const containerStyles = StyleSheet.create({
  defaultContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 44,
  },
  selected: {
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  start: {
    borderTopLeftRadius: 44,
    borderBottomLeftRadius: 44,
    width: 44,
    height: 44,
    alignSelf: "center",
    overflow: "visible",
  },
  end: {
    borderTopRightRadius: 44,
    borderBottomRightRadius: 44,
    width: 44,
    height: 44,
    alignSelf: "center",
    overflow: "visible",
  },
  startOfWeek: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  endOfWeek: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  startEnd: {
    backgroundColor: "#1a1a1a",
    borderRadius: 44,
    width: 44,
    height: 44,
    alignContent: "center",
    justifyContent: "center",
  },
  overflow: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "#f0f0f0",
    width: 22,
    zIndex: -1,
  },
  overflowStart: {
    right: -11,
  },
  overflowEnd: {
    left: -8.5,
  },
});

export const textStyles = StyleSheet.create({
  defaultDayText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    alignSelf: "center",
  },
  selected: {
    color: "#1a1a1a",
  },
  active: {
    color: "#5a5a5a",
  },
  startEnd: {
    color: "#cacaca",
  },
  inactive: {
    color: "#cacaca",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});
