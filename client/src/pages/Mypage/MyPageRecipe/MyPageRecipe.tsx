import React from "react";
import styled from "styled-components";
import { SortButtons } from "../../../components/CommonUI/";

const SContainer = styled.div`
  display: grid;
  grid-template-columns: 130px auto;
  -webkit-column-gap: 20px;
  column-gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid var(--pale-gray);
`;
const RecipeImg = styled.div`
  display: inline-block;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  background-color: var(--pale-gray);
  width: 130px;
  height: 130px;
`;

const RecipeInfo = styled.div`
  padding-top: 30px;
  h2 {
    font-size: 1.1rem;
    padding-bottom: 15px;
  }
  p {
    color: var(--deep-gray);
    font-size: 0.9rem;
  }
`;

const SEmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;
`;

const MyPageRecipe = () => {
  const sortValues = ["최신순", "조회순", "평점순"];

  const dummyData = [
    {
      id: 1,
      title: "타이틀이 들어가는 자리입니다.",
      createdDate: "2022-03-28",
    },
    {
      id: 2,
      title: "타이틀이 들어가는 자리입니다.",
      createdDate: "2022-03-28",
    },
  ];
  return (
    <>
      <SortButtons sortValues={sortValues} />
      {dummyData.length > 0 ? (
        dummyData.map((data) => (
          <SContainer key={data.id}>
            <RecipeImg />
            <RecipeInfo>
              <h2> {data.title}</h2>
              <p>{data.createdDate}</p>
            </RecipeInfo>
          </SContainer>
        ))
      ) : (
        <SEmptyContainer>
          <div>북마크가 없습니다.</div>
        </SEmptyContainer>
      )}
    </>
  );
};

export default MyPageRecipe;