import React from "react";
import View from "./View";

function ClientCard({ clientData, options, onClick }) {
  return (
    <View
      clientData={clientData}
      options={options}
      onClick={onClick}
    />
  );
}

export default ClientCard;
