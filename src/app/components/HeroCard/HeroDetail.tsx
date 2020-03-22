import * as React from "react";
import styled from "styled-components";

interface HeroDetailProps {
  currentID: string;
  setCurrentID: any;
  setNextID: any;
  setPrevID: any;
  heroes: any;
}

const FullDetailContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 0;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  overflow: auto;
  transition: all ease-in-out 0.5s;
  font-family: "Montserrat", sans-serif;
  color: #eee;
  background-color: #001147;
  scrollbar-width: thin;
  scrollbar-color: #e91e63 #001147;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #e91e63;
  }

  &.active {
    height: 100%;
    transition: all ease-in-out 0.5s;
  }

  span.btns {
    position: absolute;
    top: 0;
    right: 10px;
    cursor: pointer;
    font-size: 3em;
    transition: color ease-in 0.15s;
    span.nextBtn:hover,
    span.prevBtn:hover,
    span.closeBtn:hover {
      color: #e91e63;
      transition: color ease-in 0.15s;
    }
    > span {
      margin-right: 15px;
    }
  }
`;
const FullDetail = styled.div`
  display: flex;
  width: calc(100% - 100px);
  padding: 20px 50px;
  font-size: 1em;

  @media (max-width: 1365px) {
    flex-flow: row wrap;
  }
  @media (max-width: 767px) {
    flex: 0 0 100%;
    width: calc(100% - 60px);
    padding: 20px;
  }
`;
const FullDetailImage = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  max-width: 100%;
  flex: 1 0 50%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 1365px) {
    flex: 0 0 100%;
    margin-top: 35px;
    height: 400px;
  }
  @media (max-width: 1023px) {
    height: 300px;
  }
  @media (max-width: 767px) {
    height: 200px;
  }
`;
const FullDetailBody = styled.div`
  flex: 1 0 50%;
  padding-left: 10px;

  div {
    margin-top: 15px;
  }
  div.heroTabsContainer {
    position: relative;
  }
  div.heroTabs {
    display: flex;
    margin-top: 40px;
    span {
      flex: 1;
      display: inline-block;
      padding: 10px;
      cursor: pointer;
      border: 1px solid #eee;
      :hover {
        background-color: #e91e63;
      }
    }
    span.activeTab {
      background-color: #e91e63;
    }
  }
  div.skillsWrapper,
  div.attributesWrapper,
  div.lifePowersWrapper {
    padding: 10px;
    border: 0.5px solid #ccc;
    box-shadow: 2px 2px 8px #000;
  }
  span {
    display: block;
  }
  span.resistanceWeakness {
    margin-bottom: 15px;
    font-weight: bold;
    color: #e91e63;
  }
  p {
    margin: 0.45em !important;
    color: #ccc;
    display: flex;
    span {
      display: inline-block;
      min-width: 100px;
    }
    b {
      margin: 0 6px;
    }
  }
  @media (max-width: 1365px) {
    flex: 0 0 100%;
  }
`;
const FullDetailHead = styled.div`
  margin: 0 !important;
  font-size: 1.5em;
  font-weight: bold;

  @media (max-width: 1365px) {
    margin-top: 15px !important;
  }
`;

export const HeroDetail: React.FC<HeroDetailProps> = ({
  currentID,
  heroes,
  setCurrentID,
  setNextID,
  setPrevID
}) => {
  const [heroTabs, setHeroTabs] = React.useState("skills");

  return (
    <FullDetailContainer className={currentID !== "" ? "active" : ""}>
      {currentID !== ""
        ? document.getElementsByTagName("body")[0].classList.add("heroTabOpen")
        : document.getElementsByTagName("body")[0].classList.remove("heroTabOpen")}
      {currentID !== "" &&
        heroes
          .filter(filtered => filtered["id"] === currentID.toString())
          .map((hero, index) => (
            <div key={index} style={{ position: "relative" }}>
              <FullDetail>
                <FullDetailImage
                  style={{ backgroundImage: `url(${hero["imgUrl"]})` }}
                />
                <FullDetailBody>
                  <FullDetailHead>{hero["name"]}</FullDetailHead>
                  <span className="resistanceWeakness">
                    Resistance - {hero["resistance"]} &ensp;|&ensp; Weakness -{" "}
                    {hero["weakness"]}
                  </span>
                  {hero["description"]}
                  <div>
                    <strong>Backstory</strong>
                    <span>{hero["backStory"]}</span>
                  </div>
                  <div className="heroTabsContainer">
                    <div className="heroTabs">
                      <span
                        onClick={() => setHeroTabs("skills")}
                        className={heroTabs === "skills" ? "activeTab" : ""}
                      >
                        Skills
                      </span>
                      <span
                        onClick={() => setHeroTabs("attributes")}
                        className={heroTabs === "attributes" ? "activeTab" : ""}
                      >
                        Attributes
                      </span>
                      <span
                        onClick={() => setHeroTabs("life_powers")}
                        className={
                          heroTabs === "life_powers" ? "activeTab" : ""
                        }
                      >
                        Lifepowers
                      </span>
                    </div>
                    <div className="heroActiveTabDetail">
                      {heroTabs === "skills" &&
                        hero["skills"].map((skill, index) => (
                          <div key={index} className="skillsWrapper">
                            <p>
                              <span>Name</span>
                              <b>:</b>
                              <span>{skill["name"]}</span>
                            </p>
                            <p>
                              <span>Damage</span>
                              <b>:</b>
                              <span>{skill["damage"]}</span>
                            </p>
                            <p>
                              <span>Element</span>
                              <b>:</b>
                              <span>{skill["element"]}</span>
                            </p>
                            <p>
                              <span>Description</span>
                              <b>:</b>
                              <span>{skill["description"]}</span>
                            </p>
                          </div>
                        ))}
                      {heroTabs === "attributes" && (
                        <div className="attributesWrapper">
                          <p>
                            <span>Strength</span>
                            <b>:</b>
                            <span>{hero["attributes"]["strength"]}</span>
                          </p>
                          <p>
                            <span>Intelligence</span>
                            <b>:</b>
                            <span>{hero["attributes"]["intelligence"]}</span>
                          </p>
                          <p>
                            <span>Stamina</span>
                            <b>:</b>
                            <span>{hero["attributes"]["stamina"]}</span>
                          </p>
                          <p>
                            <span>Agility</span>
                            <b>:</b>
                            <span>{hero["attributes"]["agility"]}</span>
                          </p>
                          <p>
                            <span>Speed</span>
                            <b>:</b>
                            <span>{hero["attributes"]["speed"]}</span>
                          </p>
                        </div>
                      )}
                      {heroTabs === "life_powers" && (
                        <div className="lifePowersWrapper">
                          <p>
                            <span>Healthpoints</span>
                            <b>:</b>
                            <span>{hero["life_powers"]["healthpoints"]}</span>
                          </p>
                          <p>
                            <span>Mana</span>
                            <b>:</b>
                            <span>{hero["life_powers"]["mana"]}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </FullDetailBody>
              </FullDetail>
              <span className="btns">
                {Number(currentID) > 1 && (
                  <span onClick={setPrevID} className="prevBtn">
                    &lt;
                  </span>
                )}
                {Number(currentID) < heroes.length && (
                  <span onClick={setNextID} className="nextBtn">
                    &gt;
                  </span>
                )}
                <span onClick={setCurrentID} className="closeBtn">
                  &times;
                </span>
              </span>
            </div>
          ))}
    </FullDetailContainer>
  );
};
