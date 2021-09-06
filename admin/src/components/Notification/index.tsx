import { store } from "react-notifications-component";
// import NotificationBody from "./customNotificationBody"; // para corpo customizado

interface NotificationOptions {
  title?: string;
  message?: string;
  type: "success" | "danger" | "info" | "default" | "warning";
}

export default function showNotification(params: NotificationOptions) {
  // const content = (      //custom body
  //   <NotificationBody
  //     type={params.type}
  //     message={params.message}
  //     description={params.description}
  //   />
  // );
  store.addNotification({
    title: params.title || " ",
    message: params.message || " ",
    type: params.type,
    //content, //custom body
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 4000,
      onScreen: true,
    },
  });
}
