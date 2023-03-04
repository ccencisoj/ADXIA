import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

function View({initialSelected, items}) {
  const [thumbStyle, setThumbStyle] = React.useState({
    with: "0px",
    left: "4px",
    transition: "none"
  });
  
  const [selectedItem, setSelectedItem] = React.useState(initialSelected);

  return (
    <div className={styles.tabs}>
      {items.map((item)=> {
        const itemRef = React.useRef();
        const isSelected = item.id === selectedItem.id;

        React.useEffect(()=> {
          const itemElm = itemRef.current;
          
          if(isSelected) {  

            if(item.onSelect) {
              item.onSelect(item);
            }
            
            const rect = itemElm.getBoundingClientRect();

            const thumbW = rect.width;
            const thumbX = itemElm.offsetLeft;

            setThumbStyle({
              width: `${thumbW}px`,
              left: `${thumbX}px`,
              transition: "200ms ease"
            });
          }
        }, [selectedItem]);

        const handleClick = ()=> {
          if(!isSelected) {
            setSelectedItem(item);
          }
        }

        const styles_item = clsx({
          [styles.item]: true,
          [styles.selected]: isSelected
        });

        return (
          <div key={item.id} className={styles_item} ref={itemRef} onClick={handleClick}>
            {item.value}
          </div>
        )
      })}
      <div className={styles.thumb} style={thumbStyle}></div>
    </div>
  )
}

export default View;
