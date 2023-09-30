import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getToken,
  fetchData,
  updateData,
  getMessage,
  isValidDate,
  getDateFormatSeparator,
  formatDate,
  stringToDate,
} from "../../utils/hooks";
import ErrorMessage from "../../Components/ErrorMessage";
import Login from "../Login";
import validator from "validator";
/*
import { DataGrid, GridToolbarContainer, frFR } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
*/
import { DataGrid, GridToolbarContainer, frFR } from "@mui/x-data-grid";
import * as constants from "../../utils/constants";
import {
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { IconButton } from "@material-ui/core";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import MailIcon from "@material-ui/icons/Mail";

function Rents() {
  let [token, setToken] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const textFieldsRefs = useRef({});
  const [dialogErrorMessage, setDialogErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [canPay, setCanPay] = useState(true);
  const [selectionModel, setSelectionModel] = useState([]);
  const navigate = useNavigate();
  const [timeOutDuration, setTimeOutDuration] = useState(3000);
  const [formValues, setFormValues] = useState({
    datePaid: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const displayedLabels = {
    datePaid: "Payé le",
  };

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
    fetchApiData(); // read data
  }, []);

  /*
  Enable or disable "Paid" button depending of selection
  if selection contains at list one paid rent, then "paid" button is disabled
  */
  useEffect(() => {
    setCanPay(true);
    selectionModel.forEach((element) => {
      const itemToUpdate = data.find((item) => item._id === element);
      if (itemToUpdate.status === constants.RENT_STATUS_PAID) {
        setCanPay(false);
      }
    });
  }, [selectionModel, data]);

  const setPaid = () => {
    // Vérifier si au moins un élément sélectionné a déjà été payé
    const isAnyRentPaid = selectionModel.some((element) => {
      const itemToUpdate = data.find((item) => item._id === element);
      return itemToUpdate.status === constants.RENT_STATUS_PAID;
    });

    // Si un loyer a déjà été payé, ne rien faire
    if (isAnyRentPaid) {
      return;
    }

    // Sinon, ouvrir la boîte de dialogue pour déclarer le loyer payé
    setOpen(true);
    setFormValues((prevValues) => ({
      ...prevValues,
      datePaid: new Date().toLocaleDateString(),
    }));
  };

  const API_URL = `${constants.API_URL}rent`;

  const handleError = (error) => {
    setErrorMessage(getMessage(error));
    setTimeOutDuration(timeOutDuration + 1);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleConfirmDialog();
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
    setOpen(false);
    resetForm();
  };

  /**
   * Update selected elements and close confirmation dialog
   */
  const handleConfirmDialog = () => {
    if (validateForm()) {
      selectionModel.forEach((element) => {
        const selectedData = data.filter((el) => el._id === element);
        if (selectedData.length > 0) {
          const dataToUpdate = { ...selectedData[0] }; //create an object copy
          dataToUpdate.user_id = localStorage.getItem("userId");
          dataToUpdate.datePaid = stringToDate(formValues.datePaid);
          dataToUpdate.status = constants.RENT_STATUS_PAID;
          dataToUpdate.timeZone =
            Intl.DateTimeFormat().resolvedOptions().timeZone;
          updateData(API_URL, dataToUpdate._id, dataToUpdate, getToken())
            .then((response) => {
              fetchApiData();
            })
            .catch((error) => {
              handleError(error);
              console.error(error); // Gérez les erreurs ici
            });
        }
      });
      resetForm();
      setOpen(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      datePaid: "",
    };

    //All fields are mandatory
    for (const [key, value] of Object.entries(formValues)) {
      if (value == null || validator.isEmpty(value)) {
        isValid = false;
        errors[key] = `Le champ ${displayedLabels[key]} est requis`;
      }
      if (key.substring(0, 4) === "date" && value.length > 0) {
        if (!isValidDate(value)) {
          isValid = false;
          errors[
            key
          ] = `Le format de la date ${displayedLabels[key]} est incorrect`;
        } else {
          if (stringToDate(value) > new Date()) {
            isValid = false;
            errors[
              key
            ] = `La date <strong>${displayedLabels[key]}</strong> ne peut être située dans le futur`;
          }
        }
      }
    }
    console.log("errors avant set");
    console.log(errors);
    setFormErrors(errors);
    return isValid;
  };

  const resetForm = () => {
    console.log("appel de resetForm");
    setFormValues({
      datePaid: "",
    });
    setFormErrors({});
    setDialogErrorMessage("");
    textFieldsRefs.current = {};
  };

  const getRowClassName = (params) => {
    return "defaultFont";
  };
  const columns = [
    {
      field: "appartment.name",
      headerName: "Appartement",
      width: 300,
      valueGetter: (params) => params.row.contract.appartment.name,
      headerClassName: "defaultFont",
    },
    {
      field: "tenant.name",
      headerName: "Locataire",
      width: 300,
      valueGetter: (params) => params.row.contract.tenant.name,
      headerClassName: "defaultFont",
    },
    {
      field: "price",
      headerName: "Montant",
      width: 200,
      align: "right",
      headerAlign: "right",
      valueFormatter: (params) => `${params.value} €`,
      headerClassName: "defaultFont",
    },
    {
      field: "date",
      headerName: "Date",
      valueFormatter: formatDate,
      width: 200,
      headerClassName: "defaultFont",
    },
    {
      field: "status",
      headerName: "Statut",
      width: 150,
      valueFormatter: (params) => constants.rentStatusValues[params.value],
      headerClassName: "defaultFont",
    },
    {
      field: "datePaid",
      headerName: "Payé le",
      valueFormatter: formatDate,
      width: 150,
      headerClassName: "defaultFont",
    },
    {
      field: "receipt",
      headerName: "Quittance",
      headerClassName: "defaultFont",
      width: 200,
      renderCell: (params) => {
        // const sendEmail = () => {
        //   //build body message
        //   const dt = stringToDate(params.row.date);
        //   const options = { month: "long", year: "numeric" };
        //   const dateFormatter = new Intl.DateTimeFormat(
        //     navigator.language,
        //     options
        //   );

        //   const stair = params.row.contract.appartment.hasOwnProperty("stair")
        //     ? `${params.row.contract.appartment.stair}${
        //         params.row.contract.appartment.stair === 1 ? "er" : "ème"
        //       } étage`
        //     : "";
        //   const body = constants.mailBody
        //     .replace(/%month/g, () => dateFormatter.format(dt))
        //     .replace(/%appStreet/g, () => params.row.contract.appartment.street)
        //     .replace(/%appStair/g, () => stair)
        //     .replace(
        //       /%appZipCode/g,
        //       () => params.row.contract.appartment.zipCode
        //     )
        //     .replace(/%appCity/g, () => params.row.contract.appartment.city)
        //     .replace(/%link/g, () => params.row.receipt);

        //   const mailtoLink = `mailto:${params.row.contract.tenant.email}?subject=${constants.mailTitle}&body=${body}`;
        //   window.location.href = mailtoLink;
        // };

        const getPDF = () => {
          const receipt = params.row.receipt;
          const token = getToken();
          fetch(receipt, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (response.status === 200) {
                // Convertir la réponse en blob
                return response.blob();
              } else {
                // Gérer les erreurs ici
                console.error("Erreur lors de la récupération du fichier PDF.");
                return null;
              }
            })
            .then((blob) => {
              if (blob) {
                // Créer un objet URL à partir du blob
                const blobUrl = window.URL.createObjectURL(blob);

                // Créer un lien <a> pour le téléchargement
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = "receipt.pdf"; // Nom du fichier téléchargé
                a.style.display = "none";

                // Ajouter le lien <a> à la page
                document.body.appendChild(a);

                // Déclencher un clic sur le lien pour lancer le téléchargement
                a.click();

                // Supprimer le lien <a> de la page
                document.body.removeChild(a);

                // Révoquer l'URL de l'objet blob après le téléchargement
                window.URL.revokeObjectURL(blobUrl);
              }
            })
            .catch((error) => {
              // Gérer les erreurs réseau ici
              console.error("Erreur réseau :", error);
            });
        };

        if (params.row.status === constants.RENT_STATUS_PAID) {
          return (
            <>
              <IconButton
                aria-label="Quittance au format PDF"
                style={{ color: "yellow" }}
                onClick={getPDF}
              >
                <PictureAsPdfIcon />
              </IconButton>
              {/* <IconButton
                style={{ color: "yellow" }}
                aria-label="Envoi par courriel"
                onClick={sendEmail}
              >
                <MailIcon></MailIcon>
              </IconButton> */}
            </>
          );
        }
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
          <span
            onClick={setPaid}
            className="listButton"
            disabled={!canPay}
            style={{ opacity: canPay ? 1 : 0.5 }}
            title="Déclarer le loyer payé"
          >
            Payé
          </span>
        </div>
      </GridToolbarContainer>
    );
  };

  if (!getToken() || getToken() === null) {
    return <Login setToken={setToken} />;
  }
  return (
    <div style={{ width: "100%" }}>
      <ErrorMessage message={errorMessage} timeout={timeOutDuration} type="error"/>
      <h1>Loyers</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        error.response && error.response.status === 401 ? (
          <Login setToken={setToken} />
        ) : (
          <p className="error">{getMessage(error)}</p>
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
        <DialogTitle>Déclarer le loyer payé</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item key="dateElement">
              <TextField
                label={displayedLabels["datePaid"]}
                inputRef={(ref) => (textFieldsRefs.current["datePaid"] = ref)}
                value={formValues.datePaid}
                onKeyDown={handleKeyDown}
                onChange={handleTextFieldChange("datePaid")}
                error={!!formErrors["datePaid"]}
                helperText={formErrors["datePaid"]}
              />
            </Grid>
          </Grid>
          <DialogContentText>Cette action est irréversible.</DialogContentText>
          <DialogContentText>{dialogErrorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleConfirmDialog}>Confirmer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Rents;
