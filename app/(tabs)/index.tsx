import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { Button, Input, Text, View, XStack, YStack } from "tamagui";

export default function TabOneScreen() {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const { height } = useWindowDimensions();

  const buttonHeight = Math.floor(height * 0.1);

  const handleChange = (text: string) => {
    setValue(text);
  };

  const handleCalculate = () => {
    try {
      const result = eval(value.replace(/×/g, "*").replace(/÷/g, "/"));
      setValue(result.toString());
    } catch (error) {
      setIsError(true);
      setValue("Error" + error);
    }
  };

  const handleClear = () => {
    setValue("");
    setIsError(false);
  };

  return (
    <YStack
      height={"100%"}
      paddingVertical={"$8"}
      paddingHorizontal="$4"
      justifyContent="flex-end"
      alignItems="center"
      gap="$4"
    >
      <Input
        size="$4"
        width={"100%"}
        height={buttonHeight * 1.8}
        readOnly
        value={value}
        fontSize={40}
      />
      <View width="100%">
        <XStack gap="$2" marginBottom="$2">
          <Button flex={1} height={buttonHeight} onPress={() => handleClear()}>
            <Text color="$color">AC</Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange(value + "÷")}
          >
            <Text color="$color">÷</Text>
          </Button>
        </XStack>
        {[
          [1, 2, 3, "×"],
          [4, 5, 6, "-"],
          [7, 8, 9, "+"],
        ].map((row, rowIndex) => (
          <XStack key={rowIndex} gap="$2" marginBottom="$2">
            {row.map((i) => (
              <Button
                key={i}
                flex={1}
                height={buttonHeight}
                onPress={() => handleChange(value + i)}
              >
                <Text color="$color">{i}</Text>
              </Button>
            ))}
          </XStack>
        ))}
        <XStack gap="$2">
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange(value.slice(0, -1))}
          >
            <Text color="$color">C</Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange(value + 0)}
          >
            <Text color="$color">0</Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange(value + ".")}
          >
            <Text color="$color">.</Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleCalculate()}
          >
            <Text color="$color">=</Text>
          </Button>
        </XStack>
      </View>
    </YStack>
  );
}
