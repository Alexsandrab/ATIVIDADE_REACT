import "./App.css";
import React from "react";
import useFetchPeople from "../src/hooks/use-fetch-people";
import { useState } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Details from "./components/person-details";
import { Button, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  buttons: {
    backgroundColor: "black",
    height: 80,
    marginRight: 4,
  },
  buttonsInactive: {
    backgroundColor: "grey",
    height: 80,
    marginRight: 4,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
  },
});

function App() {
  const classes = useStyles();

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
          flexDirection: "column",
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

  const PessoaCard = () => {
    return (
      <div className="personListContainer">
        <Paper className="personList" style={{ width: "700px" }}>
          <div>
            {/* Card de cada pessoa */}
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

            {/* Botoes */}
            <div>
              <Button
                className={
                  oldNumeroElements === 0
                    ? classes.buttonsInactive
                    : classes.buttons
                }
                onClick={() => previousButton()}
                disabled={oldNumeroElements === 0 ? true : false}
              >
                <Typography className={classes.textButton}>Anterior</Typography>
              </Button>

              <Button
                className={
                  data?.results.length && oldNumeroElements !== 0
                    ? classes.buttonsInactive
                    : classes.buttons
                }
                onClick={() => forwardButton()}
                disabled={
                  numeroElements === data?.results.length ? true : false
                }
              >
                <Typography className={classes.textButton}>Próximo</Typography>
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:id">
          <Details />
        </Route>

        <Route path="/" exact>
          <PessoaCard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
