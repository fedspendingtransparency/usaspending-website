import { useLocation } from "react-router";

const useQueryParams = () => Object.fromEntries(new URLSearchParams(useLocation().search));

export default useQueryParams;
