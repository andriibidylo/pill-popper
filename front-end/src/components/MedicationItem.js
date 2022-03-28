import react, { Fragment, useState } from "react";
import axios from "axios";
import "./MedicationItem.scss";
import classNames from "classnames";
import useVisualMode from "../hooks/useVisualMode";

import ItemDefault from "./medicationComponents/ItemDefault";
import Confirm from "./medicationComponents/Confirm";
import Options from "./medicationComponents/Options";
import Info from "./medicationComponents/Info";

export default function MedicationItem(props) {
  const [destroy, setDestroy] = useState(false);
  const [info, setInfo] = useState({});
  const [selectedInfo, setSelectedInfo] = useState({})

  const DEFAULT = "DEFAULT";
  const OPTIONS = "OPTIONS";
  const INFO = "INFO";
  const CONFIRM = "Confirm";
  const { mode, transition } = useVisualMode(DEFAULT);

  function getFda(){
    transition(OPTIONS);
    axios.get(`http://localhost:8081/fda/${ props.fda_id }`)
    .then((res) => { setInfo( res.data[0] ) })
  }

  function selectInfo(infoKey){
    transition(INFO);
    //console.log(infoKey, " ::: ", info[infoKey]);
    setSelectedInfo({
      infoKey: infoKey,
      info: info[infoKey]
    })
  }


  let color;
if (props.color === "pink") {
  color = "medication-item__pink";
} else if (props.color === 'purple') {
  color = "medication-item__purple";
} else if (props.color === 'yellow') {
  color = "medication-item__yellow"
} else if (props.color === 'green') {
  color = "medication-item__green"
} else if (props.color === 'light-blue') {
    color = "medication-item__light-blue"
} else if (props.color === 'blue') {
    color = "medication-item__blue"
} else if (props.color === 'neutral') {
    color = "medication-item__neutral"
}
  

  const destroyBoolean = function () {
    if (!destroy) {
      setDestroy(true);
      console.log("clicked delete icon", props.color);
    }
  };

  return (
    <>
    { mode === CONFIRM && 
      < Confirm destroy={ destroy }
       setDestroy={ setDestroy } 
       deleteMe={ props.deleteMe } 
       transition={ transition } /> }

    { mode === DEFAULT && 
      < ItemDefault { ...props } 
      transition={ transition } 
      color={ color } 
      getFda={ getFda } />  }

    { mode === OPTIONS && 
      < Options infoKeys = { Object.keys(info) } selectInfo={ selectInfo }  /> }

    { mode === INFO &&
      < Info info = { selectedInfo } /> }
    </>
  );
}
