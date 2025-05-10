import { useToastController } from "@tamagui/toast";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";

export interface CalculatorState {
  value: string;
  isError: boolean;
}

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    value: "",
    isError: false,
  });
  const toast = useToastController();

  // 値の変更
  const handleChange = (text: string | number) => {
    if (typeof text === "number") {
      text = text.toString();
    }

    // エラー状態の場合、valueをリセットして新しいテキストから始める
    if (state.isError) {
      setState({ value: text, isError: false });
    } else {
      // 演算子（+、-、×、÷）が連続して入力された場合、最後の演算子を置き換える
      const operators = ["+", "-", "×", "÷", "%"];
      const lastChar = state.value.slice(-1);

      if (operators.includes(text.toString()) && operators.includes(lastChar)) {
        // 末尾が演算子で、新たに入力されたのも演算子の場合、置き換える
        setState({ ...state, value: state.value.slice(0, -1) + text });
      } else {
        // それ以外の場合は通常通り値を追加
        setState({ ...state, value: state.value + text });
      }
    }
  };

  // 計算処理
  const handleCalculate = () => {
    if (state.value === "") {
      return;
    }
    if (state.isError) {
      setState({ value: "", isError: false });
      return;
    }
    try {
      // %記号を含む式を処理
      let expression = state.value;

      // %記号を含む場合、パーセント計算を行う
      if (expression.includes("%")) {
        // 数字+%のパターンを見つけて、数字/100に置換する正規表現
        expression = expression.replace(/(\d+(\.\d+)?)%/g, (match, number) => {
          return (parseFloat(number) / 100).toString();
        });
      }

      // 通常の計算処理
      const result = eval(expression.replace(/×/g, "*").replace(/÷/g, "/"));
      setState({ value: result.toString(), isError: false });
    } catch {
      setState({ value: "Error", isError: true });
    }
  };

  // クリア処理
  const handleClear = () => {
    setState({ value: "", isError: false });
  };

  // 1文字削除
  const handleClearOne = () => {
    if (state.isError) {
      setState({ value: "", isError: false });
      return;
    }
    if (state.value.length > 0) {
      setState({ ...state, value: state.value.slice(0, -1) });
    }
  };

  // 符号反転
  const handleToggleSign = () => {
    if (state.value === "" || state.isError) return;

    try {
      // 式に演算子が含まれているかチェック
      const hasOperator = /[+\-×÷]/.test(state.value);

      if (!hasOperator) {
        // 単純な数値の場合、符号を反転
        const num = parseFloat(state.value);
        setState({ ...state, value: (-num).toString() });
      } else {
        // 最後の数値を抽出して符号を反転する
        const lastNumberRegex = /([-+]?[0-9]*\.?[0-9]+)$/;
        const match = state.value.match(lastNumberRegex);

        if (match && match[1]) {
          const lastNumber = parseFloat(match[1]);
          const toggledNumber = -lastNumber;
          // 最後の数値を反転した数値に置き換え
          setState({
            ...state,
            value: state.value.substring(0, match.index) + toggledNumber,
          });
        }
      }
    } catch {
      // エラーが発生した場合は何もしない
    }
  };

  // クリップボードにコピー
  const copyToClipboard = async () => {
    if (!state.value || state.isError) return;

    await Clipboard.setStringAsync(state.value);
    toast.show("コピーしました", {
      duration: 2000,
      viewportName: "default",
      message: "クリップボードにコピーしました",
      title: state.value,
    });
  };

  return {
    value: state.value,
    isError: state.isError,
    handleChange,
    handleCalculate,
    handleClear,
    handleClearOne,
    handleToggleSign,
    copyToClipboard,
  };
};
