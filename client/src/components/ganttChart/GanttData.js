const dataSource = {
  chart: {
    dateformat: "mm/dd/yyyy",
    caption: "Event Planning Process",
    theme: "Candy",
    canvasborderalpha: "80",
    ganttlinealpha: "100",
  },
  tasks: {
    color: "#5D62B5",
    task: [
      {
        start: "03/07/2018",
        end: "03/17/2018",
      },
      {
        start: "03/14/2018",
        end: "03/28/2018",
      },
    ],
  },
  processes: {
    headertext: "Task",
    headeralign: "left",
    fontsize: "14",
    isbold: "0",
    align: "left",
    process: [
      {
        label: "Define event goals",
      },
      {
        label: "Source venue options",
      },
    ],
  },
  categories: [
    {
      category: [
        {
          start: "03/05/2018",
          end: "03/31/2018",
          label: "March",
        },
        {
          start: "04/01/2018",
          end: "04/30/2018",
          label: "April",
        },
      ],
    },
    {
      category: [
        {
          start: "03/05/2018",
          end: "03/11/2018",
        },
        {
          start: "03/12/2018",
          end: "03/18/2018",
        },
      ],
    },
  ],
};
export default dataSource;
