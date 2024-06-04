import { useState, useEffect } from "react";

import Loading from "./Loading";
import User from "./User";
import getUser from "../apis/getUser";

import "./UserContainer.css";

const UserContainer = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [id, setId] = useState(1);
  const [disabledBtn, setDisabledBtn] = useState({
    previous: true,
    next: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser(id);
        setUser(userData);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setDisabledBtn({
      previous: id === 1,
      next: id === 10,
    });
  }, [id]);

  const clickHandler = (change) => {
    if (change === "previous") {
      setId((prevId) => prevId - 1);
    } else {
      setId((prevId) => prevId + 1);
    }
  };

  return (
    <div className="container-all">
      {loading && <Loading />}
      {user && <User user={user} />}
      {error && <div>Error</div>}

      <div className="btn-container">
        <button
          onClick={() => clickHandler("previous")}
          className="previous-btn"
          disabled={disabledBtn.previous}
        >
          Previous
        </button>
        <button
          onClick={() => clickHandler("next")}
          className="next-btn"
          disabled={disabledBtn.next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserContainer;
