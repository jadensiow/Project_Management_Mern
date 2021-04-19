// export const routeTransition = {
//   hidden: {
//     scale: 0,
//   },

//   show: {
//     scale: 1,
//     transition: {
//       duration: 0.5,
//     },
//   },

//   exit: {
//     scale: 0,
//     transition: {
//       duration: 0.5,
//     },
//   },
// };

export const routeTransition = {
  hidden: {
    x: "-100vw",
  },

  show: {
    x: 0,
    transition: {
      duration: 1,
    },
  },

  exit: {
    x: "100vw",
    transition: {
      duration: 0.75,
    },
  },
};
