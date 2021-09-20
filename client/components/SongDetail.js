import React, { Component } from "react";
import { Link } from "react-router";
import fetchSong from "../queries/fetchSong";
import { graphql } from "react-apollo";

import LyricCreate from "./LyricCreate";

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if (!song) {
      return null;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricCreate />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);