import React, { useEffect, useState } from "react";
import "./NavigationBar.scss";
/* import Shop from "../../Resources/icons/shop.svg";
import AddProduct from "../../Resources/icons/computer.svg";
import Cart from "../../Resources/icons/cart.svg"; */
import Fade from "react-reveal";
import { LogoutUser, ToogleToolBare } from "../../Actions/UserActions";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
const NavigationBar = (props) => {
  const history = useHistory();
  const { user } = props;
  const [userToLogout, setUserToLogout] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      /*  if (userToLogout) {
        await props.dispatch(LogoutUser());
      } */
    };

    fetch();
  }, [userToLogout]);

  const Logout = async () => {
    /*   if (history.location.pathname === "/") {
      setUserToLogout(true);
      await props.dispatch(ToogleToolBare(false));
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      setUserToLogout(true);

      setTimeout(() => {
        history.push("/");
      }, 3000);
    } */
  };

  const GoTo = async () => {
    await props.dispatch(ToogleToolBare(false));

    // props.closeAndGoto(toLink);
  };
  return (
    <div className="sidebare-container">
      <div className="sidebare_list-container">
        <div className="data">
          {user ? (
            user.isAuth ? (
              <div className="header_data">
                <div className="user_image">
                  <div
                    style={{ backgroundImage: `url(${user.avatar})` }}
                    className="avatar"
                  />
                </div>
                <div className="auth-user">
                  <div
                    className="auth-user_name" /* onClick={() => GoToProfile()} */
                  >
                    {user.username}
                  </div>
                  <div className="devider" />
                  <div
                    className="auth-user_logout" /*  onClick={() => Logout()} */
                    onClick={() => Logout()}
                  >
                    Log Out
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: "3rem" }}>
                {" "}
                <Link to="/user/register">
                  <div
                    className="user sign-up"
                    onClick={() => GoTo("/user/register")}
                    style={{ marginBottom: "0.5rem" }}
                  >
                    Sign Up
                  </div>
                </Link>
                <Link to="/user/login">
                  <div
                    className="user log-in"
                    onClick={() => GoTo("/user/login")}
                  >
                    Log In
                  </div>
                </Link>
              </div>
            )
          ) : null}

          <Fade right>
            <>
              {user ? (
                user.isAuth ? (
                  <Link to="/user/cart">
                    <div className="item">
                      {/* <img src={Cart} alt="My Cart" className="icon" /> */}
                      <p className="text">My Cart</p>
                    </div>
                  </Link>
                ) : null
              ) : null}

              {user ? (
                user.isAdmin ? (
                  <Link to="/admin/addProduct">
                    <div className="item">
                      {/* <img src={AddProduct} alt="addnew" className="icon" /> */}
                      <p className="text">Add Product</p>
                    </div>
                  </Link>
                ) : null
              ) : null}

              <Link to="/products/shop">
                <div className="item">
                  {/*  <img src={Shop} alt="shop" className="icon" /> */}
                  <p className="text">Shop</p>
                </div>
              </Link>
            </>
          </Fade>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    logout: state.UserReducer.LogoutUser,
    openSideBare: state.ProductsReducer.openSideBare,
  };
};

export default connect(mapStateToProps)(NavigationBar);
