function TabPanel(props) {
  const { children, value, index } = props;
  return <div hidden={value !== index}>{value === index && children}</div>;
}

export default TabPanel;
