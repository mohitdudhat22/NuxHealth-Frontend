import { useContext } from "react";
import { ReceptionistContext } from "../context/ReceptionistContext";
export const useReceptionist = () => useContext(ReceptionistContext);
