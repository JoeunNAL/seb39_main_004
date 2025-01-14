import {
  SLable,
  SLogoRecipe,
  SInput,
  STextarea,
} from "../../components/NewRecipe/RecipeFormStyled";
import {
  ThumbNailUploader,
  TagsMaker,
  Guide,
  AddingIngredients,
  StepsMaker,
  ImgRadio,
  RequireMark,
} from "../../components/NewRecipe/indexNewRecipe";
import { TypeOfFileList, TypeOfIngredients } from "../../types/type";
import { IStepValues, ITagsData, IRecipeTemp } from "../../types/interface";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import recipeLogo from "../../assets/images/Recipe/recipeLogo.svg";
import useMessage from "../../hooks/useMessage";
import useRecipeJsonDataValidation from "../../hooks/useRecipeJsonDataValidation";

const SFormContainer = styled.main`
  max-width: 1280px;
  display: flex;
  flex-direction: column;
`;

const SSection = styled.div`
  width: 100%;
  background-color: var(--greenish-grey);
  border: 3px solid ${(props) => props.color ?? "var(--pink)"};
  border-style: solid none;
  padding: 4rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.device.desktop} {
    padding: 2rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding: 1rem;
  }
`;

const SFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  & > :first-child {
    margin-top: 3rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    & > :first-child {
      margin-top: 1rem;
    }
  }
`;

const SRecipeInfo = styled.div`
  display: flex;
  gap: 2.5rem;
  @media ${({ theme }) => theme.device.tablet} {
    display: block;
  }
`;

const SRecipeTexts = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  & > :nth-child(3) {
    margin-top: 2rem;
  }
  @media ${({ theme }) => theme.device.desktop} {
    & > :nth-child(3) {
      margin-top: 1rem;
    }
  }
`;

const SSectionBtn = styled.section`
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding-top: 2rem;
  @media ${({ theme }) => theme.device.tablet} {
    gap: 1rem;
  }
`;

const SFormBtn = styled.button`
  background-color: ${(props) => props.color ?? "var(--pink)"};
  color: white;
  width: 280px;
  font-size: 1.6rem;
  padding: 1rem;
  border-radius: 3px;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.3rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 50%;
    font-size: 1rem;
  }
`;

const AddPost = () => {
  const message = useMessage(3000);
  const navigate = useNavigate();

  // 등록페이지 관련
  const [data, setData] = useState<IRecipeTemp>({ body: "", title: "" });
  const [thumbNail, setThumbNail] = useState<TypeOfFileList>();
  const [stepImgFiles, setStepImgFiles] = useState<TypeOfFileList[]>([]);
  const [directDatas, setDirectDatas] = useState<IStepValues[]>([]);
  const [checkedCateg, setCheckedCateg] = useState("");
  const [ingredientsDatas, setIngredientsDatas] = useState<TypeOfIngredients[]>(
    []
  );
  const [tagsDatas, setTagsDatas] = useState<ITagsData[]>([]);

  // 빈 값 체크
  const isJsonDataEmpty = useRecipeJsonDataValidation(
    data,
    ingredientsDatas,
    directDatas,
    tagsDatas
  );

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    setData({ ...data, [target.name]: target.value });
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    /** 텍스트 누락 체크 */
    if (isJsonDataEmpty === true) {
      message.fire({
        icon: "error",
        title:
          "레시피 등록에 실패했습니다.\n 누락된 정보가 있는지 \n확인해주세요.",
      });
      return;
    }

    /** 이미지 누락 체크 */
    const emptyImageIndex = stepImgFiles.findIndex((el) => el === undefined);
    if (emptyImageIndex >= 0) {
      message.fire({
        icon: "error",
        title: `요리 순서의 ${emptyImageIndex + 1}번째 이미지를 \n추가해주세요`,
      });
      return;
    }
    if (!thumbNail || stepImgFiles.length === 0) {
      message.fire({
        icon: "error",
        title: `등록하려면 \n이미지를 추가해주세요.`,
      });
      return;
    }

    /** 서버 요청 데이터 구축 */
    const formData = new FormData();
    formData.append("imgThumbNail", thumbNail);

    stepImgFiles.forEach((file) => {
      if (file) {
        formData.append("imgDirection", file);
      }
    });

    // 재료순서 변경 인덱스 정렬
    const filteredIngredients: TypeOfIngredients[] = [];
    ingredientsDatas.forEach((oneline, idx) => {
      filteredIngredients.push({ ...oneline, index: idx + 1 });
    });

    // 조리순서 변경 인덱스 정렬
    const filteredDirects: IStepValues[] = [];
    directDatas.forEach((oneline, idx) => {
      filteredDirects.push({ ...oneline, index: idx + 1 });
    });

    const recipeDatas = {
      ...data,
      category: checkedCateg,
      ingredients: filteredIngredients,
      directions: filteredDirects,
      tags: tagsDatas,
    };

    formData.append(
      "recipe",
      new Blob([JSON.stringify(recipeDatas)], { type: "application/json" })
    );

    /** 서버 요청 */
    const response = await axios.post("/api/v1/recipe/add", formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    try {
      const newId = response.data.data.id;
      navigate(`/post/${newId}/`);
    } catch (error) {
      message.fire({
        icon: "error",
        title:
          "레시피 등록에 실패했습니다.\n 누락된 정보가 있는지 \n확인해주세요.",
      });
    }
  };

  return (
    <SFormContainer>
      <SLogoRecipe src={recipeLogo} alt="recipeLogo"></SLogoRecipe>
      <form action="" method="post" onSubmit={submitHandler}>
        <SSection>
          <SRecipeInfo>
            <SRecipeTexts>
              <SLable htmlFor="title">
                레시피 제목
                <RequireMark />
              </SLable>
              <SInput
                name="title"
                value={data.title}
                onChange={inputHandler}
                id="title"
                placeholder="레시피 제목을 적어주세요."
              />
              <SLable htmlFor="body">
                요리 소개
                <RequireMark />
              </SLable>
              <STextarea
                name="body"
                id="body"
                value={data.body}
                onChange={inputHandler}
                rows={5}
                placeholder="레시피를 소개해주세요."
              ></STextarea>
            </SRecipeTexts>
            <ThumbNailUploader setThumbNail={setThumbNail} />
          </SRecipeInfo>
          <SFieldset>
            <SLable htmlFor="category">
              요리 카테고리
              <RequireMark />
            </SLable>
            <ImgRadio
              setCheckedCateg={setCheckedCateg}
              checkedCateg={checkedCateg}
            ></ImgRadio>
          </SFieldset>
        </SSection>
        <SSection color={"var(--green-bean)"}>
          <SLable htmlFor="ingredients">
            요리 재료
            <RequireMark />
            <Guide text="필수 재료는 체크표시를 해주세요." />
          </SLable>
          <AddingIngredients
            setIngredientsDatas={setIngredientsDatas}
            ingredientsDatas={ingredientsDatas}
          />
        </SSection>
        <SSection color={"var(--yellow)"}>
          <SLable>
            요리 순서
            <RequireMark />
            <Guide text="중요한 부분은 빠짐없이 적어주세요." />
          </SLable>
          <StepsMaker
            directDatas={directDatas}
            setDirectDatas={setDirectDatas}
            stepImgFiles={stepImgFiles}
            setStepImgFiles={setStepImgFiles}
          />
        </SSection>
        <SSection color={"var(--sky-blue)"}>
          <SLable>태그</SLable>
          <TagsMaker setTagsDatas={setTagsDatas} tagsDatas={tagsDatas} />
        </SSection>
        <SSectionBtn>
          <SFormBtn color={"var(--deep-green)"} type="reset">
            취소
          </SFormBtn>
          <SFormBtn type="button" onClick={submitHandler}>
            등록
          </SFormBtn>
          {/* <button >임시저장</button> */}
        </SSectionBtn>
      </form>
    </SFormContainer>
  );
};
export default AddPost;
