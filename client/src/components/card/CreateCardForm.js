import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addCard } from "../redux/action/board";
import { Card, CardContent, TextField, Button } from "@material-ui/core";
import { setAlert } from "../redux/action/alert";

import CloseIcon from "@material-ui/icons/Close";
import CalendarPopUp from "../functions/CalendarPopUp";

const CreateCardForm = ({ listId, setAdding }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    formRef && formRef.current && formRef.current.scrollIntoView();
  }, [title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (startDate !== "") {
      dispatch(addCard({ title, listId, startDate, endDate }));
      setTitle("");
    } else
      dispatch(
        setAlert(
          "A date range must be selected before a card can be created",
          "error"
        )
      );
  };

  return (
    <form
      ref={formRef}
      className="create-card-form"
      onSubmit={(e) => onSubmit(e)}
    >
      <Card>
        <CardContent className="card-edit-content">
          <TextField
            margin="normal"
            fullWidth
            multiline
            label="Enter a title for this card"
            required
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSubmit(e)}
          />
        </CardContent>
      </Card>

      <div className="card-actions">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setShowCalendar(!showCalendar);
          }}
        >
          Date
        </Button>
        {showCalendar && (
          <CalendarPopUp
            setShowCalendar={setShowCalendar}
            startDateCard={(date) => setStartDate(date)}
            endDateCard={(date) => setEndDate(date)}
          />
        )}
      </div>
      <div className="card-actions">
        <Button type="submit" variant="contained" color="primary">
          Add Card
        </Button>
        <Button
          onClick={() => {
            setAdding(false);
            setTitle("");
          }}
        >
          <CloseIcon />
        </Button>
      </div>
    </form>
  );
};

CreateCardForm.propTypes = {
  listId: PropTypes.string.isRequired,
  setAdding: PropTypes.func.isRequired,
};

export default CreateCardForm;
