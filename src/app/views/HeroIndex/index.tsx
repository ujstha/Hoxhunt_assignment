import * as React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";

import { TopBar } from "../../components/TopBar";
import { Hero } from "../../components/Hero";
import { Section } from "../../components/Section";
import { Footer } from "../../components/Footer";
import { HeroCard } from "../../components/HeroCard";
import { Loader } from "../../components/Loader";
import { Error } from "../../components/Error";
import { HeroDetail } from "../../components/HeroCard/HeroDetail";

const HEROES_QUERY = gql`
  query {
    heroes {
      id
      name
      imgUrl
      description
      backStory
      resistance
      weakness
      skills {
        name
        damage
        element
        description
      }
      attributes {
        strength
        intelligence
        stamina
        agility
        speed
      }
      life_powers {
        healthpoints
        mana
      }
    }
  }
`;

interface IHeroIndexProps {}

interface IHero {
  name: string;
  imgUrl: string;
  description: string;
}

const HeroCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-around;
  align-content: center;
  overflow: hidden;
  max-width: 100vw;
  padding: 50px;
  align-self: center;
  font-family: "Montserrat", sans-serif;

  @media (max-width: 1023px) {
    padding: 50px 20px;
  }
  @media (min-width: 1400px) {
    margin-left: auto;
    margin-right: auto;
  }

  .cardContainer {
    -ms-flex: 1;
    flex: 1;
    max-width: calc(100% - 10px);
    margin: 5px;
    margin-top: 10px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 1px 1px 2px #eee;
    transition: all ease-in-out 0.3s;
    &:hover {
      transform: scale(1.025);
      margin-top: 5px;
      box-shadow: 2px 2px 1px #eee;
      cursor: pointer;
      transition: all ease-in-out 0.3s;
    }
    
    @media (min-width: 1024px) and (max-width: 1365px) {
      -ms-flex: 1;
      flex: 1;
      max-width: 100%;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
        -ms-flex 0 0 50%;
        flex: 0 0 50%;
        max-width: calc(50% - 15px);
    }
    @media (max-width: 767px) {
      -ms-flex: 0 0 100%;
      flex: 0 0 100%;
    }
  }

`;

const handleLoading = () => <Loader loaderContent="Loading...." />;

const handleError = (message: string) => (
  <Error errorContent={`Error!!! ${message}`} />
);

export const HeroIndex: React.FC<IHeroIndexProps> = () => {
  const {
    data: { heroes },
    error,
    loading
  } = useQuery<{ heroes: IHero[] }>(HEROES_QUERY);

  const [currentID, setCurrentID] = React.useState("");

  if (error) {
    return handleError(error.message);
  }

  if (loading) {
    return handleLoading();
  }

  return (
    <main>
      <TopBar />
      <Hero />
      <Section
        heading={"Hunter Index"}
        paragraph={`
          Professor Hoax gave us this Hunter Index -tool 
          so we can see how our heroes manage against evildoers. 
          Unfortunately he forgot to implement their HeroCards. 
          It's your job to finish his work before we can continue
          on our journey together!
        `}
      />
      <HeroCardContainer>
        {heroes.map((hero, index) => (
          <div
            key={index}
            className="cardContainer"
            onClick={() => setCurrentID(hero["id"])}
          >
            <HeroCard {...hero} />
          </div>
        ))}
      </HeroCardContainer>
      <HeroDetail
        currentID={currentID}
        heroes={heroes}
        setCurrentID={() => setCurrentID("")}
        setNextID={() => {
          const nextID =
            Number(currentID) < heroes.length ? Number(currentID) + 1 : 1;
          setCurrentID(nextID.toString());
        }}
        setPrevID={() => {
          const prevID =
            Number(currentID) > 1 ? Number(currentID) - 1 : heroes.length;
          setCurrentID(prevID.toString());
        }}
      />
      <Section
        heading={"The Hero Rises"}
        paragraph={`
          The hero manages against evildoers by implementing the HeroCards along with other small implementations as well as making amendments to the team, that was forgotten by Professor Hoax. And, now the hero waits for the announcement he hopes to get.
        `}
      />
      <Footer />
    </main>
  );
};
