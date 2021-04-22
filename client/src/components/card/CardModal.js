// Hooks and redux
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editCard } from "../redux/action/board";

// Libraries
import PropTypes from "prop-types";
import { GithubPicker } from "react-color";
import { Modal, TextField, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
// Components
import useStyles from "../styles/modalStyles";
import DeleteCard from "./CardDelete";
import CardMembers from "./CardMembers";
import CalendarPopUp from "../functions/CalendarPopUp";

const CardModal = ({ cardId, open, setOpen, card, list }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);

  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const checkCard = useSelector((state) =>
    state.board.board.cardObjects.find((object) => object._id === cardId)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
  }, [card]);

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      editCard(cardId, { title, description, date: { startDate, endDate } })
    );
  };
  const dateFormat = (e) => {
    let newDate = e.split("-");
    let updatedDate = `${newDate[2].slice(0, 2)}-${newDate[1]}-${newDate[0]}`;
    return updatedDate;
  };
  const dateFormatter = (date) => {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    return "" + (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={`${classes.paper} ${classes.cardModal}`}>
        <form onSubmit={(e) => onTitleDescriptionSubmit(e)}>
          <div className={classes.modalTop}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              label="Card title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && onTitleDescriptionSubmit(e)
              }
              className={classes.cardTitle}
            />
            <Button onClick={() => setOpen(false)}>
              <CloseIcon />
            </Button>
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            label="Card description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              title === card.title &&
              (description === card.description ||
                (description === "" && !card.description)) &&
              startDate === ""
            }
            className={classes.button}
          >
            Save All Changes
          </Button>
        </form>
        <div className={classes.modalSection}>
          <CardMembers card={card} />
          <div>
            <p>
              Start:{" "}
              {startDate === ""
                ? dateFormat(checkCard.date.startDate)
                : dateFormatter(startDate)}
            </p>
            <p>
              End:{" "}
              {endDate === ""
                ? dateFormat(checkCard.date.endDate)
                : dateFormatter(endDate)}
            </p>
            <br></br>
            <div className="card-actions">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowCalendar(!showCalendar);
                }}
              >
                Edit Date
              </Button>
              {showCalendar && (
                <CalendarPopUp
                  setShowCalendar={setShowCalendar}
                  startDateCard={(date) => setStartDate(moment(date).toDate())}
                  endDateCard={(date) => setEndDate(moment(date).toDate())}
                />
              )}
            </div>
            <br></br>
            <h3 className={classes.labelTitle}>Label</h3>
            <GithubPicker
              className={classes.colorPicker}
              onChange={async (color) =>
                dispatch(editCard(cardId, { label: color.hex }))
              }
            />
            <Button
              className={classes.noLabel}
              variant="outlined"
              onClick={async () =>
                dispatch(editCard(cardId, { label: "none" }))
              }
            >
              No Label
            </Button>
          </div>
        </div>
        <div className={classes.modalSection}>
          <div className={classes.modalBottomRight}>
            <DeleteCard cardId={cardId} setOpen={setOpen} list={list} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

CardModal.propTypes = {
  cardId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
};

export default CardModal;
