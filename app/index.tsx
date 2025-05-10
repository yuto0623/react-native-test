import Display from "@/components/calculator/Display";
import Keypad from "@/components/calculator/Keypad";
import { YStack } from "tamagui";

export default function CalculatorScreen() {
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
      <Display />

      {/* キーパッド部分 */}
      <Keypad />
    </YStack>
  );
}
