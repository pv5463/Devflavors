// Standard English font configuration for all platforms
export const Fonts = {
  regular: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'system-ui',
    }),
  },
  medium: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
      default: 'system-ui',
    }),
    fontWeight: '500' as const,
  },
  semibold: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
      default: 'system-ui',
    }),
    fontWeight: '600' as const,
  },
  bold: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
      default: 'system-ui',
    }),
    fontWeight: '700' as const,
  },
  heavy: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
      default: 'system-ui',
    }),
    fontWeight: '800' as const,
  },
  black: {
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto-Black',
      default: 'system-ui',
    }),
    fontWeight: '900' as const,
  },
};

import { Platform } from 'react-native';
