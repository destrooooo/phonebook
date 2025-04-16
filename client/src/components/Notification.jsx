const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  // .notification {
  //   color: green;
  //   background: lightgrey;
  //   font-size: 20px;
  //   border-style: solid;
  //   border-radius: 5px;
  //   padding: 10px;
  //   margin-bottom: 10px;
  // }

  const notificationStyle = {
    color: type === "success" ? "green" : "red",
    background: "#f3f3f3",
    fontSize: 20,
    border: `3px solid ${type === "success" ? "green" : "red"}`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
