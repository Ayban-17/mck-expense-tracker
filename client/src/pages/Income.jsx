import { Alert, Box, Button, Modal, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useStatementStore } from "../store/store";
import { format } from "date-fns";

import useCreateIncome from "../hooks/useCreateIncome";
import useGetIncome from "../hooks/useGetIncome";
import useUpdateIncome from "../hooks/useUpdateIncome";

import PropTypes from "prop-types";
import useDeleteIncome from "../hooks/useDeleteIncome";

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

export const AddForm = () => {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const { createIncome, error, message, setError, setMessage } =
    useCreateIncome();
  const { getIncome } = useGetIncome();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(null);
    setMessage(null);
    setOpen(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await createIncome(date, category, amount);
    await getIncome();

    setAmount("");
    setCategory("");
    setDate("");
    setOpen(true);
  };

  return (
    <aside className="p-8 ">
      <h1>Add Income</h1>
      <form className="  h-[300px] overflow-y-scroll" onSubmit={handleOnSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <input
          type="text"
          value={category}
          placeholder="Enter Income Category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <input
          type="number"
          value={amount}
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
          Add
        </Button>
      </form>
      {error && (
        <div className="absolute w-72  -bottom-40 -left-[840px]">
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            sx={{ position: "absolute" }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </div>
      )}
      {message && (
        <div className="absolute w-72  -bottom-40 -left-[840px] z-50">
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            sx={{ position: "absolute" }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      )}
    </aside>
  );
};

export const IncomeTable = () => {
  const { getIncome, getOneIncome, getOneIncomeToDelete } = useGetIncome();
  const incomeToEdit = useStatementStore((s) => s.incomeToEdit);
  const incomeToDelete = useStatementStore((s) => s.incomeToDelete);
  const incomes = useStatementStore((s) => s.incomes);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpen = async (id) => {
    await getOneIncome(id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    setOpenDeleteModal(true);
    await getOneIncomeToDelete(id);
  };

  useEffect(() => {
    const fetchIncome = async () => {
      await getIncome();
    };
    fetchIncome();
  }, []);

  return (
    <main className="p-8 max-h-full">
      <div className="max-h-[320px] income-table-container overflow-y-scroll">
        <table className="w-full income-table mt-1 ">
          <thead className="sticky top-0 z-20">
            <tr className="text-lg flex">
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="max-h-[280px] overflow-y-scroll">
            {incomes.map(({ date, category, amount, _id }, index) => {
              const formatedDate = format(new Date(date), "MMMM dd, yyyy");
              return (
                <tr key={index} className="text-sm flex">
                  <td className="flex justify-center items-center w-full">
                    <p>{formatedDate}</p>
                  </td>
                  <td className="flex justify-center items-center w-full">
                    <p>{category}</p>
                  </td>
                  <td className="flex justify-center items-center w-full">
                    <p>{"₱ " + amount.toLocaleString()}</p>
                  </td>
                  <td className="w-full flex justify-around">
                    <Button variant="outlined" onClick={() => handleOpen(_id)}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {incomeToEdit && (
        <BasicModal
          open={open}
          setOpen={setOpen}
          data={incomeToEdit}
          action="Update"
        />
      )}
      {incomeToDelete && (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </main>
  );
};

export const BasicModal = ({ open, setOpen, data, action }) => {
  const [date, setDate] = useState(data.date);
  const [category, setCategory] = useState(data.category);
  const [amount, setAmount] = useState(data.amount);
  const { updateIncome } = useUpdateIncome();
  const { getIncome } = useGetIncome();
  const setIncomeToEdit = useStatementStore((s) => s.setIncomeToEdit);

  const handleClose = async () => {
    setIncomeToEdit(null);
    setOpen(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    handleClose(true);
    await updateIncome(date, category, amount, data._id);
    await getIncome();
  };

  BasicModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  };

  return (
    <div className="update-modal">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-3xl font-bold text-center modal-title text-white">
            {"Update Income"}
          </h1>
          <form
            className="  h-[300px] overflow-y-scroll update-form"
            onSubmit={handleOnSubmit}
          >
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <input
              type="text"
              value={category}
              placeholder="Enter Income Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <input
              type="number"
              value={amount}
              placeholder="Enter Income Amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />

            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ padding: "0.7em", marginTop: ".5rem" }}
              type="submit"
            >
              {action}
            </Button>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              sx={{ padding: "0.7em", marginTop: ".5rem" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export const DeleteModal = ({ openDeleteModal, setOpenDeleteModal }) => {
  const incomeToDelete = useStatementStore((s) => s.incomeToDelete);
  const setIncomeToDelete = useStatementStore((s) => s.setIncomeToDelete);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const { deleteIncome, message } = useDeleteIncome();
  const { getIncome } = useGetIncome();

  const handleClose = () => {
    setIncomeToDelete(null);
    setOpenDeleteModal(false);
    setOpenSnackBar(false);
  };

  const handleDelete = async () => {
    setOpenDeleteModal(false);
    setOpenSnackBar(true);
    await deleteIncome(incomeToDelete._id);
    await getIncome();
  };

  DeleteModal.propTypes = {
    openDeleteModal: PropTypes.bool.isRequired,
    setOpenDeleteModal: PropTypes.func.isRequired,
  };

  return (
    <div>
      <Modal
        open={openDeleteModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-white text-xl p-4">
            Are You Sure You Want to Delete {incomeToDelete.category}?
          </h1>
          <p className="text-gray-300 px-4">
            This will permanently remove ₱
            {incomeToDelete.amount.toLocaleString()}
          </p>
          <div className="flex w-full justify-center gap-4 pt-4">
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="outlined" color="success" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
      {message && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={4000}
          onClose={handleClose}
          sx={{ position: "absolute" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export const TotalIncome = () => {
  const { getIncome } = useGetIncome();
  const revenue = useStatementStore((s) => s.revenue);

  useEffect(() => {
    const calculateTotal = async () => {
      //calculations are inside useGetIncome hook
      await getIncome();
    };
    calculateTotal();
  }, []);

  return (
    <div className="total-income-container p-4 font-bold flex gap-4 items-center justify-center col-start-2">
      <h2 className=""> Revenue: </h2>
      <div className="text-green-600">{`₱${revenue}`}</div>
    </div>
  );
};

const Income = () => {
  return (
    <div className="text-white income gap-4 h-[270px]">
      <IncomeTable />
      <AddForm />
      <TotalIncome />
    </div>
  );
};

export default Income;
