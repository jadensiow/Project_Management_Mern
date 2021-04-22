const dataSource = {
  chart: {
    dateformat: "yyyy/mm/dd",
    caption: "TIMELINE",
    theme: "Candy",
    outputdateformat: "ddds mns yy",
    ganttwidthpercent: "60",
    ganttPaneDuration: "40",
    plottooltext:
      "$processName{br} $label starting date $start{br}$label ending date $end",
    ganttPaneDurationUnit: "d",
    forceRowHeight: true,
    flatScrollBars: "1",
    captionAlignment: "center",
    showBorder: true,
    taskBarRoundRadius: "10",
  },
  tasks: {
    color: "#5D62B5",
    showenddate: true,
    showstartdate: true,
    task: [],
  },
  processes: {
    headertext: "Task",
    fontcolor: "#000000",
    fontsize: "15",
    isanimated: "1",
    bgcolor: "#6baa01",
    headervalign: "bottom",
    headeralign: "left",
    headerbgcolor: "#999999",
    headerfontcolor: "#ffffff",
    headerfontsize: "16",
    align: "left",
    isbold: "1",
    bgalpha: "25",
    process: [],
  },
  categories: [
    {
      category: [],
    },
    {
      category: [],
    },
  ],
};
export default dataSource;
