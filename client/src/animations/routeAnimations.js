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

export const loginRouteTransition = {
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
export const dashboardRouteTransition = {
  hidden: {
    y: "-100vw",
  },

  show: {
    y: 0,
    transition: {
      delayChildren: 2,

      duration: 2,
    },
  },

  exit: {
    x: "-100vw",
    transition: {
      duration: 1.5,
    },
  },
};

export const boardRouteTransition = {
  hidden: {
    x: "-100vw",
  },

  show: {
    x: 0,
    transition: {
      duration: 2,
    },
  },

  exit: {
    x: "-100vw",
    transition: {
      duration: 2,
    },
  },
};
export const chatRouteTransition = {
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
      duration: 2,
    },
  },
};
export const chartRouteTransition = {
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
      duration: 2,
    },
  },
};
