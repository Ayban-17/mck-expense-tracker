import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";

import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#0B103A",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "30px",
};

export default function BasicModal({ open, handleClose, data, action }) {
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState(null);
  const [amount, setAmount] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    // await createIncome(date, category, amount);
    // await getIncome();

    // setAmount("");
    // setCategory("");
    // setDate("");
    // setOpen(true);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>{"Update " + data.category}</h1>
          <form
            className="  h-[300px] overflow-y-scroll"
            onSubmit={handleOnSubmit}
          >
            <input
              type="date"
              value={date || ""}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <input
              type="text"
              value={category || ""}
              placeholder="Enter Income Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <input
              type="number"
              value={amount || ""}
              placeholder="Enter Income Amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />

            <Button
              variant="outlined"
              fullWidth
              sx={{ padding: "0.7em", marginTop: ".5rem" }}
              type="submit"
            >
              {action}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

BasicModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
