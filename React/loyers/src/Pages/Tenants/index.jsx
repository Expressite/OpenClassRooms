import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getToken,
  postData,
  fetchData,
  updateData,
  deleteData,
  convertNumericAttributesToString,
  isValidEmail,
  getMessage,
} from "../../utils/hooks";
import ErrorMessage from "../../Components/ErrorMessage";
import Login from "../Login";
import validator from "validator";
import { DataGrid, GridToolbarContainer, frFR } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import * as constants from "../../utils/constants";
import { useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function Tenants() {
  let [token, setToken] = useState();
  let [dialogMode, setDialogMode] = useState("create");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const textFieldsRefs = useRef({});
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);
  const navigate = useNavigate();
  const [timeOutDuration, setTimeOutDuration] = useState(3000);
  const [formValues, setFormValues] = useState({
    name: "",
    street: "",
    zipcode: "",
    city: "",
    mail: "",
  });
  const displayedLabels = {
    name: "Nom",
    street: "Rue",
    zipcode: "CP",
    city: "Ville",
    email: "Email",
  };

  const [formErrors, setFormErrors] = useState({
    name: "",
    street: "",
  });

  const fetchApiData = async () => {
    try {
      const data = await fetchData(API_URL, requestOptions);
      const newData = data.map((item) => ({
        ...item,
        id: item._id ? item._id : item.id,
        //id: item._id,
      }));
      setData(newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        setError(error);
        setLoading(false);
        handleError(error);
      }
    }
  };

  useEffect(() => {
    fetchApiData(); // Appel initial pour récupérer les données
  }, []);

  const resetForm = () => {
    setFormValues({
      name: "",
      street: "",
      zipcode: "",
      city: "",
      email: "",
    });
    setFormErrors({});
    textFieldsRefs.current = {};
  };

  /**
   * Open dialog for create
   */
  const openDialogCreate = () => {
    setDialogMode("create");
    setOpen(true);
  };

  /**
   * Open dialog for update
   */
  const openDialogUpdate = () => {
    if (selectionModel.length > 0) {
      const selectedItem = data.find((item) => item._id === selectionModel[0]);
      const convertedObj = convertNumericAttributesToString(selectedItem);
      setFormValues(convertedObj);
      setDialogMode("edit");
      setOpen(true);
    }
  };

  /**
   * Open dialog for delete confirmation
   */
  const openDialogDelete = () => {
    if (selectionModel.length > 0) {
      setOpenDelete(true);
    }
  };

  const handleTextFieldChange = (key) => (event) => {
    let updatedValue = event.target.value;

    // For zipcode
    if (key === "zipcode") {
      // replace all non-numeric characters by nothing
      updatedValue = updatedValue.replace(/\D/g, "");
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: updatedValue,
    }));
  };

  /**
   * Close create/edit dialog
   */
  const handleCloseDialog = () => {
    /*
    const values = Object.entries(textFieldsRefs.current).reduce(
      (acc, [key, ref]) => {
        acc[key] = ref.value;
        return acc;
      },
      {}
    );
    */
    setOpen(false);
    resetForm();
  };

  /**
   * Close confirmation delete dialog
   */
  const handleCloseDeleteDialog = () => {
    setOpenDelete(false);
  };

  /**
   * Delete selected elements and close confirmation dialog
   */
  const handleConfirmDeleteDialog = () => {
    selectionModel.forEach((element) => {
      deleteData(API_URL, element, getToken())
        .then((response) => {
          fetchApiData();
        })
        .catch((error) => {
          handleError(error);
        });
    });

    setOpenDelete(false);
  };

  const API_URL = `${constants.API_URL}tenant`;

  const handleSaveDialog = () => {
    if (validateForm()) {
      formValues.user_id = localStorage.getItem("userId");
      if (dialogMode === "edit") {
        updateData(API_URL, formValues._id, formValues, getToken())
          .then((response) => {
            fetchApiData();
          })
          .catch((error) => {
            handleError(error);
          });
      } else {
        postData(API_URL, formValues, getToken())
          .then((response) => {
            fetchApiData();
          })
          .catch((error) => {
            handleError(error);
          });
      }
      resetForm();
      setOpen(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: "",
      street: "",
      zipcode: "",
      city: "",
      email: "",
    };

    /**
     * All fields are mandatory
     */
    for (const [key, value] of Object.entries(formValues)) {
      if (value == null || validator.isEmpty(value)) {
        isValid = false;
        errors[key] = `Le champ ${displayedLabels[key]} est requis`;
      } else if (key === "email") {
        if (!isValidEmail(value)) {
          isValid = false;
          errors[key] = `${displayedLabels[key]} invalide`;
        }
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleError = (error) => {
    setErrorMessage(getMessage(error));
    setTimeOutDuration(timeOutDuration + 1);
  };

  const getRowClassName = (params) => {
    return "defaultFont";
  };
  const columns = [
    {
      field: "name",
      headerName: "Nom",
      width: 300,
      editable: true,
      headerClassName: "defaultFont",
    },
    {
      field: "street",
      headerName: "Rue",
      width: 500,
      editable: true,
      align: "left",
      headerAlign: "left",
      headerClassName: "defaultFont",
    },
    {
      field: "city",
      headerName: "Ville",
      width: 200,
      editable: true,
      headerClassName: "defaultFont",
    },
    {
      field: "zipcode",
      headerName: "CP",
      width: 100,
      type: Number,
      editable: true,
      headerClassName: "defaultFont",
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      type: String,
      editable: true,
      headerClassName: "defaultFont",
    },
  ];
  const auth = `Bearer ${getToken()}`;
  const requestOptions = {
    headers: {
      Authorization: auth,
    },
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer className="toolbarContainer">
        <div>
          <span onClick={openDialogCreate} className="listButton">
            Ajouter
          </span>
          <span onClick={openDialogUpdate} className="listButton">
            Modifier
          </span>
          <span onClick={openDialogDelete} className="listButton">
            Supprimer
          </span>
        </div>
      </GridToolbarContainer>
    );
  };

  if (!getToken() || getToken() === null) {
    return <Login setToken={setToken} />;
  }
  return (
    <div>
      <ErrorMessage message={errorMessage} timeout={timeOutDuration} />
      <div>Locataires</div>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        error.response && error.response.status === 401 ? (
          <Login setToken={setToken} />
        ) : (
          <p>Error: {error.message}</p>
        )
      ) : (
        <DataGrid
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          rows={data}
          columns={columns}
          getRowClassName={getRowClassName}
          editMode="cell"
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableSelectionOnClick
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
        />
      )}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogMode === "edit"
            ? "Modifier le locataire"
            : "Nouveau locataire"}
        </DialogTitle>
        <DialogContent>
          <br></br>
          <Grid container spacing={2} direction="column">
            {Object.entries(formValues).map(([key, value]) => {
              if (key !== "id" && key[0] !== "_") {
                //id and inner mongoose attributes must be hidden
                return (
                  <Grid item key={key}>
                    <TextField
                      //label={displayedLabels[key]}
                      label={displayedLabels[key]}
                      inputRef={(ref) => (textFieldsRefs.current[key] = ref)}
                      value={value}
                      onChange={handleTextFieldChange(key)}
                      error={!!formErrors[key]}
                      helperText={formErrors[key]}
                    />
                  </Grid>
                );
              }
              return null;
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSaveDialog}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Confirmez-vous la suppression{" "}
          {selectionModel.length === 1
            ? "du locataire sélectionné"
            : "des locataires sélectionnés"}{" "}
          ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Annuler</Button>
          <Button onClick={handleConfirmDeleteDialog}>Confirmer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Tenants;
