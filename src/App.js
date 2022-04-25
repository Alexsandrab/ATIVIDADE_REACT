import "./App.css";
import React from "react";
import useFetchPeople from "../src/hooks/use-fetch-people";
import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import Details from "./components/person-details";
function App() {
  const { isLoading, error, data, isFetching } = useFetchPeople();

  const [numeroElements, setNumeroElements] = useState(5);
  const [oldNumeroElements, setOldNumeroElements] = useState(0);

  const forwardButton = () => {
    setNumeroElements((numeroElements) => numeroElements + 5);
    setOldNumeroElements((oldNumeroElements) => oldNumeroElements + 5);
  };

  const previousButton = () => {
    setNumeroElements((numeroElements) => numeroElements - 5);
    setOldNumeroElements((oldNumeroElements) => oldNumeroElements - 5);
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:id">
          <Details />
        </Route>

        <Route path="/" exact>
          <div className="personList">
              
              <div>
                {data?.results
                  ?.slice(oldNumeroElements, numeroElements)
                  .map((person) => (
                    <div>
                      <Link to={person.name} className="links">{person.name}</Link>
                      <p>{person.birth_year}</p>
                      <p>{person.gender}</p>
                    </div>
                  ))}
              </div>

              <div className="buttons">
                <button
                  onClick={() => previousButton()}
                  disabled={oldNumeroElements === 0 ? true : false}
                >
                  Anterior
                </button>
                <button
                  onClick={() => forwardButton()}
                  disabled={
                    numeroElements === data?.results.length ? true : false
                  }
                >
                  Próximo
                </button>
              </div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
