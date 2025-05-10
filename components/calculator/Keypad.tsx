import { memo } from "react";
import { default as FontAwesome6 } from "react-native-vector-icons/FontAwesome6";
import { default as MaterialCommunityIcons } from "react-native-vector-icons/MaterialCommunityIcons";
import { useWindowDimensions, View, XStack } from "tamagui";
import CalculatorButton from "./CalculatorButton";
import { useCalculator } from "@/hooks/useCalculator";

const Keypad = () => {
  const { height } = useWindowDimensions();

  const buttonHeight = Math.floor(height * 0.1);
  const buttonFontSize = Math.floor(height * 0.023); // 画面高さの2.3%

  const {
    handleChange,
    handleCalculate,
    handleClear,
    handleClearOne,
    handleToggleSign,
  } = useCalculator();
  return (
    <View width="100%">
      {/* 上部ボタン行 (AC, +/-, %, ÷) */}
      <XStack gap="$2" marginBottom="$2">
        <CalculatorButton
          label="AC"
          onPress={handleClear}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
        <CalculatorButton
          label=""
          icon={
            <MaterialCommunityIcons
              name="plus-minus-variant"
              size={buttonFontSize}
            />
          }
          onPress={handleToggleSign}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
        <CalculatorButton
          label="%"
          onPress={() => handleChange("%")}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
        <CalculatorButton
          label="÷"
          onPress={() => handleChange("÷")}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
      </XStack>

      {/* 数字キー (7-9, 4-6, 1-3) */}
      {[
        [7, 8, 9, "×"],
        [4, 5, 6, "-"],
        [1, 2, 3, "+"],
      ].map((row, rowIndex) => (
        <XStack key={rowIndex} gap="$2" marginBottom="$2">
          {row.map((item) => (
            <CalculatorButton
              key={item}
              label={item}
              onPress={() => handleChange(item.toString())}
              height={buttonHeight}
              fontSize={buttonFontSize}
            />
          ))}
        </XStack>
      ))}

      {/* 下部ボタン行 (0, ., ⌫, =) */}
      <XStack gap="$2">
        <CalculatorButton
          label="0"
          onPress={() => handleChange(0)}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
        <CalculatorButton
          label="."
          onPress={() => handleChange(".")}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
        <CalculatorButton
          label=""
          icon={<FontAwesome6 name="delete-left" size={buttonFontSize} />}
          onPress={handleClearOne}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
        <CalculatorButton
          label="="
          onPress={handleCalculate}
          height={buttonHeight}
          fontSize={buttonFontSize}
          isInverse={true}
        />
      </XStack>
    </View>
  );
};

export default memo(Keypad);
