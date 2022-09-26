import styled from "styled-components";

const SSortContainer = styled.section`
  display: flex;
  gap: 0.1rem;
  margin: 1rem;
  justify-content: right;
  align-items: center;
  color: var(--deep-gray);

  button {
    font-size: 1.2rem;
  }

  button:hover {
    transition: 0.1s;
    color: var(--red);
  }

  div:after {
    content: "|";
  }

  div:last-child:after {
    display: none;
  }
`;

interface Sort {
  sortValues: string[];
  clickEvent?: (orderValue: string) => Promise<void> | void;
}

const SortButtons = ({ sortValues, clickEvent }: Sort) => {
  return (
    <SSortContainer>
      {sortValues.map((value, idx) => (
        <div key={idx}>
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              clickEvent?.(value);
            }}
          >
            {value}
          </button>
        </div>
      ))}
    </SSortContainer>
  );
};
export default SortButtons;