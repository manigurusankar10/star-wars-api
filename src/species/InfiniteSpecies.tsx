import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

const baseUrl = "https://swapi-node.vercel.app";
const initialUrl = baseUrl + "/api/species/";

export function InfiniteSpecies() {
  const fetchSpecies = async ({ pageParam = initialUrl }) => {
    const response = await fetch(pageParam);
    return response.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ["sw-people"],
    queryFn: fetchSpecies,
    getNextPageParam: (lastPage) => {
      return lastPage.next ? baseUrl + lastPage.next : undefined;
    },
    initialPageParam: undefined,
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  if (isError) {
    return <div className="loading">Error!!! {error.toString()}</div>
  }

  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll
        initialLoad={false}
        hasMore={hasNextPage}
        loadMore={() => {
          if (!isFetching) {
            fetchNextPage();
          }
        }}
      >
        {data.pages.map((pageData: any) => {
          return pageData.results.map((person: { fields: { name: string; language: string; averageLifespan: string; }; }) => {
            return <Species 
              key={person.fields.name}
              name={person.fields.name}
              language={person.fields.language}
              averageLifespan={person.fields.averageLifespan}
            />
          })
        })}
      </InfiniteScroll>
    </>
  );
}
