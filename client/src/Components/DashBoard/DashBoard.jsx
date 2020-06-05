import React, { useEffect } from "react";
import Layout from "../../HOC/Layout";
import Loading from "../../Utils/Loading/Loading";
import { connect } from "react-redux";
import { auth } from "../../Actions/UserActions";
import UserData from "../UserData/UserData";
const DashBoard = props => {
  useEffect(() => {
    const fetchData = async () => {
      props.dispatch(auth());
    };

    fetchData();
  }, []);

  return (
    <Layout>
      {props.UserData.isAuth ? (
        <div>
          {props.UserData.isAuth.isAuth ? (
            <UserData Data={props.UserData.isAuth} />
          ) : (
            <Loading />
          )}
        </div>
      ) : (
        <div style={{ height: "100vh" }}>
          <Loading />
        </div>
      )}
    </Layout>
  );
};
const mapStateToProps = state => {
  return { UserData: state.UserReducer };
};

export default connect(mapStateToProps)(DashBoard);
