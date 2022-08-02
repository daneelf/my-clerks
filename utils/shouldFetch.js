import { responsiveIndicators } from './constants';

export const getShouldFetchIndicator = () => {
  const windowSize = window.innerWidth;

  // mobile
  if (windowSize <= responsiveIndicators.tablet.breakpoint) {
    return responsiveIndicators.mobile.indicator;
  }

  // tablet
  if (windowSize >= responsiveIndicators.tablet.breakpoint) {
    return responsiveIndicators.tablet.indicator;
  }

  // desktop
  if (windowSize >= responsiveIndicators.desktop.breakpoint) {
    return responsiveIndicators.desktop.indicator;
  }

  return 'whatever';
};
