import { useParams } from "react-router-dom";
import useFetchPeople from "../hooks/use-fetch-people";

function Details() {

  const { id } = useParams();
  const {  data } = useFetchPeople();
  const pessoa = data?.results.filter((p) => p.name === id);

  console.log('pessoa: ', pessoa);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px'}}>
      <h1> Detalhes </h1>
      {pessoa.map((p) => {
        return (
          <div className="personDetails">
            <p> Name: <span>{p.name}</span> </p>
            <p> Mass: <span>{p.mass}</span></p>
            <p> Height: <span>{p.height}</span> </p>
            <p> Gender: <span>{p.gender}</span></p>
            <p> Hair Color: <span>{p.hair_color}</span> </p>

            <p>Films:</p>
            {p.films.map((f) => {
              return (
                <div>
                  <span>{f}</span>
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