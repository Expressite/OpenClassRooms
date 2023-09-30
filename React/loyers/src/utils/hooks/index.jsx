import axios from "axios";
import validator from "validator";

/**
 *
 * @returns identification token
 */
export function getToken() {
  return localStorage.getItem("token");
}

/**
 * Remove identification token
 */
export function removeToken() {
  localStorage.clear();
}

/**
 * Call read data API
 * @param {String} url API URL to read data
 * @param {Array} options API options, like authentication
 * @returns API status code
 */
export const fetchData = async (url, options) => {
  try {
    const response = await axios(url, options, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response.data;
  } catch (error) {
    const errorData = { ...error };
    throw errorData;
  }
};

/**
 * Call post data API
 * @param {String} API URL to read data
 * @param {Returned data} data
 * @param {String} authToken token authentication
 * @returns API status code
 */
export async function postData(url, data, authToken) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    const msg =
      typeof error.response.data.appMessage !== "undefined"
        ? error.response.data.appMessage
        : error.message;
    throw new Error(msg);
  }
}
/**
 * Convert a String date to Date object
 * @param {String} dt
 * @returns Date
 */
export function stringToDate(dt) {
  const parts = dt.split(getDateFormatSeparator());
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

/**
 * Call update data API
 * @param {String} url API url to call
 * @param {String} id object id to update
 * @param {String} data data to update
 * @param {String} authToken token authentication
 * @returns API status code
 */
export async function updateData(url, id, data, authToken) {
  try {
    const response = await axios.put(`${url}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    const msg =
      typeof error.response.data.appMessage !== "undefined"
        ? error.response.data.appMessage
        : error.message;
    throw new Error(msg);
  }
}

/**
 *
 * @param {String} url API url to call
 * @param {String} id object id to delete
 * @param {String} authToken token authentication
 * @returns API status code
 */
export async function deleteData(url, id, authToken) {
  try {
    const response = await axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Convert all numeric attributes of an object to String, then return modified object
 * @param {Object} obj Object ti update
 * @returns updated object
 */
export function convertNumericAttributesToString(obj) {
  const convertedObj = {};

  for (const key in obj) {
    if (typeof obj[key] === "number") {
      convertedObj[key] = obj[key].toString();
    } else {
      convertedObj[key] = obj[key];
    }
  }

  return convertedObj;
}

/**
 * Initialize all attributes object with an empty string
 * @param {Object} obj
 * @returns
 */
export function initializeObjectWithEmptyStrings(obj) {
  const initializedObj = {};

  for (const key in obj) {
    initializedObj[key] = "";
  }

  return initializedObj;
}

/**
 * Check an email address validity
 * @param {String} email Email address to check
 * @returns true if address is valid, false otherwise
 */
export function isValidEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  return emailRegex.test(email);
}

/**
 * Check a date validity
 * @param {Date} date date to check
 * @returns true if date is valid, false otherwise
 */
export function isValidDate(date) {
  return validator.isDate(date, { format: "DD/MM/YYYY" });
}
/**
 * Return a formatted date for given parameter (use with Datagrid)
 * @param {object} params
 * @returns
 */
export function formatDate(params) {
  const date = params.value ? new Date(params.value) : null;

  if (date) {
    return date.toLocaleDateString();
  } else {
    return "";
  }
}

/**
 *
 * @returns date format sepeartor according to browser locale
 */
export const getDateFormatSeparator = () => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const dateFormatter = new Intl.DateTimeFormat(undefined, options);
  const dateFormat = dateFormatter.formatToParts(new Date());

  //find date separator
  for (const part of dateFormat) {
    if (part.type === "separator" && part.value !== " ") {
      return part.value;
    }
  }

  // return default value if nothing was found
  return "/";
};

/**
 * return error messge from a given error
 * @param {Error} error
 */
export function getMessage(error) {
  let ret = "";
  console.log("response " + error.response);
  console.log("response " + (error.response !== null));
  if (error.response !== null) {
    if (error.response.data !== null) {
      if (error.response.data.error !== null) {
        if (error.response.data.error.message !== null) {
          ret = error.response.data.error.message;
        }
      }
    }
  } else if (error.message !== null) {
    ret = error.message;
  } else {
    ret = error;
  }
  return ret;
}
