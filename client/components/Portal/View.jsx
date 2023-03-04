import React from "react";
import ReactDOM from "react-dom";

function View({children}) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted ?
    ReactDOM.createPortal(
      children,
      document.getElementById("portal")
    ) : null;
    
}

export default View