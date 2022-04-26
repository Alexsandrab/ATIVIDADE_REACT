import "./App.css";
import React from "react";
import useFetchPeople from "../src/hooks/use-fetch-people";
import { useState } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
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

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: "center",
          marginTop: "25%",
        }}
      >
        <div> Loading...</div>
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:id">
          <Details />
        </Route>

        <Route path="/" exact>
          <div className="personListContainer">
            <div className="personList">
              <div>
                {data?.results
                  ?.slice(oldNumeroElements, numeroElements)
                  .map((person) => (
                    <Link to={person.name} className="links">
                      <div className="personCard">
                        Person: <span>{person.name}</span>
                        <p>
                          Ano de nasc.: <span>{person.birth_year}</span>{" "}
                        </p>
                      </div>
                    </Link>
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
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
