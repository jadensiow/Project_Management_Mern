import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
	Grid,
	Button,
	ButtonGroup,
	ClickAwayListener,
	Grow,
	Paper,
	Popper,
	MenuItem,
	MenuList,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const options = [];

const SelectShowChart = ({ handleMenuItemClick, selectedIndex, setOpen }) => {
	// const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
	// const [selectedIndex, setSelectedIndex] = useState(1);
	const history = useHistory();
	const board = useSelector((state) => state.board.board);

	const handleClick = () => {
		console.info(`You clicked ${options[selectedIndex]}`);
	};

	// const handleMenuItemClick = (event, index) => {
	// 	setSelectedIndex(index);
	// 	history.push("/board/:id/gantt_chart/:id");
	// 	setOpen(false);
	// };

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	return (
		<Grid container direction="column" alignItems="center">
			<Grid item xs={12}>
				<ButtonGroup
					variant="contained"
					color="primary"
					ref={anchorRef}
					aria-label="split button"
				>
					<Button onClick={handleClick}>{options[selectedIndex]}</Button>
					<Button
						color="primary"
						size="small"
						aria-controls={open ? "split-button-menu" : undefined}
						aria-expanded={open ? "true" : undefined}
						aria-label="select merge strategy"
						aria-haspopup="menu"
						onClick={handleToggle}
					>
						<ArrowDropDownIcon />
					</Button>
				</ButtonGroup>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					role={undefined}
					transition
					disablePortal
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === "bottom" ? "center top" : "center bottom",
							}}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList id="split-button-menu">
										{options.map((option, index) => (
											<MenuItem
												key={option}
												selected={index === selectedIndex}
												onClick={(event) => handleMenuItemClick(event, index)}
											>
												{option}
											</MenuItem>
										))}
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</Grid>
		</Grid>
	);
};
export default SelectShowChart;
