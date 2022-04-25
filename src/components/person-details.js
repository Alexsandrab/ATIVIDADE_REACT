import { useParams } from "react-router-dom";
import useFetchPeople from "../hooks/use-fetch-people";

function Details() {
  const { id } = useParams();
  const { isLoading, error, data, isFetching } = useFetchPeople();
  const pessoa = data?.results.filter((pessoa) => pessoa.name === id);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {pessoa.map((p) => {
        return (
          <div>
            <p> Name: {p.name}</p>
            <p> Mass:{p.mass}</p>
            <p> Height: {p.height}</p>
            <p>Gender: {p.gender}</p>
            <p> Hair Color: {p.hair_color}</p>

            <p>Films:</p>
            {p.films.map((f) => {
              return (
                <div>
                  <p>{f}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Details;