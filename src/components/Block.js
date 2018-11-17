import React from "react";

function Block({ match }) {
    return (
      <div>
        <h3>Block: {match.params.id}</h3>
      </div>
    );
  }

  export default Block;
