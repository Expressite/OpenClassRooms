import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getToken,
  postData,
  fetchData,
  updateData,
  deleteData,
  convertNumericAttributesToString,
  isValidDate,
  formatDate,
  stringToDate,
  getDateFormatSeparator,
} from "../../utils/hooks";
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
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function AppartementPrices() {
  let [token, setToken] = useState();
  let [dialogMode, setDialogMode] = useState("create");
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const textFieldsRefs = useRef({});
  const [data, setData] = useState([]);
  const [appartment, setAppartment] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    date: "",
    price: "",
  });
  const displayedLabels = {
    date: "A partir du",
    price: "Prix",
  };

  const [formErrors, setFormErrors] = useState({
    date: "",
    price: "",
  });

  const { id } = useParams();

  const fetchApiData = async () => {
    try {
      //read appartment info
      const dataAppart = await fetchData(API_URL_READ_APPT, requestOptions);
      setAppartment(dataAppart);
      const data = await fetchData(API_URL_READ, requestOptions);
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
      }
    }
  };

  useEffect(() => {
    fetchApiData(); // Appel initial pour récupérer les données
  }, []);

  const resetForm = () => {
    setFormValues({
      date: "",
      price: "",
    });
    setFormErrors({});
    setErrorMessage("");
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

    //accept numbers and date separator for dates
    if (key.substring(0, 4) === "date") {
      const forbiddenCharacter = getDateFormatSeparator();
      // Remplacer tous les caractères non numériques par une chaîne vide
      const pattern = new RegExp(`[^0-9${forbiddenCharacter}]+`, "g");
      updatedValue = updatedValue.replace(pattern, "");
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
          console.error(error); // Gérez les erreurs ici
        });
    });
    setOpenDelete(false);
  };

  const API_URL_READ = `${constants.API_URL}appartment_price/app/${id}`;
  const API_URL_READ_APPT = `${constants.API_URL}appartment/${id}`;
  const API_URL = `${constants.API_URL}appartment_price`;

  const handleSaveDialog = () => {
    if (validateForm()) {
      formValues.appartment = id;
      formValues.user_id = localStorage.getItem("userId");
      const formToSend = {
        ...formValues,
        appartment: id,
      };
      formToSend.date = stringToDate(formValues.date);
      if (dialogMode === "edit") {
        updateData(API_URL, formToSend._id, formToSend, getToken())
          .then((response) => {
            resetForm();
            setOpen(false);
            fetchApiData();
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage(error.message);
          });
      } else {
        postData(API_URL, formToSend, getToken())
          .then((response) => {
            resetForm();
            setOpen(false);
            fetchApiData();
          })
          .catch((error) => {
            console.log(error.message);
            setErrorMessage(error.message);
          });
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      date: "",
      price: "",
    };

    /**
     * All fields are mandatory
     */
    for (const [key, value] of Object.entries(formValues)) {
      if (typeof value !== "object") {
        if (value == null || validator.isEmpty(value)) {
          isValid = false;
          errors[key] = `Le champ ${displayedLabels[key]} est requis`;
        }
        if (key === "date") {
          if (!isValidDate(value)) {
            isValid = false;
            errors[
              key
            ] = `Le format de la date ${displayedLabels[key]} est incorrect`;
          }
        }
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const getRowClassName = (params) => {
    return "defaultFont";
  };
  const columns = [
    {
      field: "date",
      headerName: "A partir du",
      width: 300,
      valueFormatter: formatDate,
      editable: true,
      headerClassName: "defaultFont",
      /*
      valueFormatter: (params) => {
        const dateFromMongoose = params.value;
        const formattedDate = new Date(dateFromMongoose).toLocaleDateString();
        return formattedDate;
      },
      */
    },
    {
      field: "price",
      headerName: "Prix",
      width: 300,
      editable: true,
      align: "right",
      headerAlign: "right",
      headerClassName: "defaultFont",
      valueFormatter: (params) => {
        const amount = params.value;
        const formattedAmount = `${amount.toFixed(2)} €`;
        return formattedAmount;
      },
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
      <div>
        Prix pour l'appartement{" "}
        {appartment !== null ? appartment.name : "indéfini"}
      </div>
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
          selectionModel={selectionModel}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
        />
      )}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSaveDialog();
          }
        }}
      >
        <DialogTitle>
          {dialogMode === "edit"
            ? "Modifier le locataire"
            : "Nouveau locataire"}
        </DialogTitle>
        <DialogContent>
          <br></br>
          <Grid container spacing={2} direction="column">
            {Object.entries(formValues).map(([key, value]) => {
              if (key !== "id" && key[0] !== "_" && key !== "appartment") {
                //id and inner mongoose attributes must be hidden as appartment
                return (
                  <Grid item key={key}>
                    <TextField
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
          <DialogContentText>{errorMessage}</DialogContentText>
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
            ? "du prix sélectionné"
            : "des prix sélectionnés"}{" "}
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

export default AppartementPrices;
