import useFetchPeople from "../hooks/use-fetch-people";

export const PersonList = () => {
  const { isLoading, error, data, isFetching } = useFetchPeople();

  console.log(data)

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data?.results?.slice(0).map((person) => 
        <div>
          <h1>Person: {person.name}</h1>
          <p>{person.birth_year}</p>
          <p>{person.gender}</p>
        </div>
      )}
    </>
  );

  // {data?.results?.map((person) => (
  //     return (
  //   <div>
  //     <h1>{data.name}</h1>
  //     <p>{data.birth_year}</p>
  //     <p>{data.gender}</p>
  // </div>
  // );
  // ))}

  // return (
  //   <div>
  //     <h1>{data.name}</h1>
  //     <p>{data.birth_year}</p>
  //     <p>{data.gender}</p>
  // </div>
  // );
};
