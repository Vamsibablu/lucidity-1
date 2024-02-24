import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export default function StatsTableFunc({
  statsData,
  isUser,
  handleDelete,
  handleChangeRow,
  handleDisable,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [editElement, setIsEditElement] = useState({});
  const handleEdit = (row) => {
    setIsOpen(true);
    setIsEditElement(row);
  };
  const [editedElement, setEditedElement] = useState({
    category: "",
    price: "",
    quantity: "",
    value: "",
  });
  const handleSave = (editedElement, name) => {
    handleChangeRow(editedElement, name);
    setEditedElement({
      category: "",
      price: "",
      quantity: "",
      value: "",
    });
    setIsOpen(false);
  };
  const setElements = (e, type) => {
    setEditedElement({ ...editedElement, [type]: e.target.value });
  };
  return (
    <div style={{ margin: "5px auto", width: "98%" }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Value</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statsData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.category}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">{row.quantity}</TableCell>
                <TableCell align="left">{row.value}</TableCell>
                <TableCell align="left">
                  <IconButton
                    aria-label="edit"
                    disabled={isUser || row.isDisabled}
                  >
                    <EditIcon
                      onClick={() => {
                        handleEdit(row);
                      }}
                    />
                  </IconButton>
                  <IconButton
                    aria-label="vision"
                    disabled={isUser}
                    onClick={() => {
                      handleDisable(row);
                    }}
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    disabled={isUser || row.isDisabled}
                    onClick={() => {
                      handleDelete(row);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        maxWidth={"md"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <>Edit Product - {editElement.name}</>
            <IconButton
              aria-label="delete"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              id="outlined-error"
              label="category"
              defaultValue="Hello World"
              value={editedElement.category}
              style={{ margin: "10px" }}
              onChange={(e) => {
                setElements(e, "category");
              }}
            />
            <TextField
              id="outlined-error"
              label="price"
              defaultValue="Hello World"
              value={editedElement.price}
              style={{ margin: "10px" }}
              onChange={(e) => {
                setElements(e, "price");
              }}
            />
            <TextField
              id="outlined-error"
              label="quantiry"
              defaultValue="Hello World"
              value={editedElement.quantity}
              style={{ margin: "10px" }}
              onChange={(e) => {
                setElements(e, "quantity");
              }}
            />
            <TextField
              id="outlined-error"
              label="value"
              defaultValue="Hello World"
              value={editedElement.value}
              style={{ margin: "10px" }}
              onChange={(e) => {
                setElements(e, "value");
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsOpen(false);
              setEditedElement({
                category: "",
                price: "",
                quantity: "",
                value: "",
              });
              setIsEditElement({});
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSave(editedElement, editElement.name);
            }}
            autoFocus
            disabled={
              !(
                editedElement.category &&
                editedElement.price &&
                editedElement.quantity &&
                editedElement.value
              )
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
