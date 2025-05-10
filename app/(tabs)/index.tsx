import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { default as FontAwesome6 } from "react-native-vector-icons/FontAwesome6";
import { default as MaterialCommunityIcons } from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Input, Text, View, XStack, YStack } from "tamagui";

export default function TabOneScreen() {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const { height } = useWindowDimensions();

  const buttonHeight = Math.floor(height * 0.1);
  const inputFontSize = Math.floor(height * 0.04); // 画面高さの4%
  const buttonFontSize = Math.floor(height * 0.023); // 画面高さの2.3%

  const handleChange = (text: string | number) => {
    if (typeof text === "number") {
      text = text.toString();
    }

    // エラー状態の場合、valueをリセットして新しいテキストから始める
    if (isError) {
      setValue(text);
      setIsError(false);
    } else {
      // 演算子（+、-、×、÷）が連続して入力された場合、最後の演算子を置き換える
      const operators = ["+", "-", "×", "÷", "%"];
      const lastChar = value.slice(-1);

      if (operators.includes(text.toString()) && operators.includes(lastChar)) {
        // 末尾が演算子で、新たに入力されたのも演算子の場合、置き換える
        setValue(value.slice(0, -1) + text);
      } else {
        // それ以外の場合は通常通り値を追加
        setValue(value + text);
      }
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
    if (isError) {
      setValue("");
      setIsError(false);
      return;
    }
    if (value.length > 0) {
      setValue(value.slice(0, -1));
    }
  };

  const handleToggleSign = () => {
    if (value === "" || isError) return;

    try {
      // 式に演算子が含まれているかチェック
      const hasOperator = /[+\-×÷]/.test(value);

      if (!hasOperator) {
        // 単純な数値の場合、符号を反転
        const num = parseFloat(value);
        setValue((-num).toString());
      } else {
        // 最後の数値を抽出して符号を反転する
        const lastNumberRegex = /([-+]?[0-9]*\.?[0-9]+)$/;
        const match = value.match(lastNumberRegex);

        if (match && match[1]) {
          const lastNumber = parseFloat(match[1]);
          const toggledNumber = -lastNumber;
          // 最後の数値を反転した数値に置き換え
          setValue(value.substring(0, match.index) + toggledNumber);
        }
      }
    } catch {
      // エラーが発生した場合は何もしない
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
      backgroundColor="$background"
    >
      <Input
        size="$4"
        width={"100%"}
        height={buttonHeight * 1.8}
        readOnly
        value={value}
        fontSize={inputFontSize}
      />
      <View width="100%">
        <XStack gap="$2" marginBottom="$2">
          <Button flex={1} height={buttonHeight} onPress={() => handleClear()}>
            <Text color="$color" fontSize={buttonFontSize}>
              AC
            </Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleToggleSign()}
          >
            <Text color="$color" fontSize={buttonFontSize}>
              <MaterialCommunityIcons
                name="plus-minus-variant"
                size={buttonFontSize}
              />
            </Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange("%")}
          >
            <Text color="$color" fontSize={buttonFontSize}>
              %
            </Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange("÷")}
          >
            <Text color="$color" fontSize={buttonFontSize}>
              ÷
            </Text>
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
                <Text color="$color" fontSize={buttonFontSize}>
                  {i}
                </Text>
              </Button>
            ))}
          </XStack>
        ))}
        <XStack gap="$2">
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange(0)}
          >
            <Text color="$color" fontSize={buttonFontSize}>
              0
            </Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange(".")}
          >
            <Text color="$color" fontSize={buttonFontSize}>
              .
            </Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleClearOne()}
          >
            <Text color="$color">
              <FontAwesome6 name="delete-left" size={buttonFontSize} />
            </Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleCalculate()}
            themeInverse
          >
            <Text color="$color" fontSize={buttonFontSize}>
              =
            </Text>
          </Button>
        </XStack>
      </View>
    </YStack>
  );
}
