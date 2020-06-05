import React from "react";

import { connect } from "react-redux";
import { deletSearchComponent } from "../../Actions/MoviesActions";
import Card from "../../Utils/Card/Card";
import CancelIcon from "../../Resources/icons/cancel.svg";

import "./MoviesSearchList.scss";

const MoviesSearchList = (props) => {
  console.log(props);

  const removeListSearch = () => {
    props.dispatch(deletSearchComponent());
  };
  return (
    <div className="search-container">
      <div className="search-remove">
        <img onClick={() => removeListSearch()} src={CancelIcon} />
      </div>
      <div
        className="search_list"
        style={
          props.listmovies
            ? props.listmovies.length === 0
              ? {
                  alignItems: "center",
                  justifyContent: "center",
                  gridTemplateColumns: "1fr",
                }
              : null
            : null
        }
      >
        {props.listmovies ? (
          props.listmovies.length !== 0 ? (
            props.listmovies.map((card, i) => (
              <Card key={i} movieDetail={card} />
            ))
          ) : (
            <div className="empty_list">
              Sorry! There is no movie with these Data,try somthing else
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.MoviesReducer.ListSearch,
  };
};

export default connect(mapStateToProps)(MoviesSearchList);
