export const switchViewStyle = {
  borderColor: "primary.light",
};

export const switchViewItemStyle = {
  // We keep same selected style, hover or not
  "&.Mui-selected": {
    backgroundColor: "primary.lighter",
    color: "primary.main",
    "&:hover": {
      backgroundColor: "primary.lighter",
      color: "primary.main",
    },
  },
  // We declare style for button hovered and not selected
  "&:not(.Mui-selected):hover": {
    backgroundColor: "primary.lighter",
    color: "text.secondary",
  },
  backgroundColor: "common.white",
  color: "text.secondary",
};
