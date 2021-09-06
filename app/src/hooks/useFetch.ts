import useSWR from "swr";
import { useHistory } from "react-router-dom";

import api from "../services/api";
import showNotification from "../components/Notification";

export default function useFetch({ path, params }) {
  const history = useHistory();

  const { data, mutate } = useSWR(path, async (path) => {
    try {
      const response = await api.get(path, {
        params,
      });

      return response.data;
    } catch (error) {
      if (
        error.response?.status === 401 &&
        error.response?.body.error === "Autenticação necessária"
      ) {
        showNotification({
          type: "warning",
          title: "Sua sessão expirou",
          message: "Faça login novamente",
        });

        history.push("/login");
      }
    }
  });
  return { data, mutate };
}
