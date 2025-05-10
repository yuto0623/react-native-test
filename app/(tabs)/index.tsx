import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { Button, Input, Text, View, XStack, YStack } from "tamagui";

export default function TabOneScreen() {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const { height } = useWindowDimensions();

  const buttonHeight = Math.floor(height * 0.1);

  const handleChange = (text: string | number) => {
    if (typeof text === "number") {
      text = text.toString();
    }

    // エラー状態の場合、valueをリセットして新しいテキストから始める
    if (isError) {
      setValue(text);
      setIsError(false);
    } else {
      // エラーがない場合は通常通り値を追加
      setValue(value + text);
    }
  };

  const handleCalculate = () => {
    if (value === "") {
      return;
    }
    if (isError) {
      setValue("");
      setIsError(false);
      return;
    }
    try {
      // %記号を含む式を処理
      let expression = value;

      // %記号を含む場合、パーセント計算を行う
      if (expression.includes("%")) {
        // 数字+%のパターンを見つけて、数字/100に置換する正規表現
        expression = expression.replace(/(\d+(\.\d+)?)%/g, (match, number) => {
          return (parseFloat(number) / 100).toString();
        });
      }

      // 通常の計算処理
      const result = eval(expression.replace(/×/g, "*").replace(/÷/g, "/"));
      setValue(result.toString());
    } catch {
      setIsError(true);
      setValue("Error");
    }
  };

  const handleClear = () => {
    setValue("");
    setIsError(false);
  };

  const handleClearOne = () => {
    if (value.length > 0) {
      setValue(value.slice(0, -1));
    }
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
          <Button flex={1} height={buttonHeight} onPress={() => handleClear()}>
            <Text color="$color">AC</Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange("%")}
          >
            <Text color="$color">%</Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange("÷")}
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
                onPress={() => handleChange(i.toString())}
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
            onPress={() => handleClearOne()}
          >
            <Text color="$color">C</Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange(0)}
          >
            <Text color="$color">0</Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange(".")}
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
