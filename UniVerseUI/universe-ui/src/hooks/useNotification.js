import { useContext } from "react"
import { NotificationContext } from "../contexts/NotificationContext";

export const useNotification = () => {
    return useContext(NotificationContext);
}
