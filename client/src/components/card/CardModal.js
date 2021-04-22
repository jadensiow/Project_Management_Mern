// Hooks and redux
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editCard } from "../redux/action/board";

// Libraries
import PropTypes from "prop-types";
import { GithubPicker } from "react-color";
import { Modal, TextField, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// Components
import useStyles from "../styles/modalStyles";
import DeleteCard from "./CardDelete";
import CardMembers from "./CardMembers";

const CardModal = ({ cardId, open, setOpen, card, list }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
  }, [card]);

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    dispatch(editCard(cardId, { title, description }));
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
                (description === "" && !card.description))
            }
            className={classes.button}
          >
            Save All Changes
          </Button>
        </form>
        <div className={classes.modalSection}>
          <CardMembers card={card} />
          <div>
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
