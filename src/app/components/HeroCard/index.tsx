import * as React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;
`;
const CardImage = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
  @media (min-width: 1024px) and (max-width: 1365px) {
    height: 180px;
  }
  @media (max-width: 767px) {
    height: 160px;
  }
`;
const CardBody = styled.div`
  padding: 5px 10px;
`;
const CardHead = styled.div`
  max-width: 60%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-transform: capitalize;
  font-size: 1.15em;
  font-weight: bold;
`;
const CardDetail = styled.div`
  max-width: 100%;
  padding: 4px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 0.85em;
  color: #1d1d1d;
`;

interface IHeroCardProps {
  name: string;
  imgUrl: string;
  description: string;
}

export const HeroCard: React.FC<IHeroCardProps> = ({
  name,
  imgUrl,
  description
}) => {
  return (
    <Card>
      <CardImage src={imgUrl} />
      <CardBody>
        <CardHead>{name}</CardHead>
        <CardDetail>{description}</CardDetail>
      </CardBody>
    </Card>
  );
};
