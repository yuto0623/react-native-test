import { useState } from "react";
import { Button, Input, Text, View, XStack, YStack } from "tamagui";

export default function TabOneScreen() {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);

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
      paddingVertical="$20"
      justifyContent="center"
      alignItems="center"
      gap="$4"
    >
      <Input size="$4" minWidth={140} readOnly value={value} />
      <View>
        <XStack>
          <Button width={50} height={50} onPress={() => handleClear()}>
            <Text color="$color">AC</Text>
          </Button>
          <Button
            width={50}
            height={50}
            marginLeft={100}
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
          <XStack key={rowIndex}>
            {row.map((i) => (
              <Button
                key={i}
                width={50}
                height={50}
                onPress={() => handleChange(value + i)}
              >
                <Text color="$color">{i}</Text>
              </Button>
            ))}
          </XStack>
        ))}
        <XStack>
          <Button
            width={50}
            height={50}
            onPress={() => handleChange(value.slice(0, -1))}
          >
            <Text color="$color">C</Text>
          </Button>
          <Button
            width={50}
            height={50}
            onPress={() => handleChange(value + 0)}
          >
            <Text color="$color">0</Text>
          </Button>
          <Button
            width={50}
            height={50}
            onPress={() => handleChange(value + ".")}
          >
            <Text color="$color">.</Text>
          </Button>
          <Button width={50} height={50} onPress={() => handleCalculate()}>
            <Text color="$color">=</Text>
          </Button>
        </XStack>
      </View>
    </YStack>
  );
}
