import React from "react";
import View from "./View";

function OptionsModalCard({ href, icon, message, onClick }) {
  return <View href={href} icon={icon} message={message} onClick={onClick} />;
}

export default OptionsModalCard;
