import React from "react";
import View from "./View";
import useModal from "~/hooks/useModal";

function PersonCard({ personData, isLoading, options, children, onClick }) {
  const { isOpen, showModal } = useModal();

  return (
    <View
      personData={personData}
      isLoading={isLoading}
      options={options}
      modalState={isOpen}
      changeModalState={showModal}
      onClick={onClick}
    >
      {children}
    </View>
  );
}

export default PersonCard;
