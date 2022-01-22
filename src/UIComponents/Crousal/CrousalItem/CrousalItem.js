import "./CrousalItem.scss";

const CrousalItem = (props) => {
  let classes = props.className || "";
  classes = classes ? classes + " crousalItem" : "crousalItem";

  return <div className={classes}>{props.children}</div>;
};

export default CrousalItem;
