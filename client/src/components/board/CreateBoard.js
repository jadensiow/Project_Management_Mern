import { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { addBoard } from "../redux/action/board";
import { Modal as div, TextField, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../styles/modalStyles";
import { AnimatePresence, motion } from "framer-motion";
import { modalAnimation } from "../../animations/modalAnimations";

const CreateBoard = ({ history }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addBoard({ title }, history));
  };

  // the pop up
  const body = (
    <div className={`${classes.paper} ${classes.createBoardModal}`}>
      <div className={classes.modalTop}>
        <h1>Create new board</h1>
        <Button onClick={() => setOpen(false)}>
          <CloseIcon />
        </Button>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Add board title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Create Board
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <button
        className="board-card create-board-card"
        onClick={() => setOpen(true)}
      >
        Create new board
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={modalAnimation}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {body}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default withRouter(CreateBoard);
