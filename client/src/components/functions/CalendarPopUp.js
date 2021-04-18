import React from "react";
import { Button } from "@material-ui/core";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
const CalendarPopUp = (props) => {
  // https://www.npmjs.com/package/react-date-range
  const handleSelect = (ranges) => {
    console.log(ranges);
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  //
  return (
    <div>
      {" "}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{
          position: "absolute",
          left: "50%",
          top: "-15%",
        }}
        onClick={() => props.setShowCalendar(false)}
      >
        Close
      </Button>
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
    </div>
  );
};

export default CalendarPopUp;
