import { StyleSheet } from "react-native";

export const containerStyles = StyleSheet.create({
  defaultContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 44,
  },
  selected: {
    backgroundColor: "#dae9fc",
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
  startEnd: {
    backgroundColor: "#0072f0",
    borderRadius: 44,
    width: 44,
    height: 44,
    alignContent: "center",
    justifyContent: "center",
  },
  today: {
    backgroundColor: "transparent",
    borderColor: "#1a1a1a",
    borderWidth: 1,
    alignSelf: "center",
  },
  overflow: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "#dae9fc",
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
    color: "#ffffff",
  },
  inactive: {
    color: "#cacaca",
  },
});
