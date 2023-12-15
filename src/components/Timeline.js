import styled from "styled-components";
import Header from "./Header";

export default function Timeline() {
  return (
    <>
      <Header />
      <DivTimeline>
        <p>Timeline</p>
      </DivTimeline>
    </>
  );
}
//  ----------------------------css
const DivTimeline = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
