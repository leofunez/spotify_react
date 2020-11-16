const size = {
    xxs: 375,
    xs : 480,
    sm : 768,
    md : 992,
    lg : 1200,
    xl : 1600
};

export const breakpoint = {
    xxs: `@media (min-width: ${size.xxs}px)`,
    xs : `@media (min-width: ${size.xs}px)`,
    sm : `@media (min-width: ${size.sm}px)`,
    md : `@media (min-width: ${size.md}px)`,
    lg : `@media (min-width: ${size.lg}px)`,
    xl : `@media (min-width: ${size.xl}px)`
  };
  

export default breakpoint;