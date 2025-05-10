import Display from "@/components/calculator/Display";
import Keypad from "@/components/calculator/Keypad";
import { useCalculator } from "@/hooks/useCalculator";
import { useWindowDimensions } from "react-native";
import { YStack } from "tamagui";

export default function CalculatorScreen() {
  const { height } = useWindowDimensions();

  const buttonHeight = Math.floor(height * 0.1);
  const inputFontSize = Math.floor(height * 0.04); // 画面高さの4%

  const { copyToClipboard, value } = useCalculator();

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
      {/* ディスプレイ部分 */}
      <Display
        value={value}
        height={buttonHeight * 1.8}
        fontSize={inputFontSize}
        onPress={copyToClipboard}
      />

      {/* キーパッド部分 */}
      <Keypad />
    </YStack>
  );
}
