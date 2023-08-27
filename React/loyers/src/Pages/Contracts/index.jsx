import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getToken,
  postData,
  fetchData,
  updateData,
  deleteData,
  isValidDate,
  getDateFormatSeparator,
  formatDate,
  stringToDate,
} from "../../utils/hooks";
import Login from "../Login";
import validator from "validator";
import { DataGrid, GridToolbarContainer, frFR } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import * as constants from "../../utils/constants";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function Contracts() {
  let [token, setToken] = useState();
  let [dialogMode, setDialogMode] = useState("create");
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const textFieldsRefs = useRef({});
  const textFieldsEndRefs = useRef({});
  const [data, setData] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [allAppartments, SetAllAppartments] = useState([]);
  const [appartment, setAppartment] = useState(""); //selected appartment on create/update
  const [appartmentId, setAppartmentId] = useState(""); //selected appartment id on create/update
  const [allTenants, setAllTenants] = useState([]);
  const [tenant, setTenant] = useState(""); //selected tenant on create/update
  const [tenantId, setTenantId] = useState(""); //selected tenant id on create/update
  const [selectionModel, setSelectionModel] = useState([]);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    appartment: "",
    tenant: "",
    dateFrom: "",
    dateTo: "",
  });

  const [formEndValues, setFormEndValues] = useState({
    dateTo: "",
  });

  const displayedLabels = {
    appartment: "Appartement",
    tenant: "Locataire",
    dateFrom: "Du",
    dateTo: "Au",
  };

  const [formErrors, setFormErrors] = useState({
    appartment: "",
    tenant: "",
    dateFrom: "",
    dateTo: "",
  });

  const [formEndErrors, setFormEndErrors] = useState({
    dateTo: "",
  });

  //const { id } = useParams();

  const fetchApiData = async () => {
    try {
      //fetch contracts
      const data = await fetchData(API_URL_CONTRACTS, requestOptions);
      const newData = data.map((item) => ({
        ...item,
        id: item._id,
      }));
      setData(newData);
      //fetch tenants
      try {
        const dataTenants = await fetchData(API_URL_TENANTS, requestOptions);
        const newData = dataTenants.map((item) => ({
          ...item,
          id: item._id,
        }));
        setAllTenants(newData);
        //fetch unavailable appartments
        try {
          //fetch all appartments
          const dataAppartments = await fetchData(
            API_URL_ALL_APPARTMENTS,
            requestOptions
          );
          const newData = dataAppartments.map((item) => ({
            ...item,
            id: item._id,
          }));
          SetAllAppartments(newData);
        } catch (error) {
          throw error;
        }
      } catch (error) {
        throw error;
      }
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

  const handleTextFieldEndChange = (key) => (event) => {
    let updatedValue = event.target.value;
    //accept numbers and date separator for dates
    if (key.substring(0, 4) === "date") {
      const forbiddenCharacter = getDateFormatSeparator();
      // Remplacer tous les caractères non numériques par une chaîne vide
      const pattern = new RegExp(`[^0-9${forbiddenCharacter}]+`, "g");
      updatedValue = updatedValue.replace(pattern, "");
    }

    setEndDate(updatedValue);
    setFormEndValues((prevValues) => ({
      ...prevValues,
      [key]: updatedValue,
    }));
  };

  useEffect(() => {
    fetchApiData(); // Appel initial pour récupérer les données
  }, []);

  const resetForm = () => {
    setFormValues({
      appartment: "",
      tenant: "",
      dateFrom: "",
      dateTo: "",
    });
    setAppartment("");
    setTenant("");
    setFormErrors({});
    setErrorMessage("");
    textFieldsRefs.current = {};
  };

  const resetEndForm = () => {
    setFormEndValues({
      dateTo: "",
    });
    setEndDate("");
    setFormEndErrors({});
    setErrorMessage("");
    textFieldsEndRefs.current = {};
  };

  /**
   * Open dialog for create
   */
  const openDialogCreate = () => {
    if (allAppartments.length > 0) {
      setDialogMode("create");
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

  /**
   * Open dialog for contract end
   */
  const openDialogEnd = () => {
    if (selectionModel.length > 0) {
      setOpenEnd(true);
    }
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
   * Close create/edit dialog
   */
  const handleCloseEndDialog = () => {
    setOpenEnd(false);
    resetEndForm();
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
      deleteData(API_URL_CONTRACTS, element, getToken())
        .then((response) => {
          fetchApiData();
        })
        .catch((error) => {
          console.error(error); // Gérez les erreurs ici
        });
    });
    setOpenDelete(false);
  };

  /**
   * Update selected elements and close confirmation dialog
   */
  const handleConfirmEndDialog = () => {
    if (validateEndForm()) {
      selectionModel.forEach((element) => {
        //get contract
        const selectedData = data.filter((el) => el._id === element);
        if (selectedData.length > 0) {
          const dataToUpdate = selectedData[0];
          dataToUpdate.dateTo = stringToDate(formEndValues.dateTo);
          updateData(
            API_URL_CONTRACTS,
            dataToUpdate._id,
            dataToUpdate,
            getToken()
          )
            .then((response) => {
              fetchApiData();
            })
            .catch((error) => {
              console.error(error); // Gérez les erreurs ici
            });
        }
      });
      resetEndForm();
      setOpenEnd(false);
    }
  };

  /**
   * Function called when user select a tenant on create/update
   * @param {event} event
   */
  const handleSelectTenant = (event) => {
    setTenant(event.target.value);
    const k = event.target.value;
    setTenantId(allTenants[k]);
  };

  /**
   * Function called when user select an appartment on create/update
   * @param {event} event
   */
  const handleSelectAppartment = (event) => {
    setAppartment(event.target.value);
    const k = event.target.value;
    setAppartmentId(allAppartments[k]);
  };

  const API_URL_CONTRACTS = `${constants.API_URL}contract`;
  const API_URL_TENANTS = `${constants.API_URL}tenant`;
  const API_URL_ALL_APPARTMENTS = `${constants.API_URL}appartment/available`;

  const handleSaveDialog = () => {
    const formToSend = {
      ...formValues,
      appartment: appartmentId,
      tenant: tenantId,
    };
    formValues.appartment = appartmentId;
    formValues.tenant = tenantId;
    if (validateForm()) {
      formToSend.dateFrom = stringToDate(formValues.dateFrom);
      formToSend.dateTo = stringToDate(formValues.dateTo);
      if (dialogMode === "edit") {
        updateData(API_URL_CONTRACTS, formToSend._id, formToSend, getToken())
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
        postData(API_URL_CONTRACTS, formToSend, getToken())
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
     * All fields are mandatory, excepted dateTo
     */
    for (const [key, value] of Object.entries(formValues)) {
      if (typeof value !== "object") {
        console.log("check " + key + " (" + value + ")");
        if (key !== "dateTo") {
          if (value == null || validator.isEmpty(value)) {
            console.log("valeur requise");
            isValid = false;
            errors[key] = `Le champ ${displayedLabels[key]} est requis`;
          }
        }

        if (key.substring(0, 4) === "date" && value.length > 0) {
          if (!isValidDate(value)) {
            console.log("date invalide");
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

  const validateEndForm = () => {
    let isValid = true;
    const errors = {
      dateTo: "",
    };

    /**
     * All fields are mandatory, excepted dateTo
     */
    for (const [key, value] of Object.entries(formEndValues)) {
      if (typeof value !== "object") {
        if (key !== "dateTo") {
          if (value == null || validator.isEmpty(value)) {
            isValid = false;
            errors[key] = `Le champ ${displayedLabels[key]} est requis`;
          }
        }

        if (key.substring(0, 4) === "date" && value.length > 0) {
          if (!isValidDate(value)) {
            isValid = false;
            errors[
              key
            ] = `Le format de la date ${displayedLabels[key]} est incorrect`;
          }
        }
      }
    }

    setFormEndErrors(errors);
    return isValid;
  };

  const getRowClassName = (params) => {
    return "defaultFont";
  };
  const columns = [
    {
      field: "appartment",
      headerName: "Appartement",
      //flex: 1,
      width: 300,
      valueGetter: (params) => params.row.appartment.name,
    },
    {
      field: "tenant",
      headerName: "Locataire",
      width: 300,
      //flex: 1,
      valueGetter: (params) => params.row.tenant.name,
    },
    {
      field: "dateFrom",
      headerName: "Du",
      width: 150,
      valueFormatter: formatDate,
      editable: true,
      headerClassName: "defaultFont",
    },
    {
      field: "dateTo",
      headerName: "Au",
      width: 150,
      valueFormatter: formatDate,
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
          <span
            onClick={openDialogCreate}
            className="listButton"
            disabled={allAppartments.length === 0}
            style={{ opacity: allAppartments.length > 0 ? 1 : 0.5 }}
          >
            Ajouter
          </span>
          <span onClick={openDialogDelete} className="listButton">
            Supprimer
          </span>
          <span onClick={openDialogEnd} className="listButton">
            Mettre fin
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
      <div>Contrats</div>
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
          {dialogMode === "edit" ? "Modifier le contrat" : "Nouveau contrat"}
        </DialogTitle>
        <DialogContent>
          <br></br>
          <Grid container spacing={2} direction="column">
            {Object.entries(formValues).map(([key, value]) => {
              if (key !== "id" && key[0] !== "_") {
                //appartment
                if (key === "appartment") {
                  return (
                    <Grid item key={key}>
                      <InputLabel id="select-label-appartment">
                        Appartement
                      </InputLabel>
                      <Select
                        labelId="select-label-appartment"
                        id="select-appartment"
                        value={appartment}
                        label="Appartement"
                        onChange={handleSelectAppartment}
                        style={{ width: "100%" }}
                      >
                        {allAppartments.map((app, index) => (
                          <MenuItem key={app.id} value={index}>
                            {app.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  );
                }
                //tenant
                if (key === "tenant") {
                  return (
                    <Grid item key={key}>
                      <InputLabel id="select-label-tenant">
                        Locataire
                      </InputLabel>
                      <Select
                        labelId="select-label-tenant"
                        id="select-tenant"
                        value={tenant}
                        label="Locataire"
                        onChange={handleSelectTenant}
                        style={{ width: "100%" }}
                      >
                        {allTenants.map((tenant, index) => (
                          <MenuItem key={tenant.id} value={index}>
                            {tenant.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  );
                }
                //id and inner mongoose attributes must be hidden as appartment and tenant
                else
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
          {selectionModel.length === 1 ? "du contrat" : "des contrats"} ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Annuler</Button>
          <Button onClick={handleConfirmDeleteDialog}>Confirmer</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEnd} onClose={handleCloseEndDialog}>
        <DialogTitle>Terminer le contrat</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item key="dateElement">
              <TextField
                label="Date de fin"
                inputRef={(ref) => (textFieldsRefs.current["dateTo"] = ref)}
                value={endDate}
                onChange={handleTextFieldEndChange("dateTo")}
                error={!!formEndErrors["dateTo"]}
                helperText={formEndErrors["dateTo"]}
              />
            </Grid>
          </Grid>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEndDialog}>Annuler</Button>
          <Button onClick={handleConfirmEndDialog}>Confirmer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Contracts;
