import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
const randomTimeout = Math.floor(Math.random() * 100 + 1) * 10;

export const DayPrice = ({ focused }: { focused: boolean }) => {
  const [price, setPrice] = useState<number>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const randomPrice = Math.floor(Math.random() * 200) + 1;
      setPrice(randomPrice);
    }, randomTimeout);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const isLoading = useMemo(() => price === undefined, [price]);
  const priceStyle = useMemo(() => {
    if (price === undefined) {
      return {};
    }
    if (price <= 100) {
      return styles.cheap;
    }
  }, [price]);
  return (
    !focused && (
      <View style={[styles.container, isLoading ? styles.loading : undefined]}>
        {!isLoading && <Text style={[styles.text, priceStyle]}>€{price}</Text>}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    alignItems: "center",
  },
  loading: {
    backgroundColor: "#d7d7d7",
    borderRadius: 2,
    height: 8,
    width: 20,
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    color: "#909090",
  },
  focused: {
    color: "#ffffff",
  },
  cheap: {
    color: "#179d27",
  },
});
