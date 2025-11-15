import { useColorScheme } from 'react-native';
import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';

export function useTheme() {
  const system = useColorScheme();
  return system === "dark" ? darkTheme : lightTheme;
}
