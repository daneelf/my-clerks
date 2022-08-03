import { responsiveIndicators } from './constants';

export const getShouldFetchIndicator = () => {
  const windowSize = window.innerWidth;

  // mobile
  if (windowSize <= responsiveIndicators.tablet.breakpoint) {
    return responsiveIndicators.mobile;
  }

  // tablet
  if (windowSize >= responsiveIndicators.tablet.breakpoint) {
    return responsiveIndicators.tablet;
  }

  // desktop
  if (windowSize >= responsiveIndicators.desktop.breakpoint) {
    return responsiveIndicators.desktop;
  }

  return 'whatever';
};
