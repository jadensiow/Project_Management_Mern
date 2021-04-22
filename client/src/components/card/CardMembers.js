// Hooks and Redux
import { useSelector, useDispatch } from "react-redux";
import { addCardMember } from "../redux/action/board";

// Libraries
import PropTypes from "prop-types";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";

// Components
import useStyles from "../styles/modalStyles";

const CardMembers = ({ card }) => {
  const classes = useStyles();
  const boardMembers = useSelector((state) => state.board.board.members);
  const members = card.members.map((member) => member.user);
  const dispatch = useDispatch();

  return (
    <div>
      <h3 className={classes.membersTitle}>Members</h3>
      <FormControl component="fieldset">
        <FormGroup>
          {boardMembers.map((member) => (
            <FormControlLabel
              key={member.user}
              control={
                <Checkbox
                  checked={members.indexOf(member.user) !== -1}
                  onChange={async (e) =>
                    dispatch(
                      addCardMember({
                        add: e.target.checked,
                        cardId: card._id,
                        userId: e.target.name,
                      })
                    )
                  }
                  name={member.user}
                />
              }
              label={member.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

CardMembers.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardMembers;
