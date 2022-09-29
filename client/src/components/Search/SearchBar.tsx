/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { Tag } from "../CommonUI";
import axios from "axios";

const SSearchLayout = styled.section`
  width: 100vw;
  background-color: var(--deep-green);
`;

const SSearchBar = styled.div`
  margin: 20px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 500px;
    font-size: 1rem;
    color: white;
    border: none;
    border-bottom: solid 1px white;
    background-color: var(--deep-green);
    outline: none;
  }

  button {
    color: white;
    font-size: 1.5rem;
  }
`;

const SSearchTagLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  height: 70px;
  background-color: var(--ivory);
`;

const SSearchWord = styled.div`
  color: var(--deep-green);
`;

const STagArea = styled.div`
  margin: 0 20px;
`;

interface SearchProps {
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  setSearchData: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchBar = ({
  searchWord,
  setSearchWord,
  setSearchData,
}: SearchProps) => {
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await axios.get(
      `api/v1/recipe/search/1?search=${searchWord}&orderBy=id`
    );

    setSearchData(data.data[0]);
  };

  // TODO: 태그 클릭 시 검색창 자동 검색 추후 구현
  // const onTagClickHandler = (i: string) => {
  //   console.log(i);
  // };

  return (
    <SSearchLayout>
      <form onSubmit={onSubmitHandler}>
        <SSearchBar>
          <input type="text" onChange={onChangeSearch} />
          <button type="submit">
            <BiSearch />
          </button>
        </SSearchBar>
      </form>
      <SSearchTagLayout>
        <SSearchWord>인기 검색어</SSearchWord>
        <STagArea>
          {/* TODO: 조회수 순으로 5개 정도 키워드 노출 */}
          {["계란", "돼지고기", "파스타"].map((i, idx) => (
            <Tag key={idx} name={i} />
          ))}
        </STagArea>
      </SSearchTagLayout>
    </SSearchLayout>
  );
};

export default SearchBar;
