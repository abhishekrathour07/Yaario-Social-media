import dynamic from "next/dynamic";


const Notification = dynamic(() => import("./Notification"));
const NotificationHOC = () => {
 return (
  <div>
    <Notification />
  </div>
 );
};
export default NotificationHOC;