import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as constants from "../../utils/constants";
import { updateUserName } from "../../store/userSlice";

function Transactions() {
  //get login and user information from Redux
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [userName, setUserName] = useState();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function updateUser() {
    const auth = `Bearer ${token}`;
    return fetch(`${constants.API_URL}user/profile`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify({ userName: userName }),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else {
          const error = (data && data.message) || data.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  useEffect(() => {
    if (token === null || token === "") {
      navigate("/");
    } else {
      setUserName(user.userName);
    }
  }, [token, navigate, user.userName]);

  const handleEditMode = () => {
    setEditMode(true);
  };

  const handleOKButton = async (e) => {
    const response = await updateUser();
    dispatch(updateUserName(userName));
    console.log(response);
    setEditMode(false);
  };

  const handleCancelButton = () => {
    setEditMode(false);
  };

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user.firstName} {user.lastName} alias {user.userName} !
          </h1>
          {!editMode && (
            <button className="edit-button" onClick={handleEditMode}>
              Edit user name
            </button>
          )}
          {editMode && (
            <div>
              <label htmlFor="userName">Username&nbsp;</label>
              <input
                type="text"
                id="userName"
                value={userName}
                className="input-userName"
                onChange={(e) => setUserName(e.target.value)}
              />
              &nbsp;
              <button className="edit-button" onClick={handleOKButton}>
                OK
              </button>
              &nbsp;
              <button className="edit-button" onClick={handleCancelButton}>
                Cancel
              </button>
            </div>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Transactions;
