export const sidebarAnim = {
  collapse: {
    gridTemplateColumns: "60px 1fr",
    transition: {
      type: "spring",
      stiffness: 900,
      damping: 30,
    },
  },
  expand: {
    gridTemplateColumns: "200px 1fr",
    transition: {
      type: "spring",
      stiffness: 900,
      damping: 30,
    },
  },
};
