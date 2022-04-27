import axios from "axios";
import { useQuery } from "react-query";

export default function useFetchPeople() {
  const { isLoading, error, data, isFetching} = useQuery("people", () =>
  axios.get("https://swapi.dev/api/people").then((res) => {
    return res.data;
  })
);

  return { isLoading, error, data, isFetching };
}

