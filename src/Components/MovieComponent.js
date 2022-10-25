import React from 'react'
import styled from 'styled-components';
const MovieContainer = styled.div`
   display: flex;
   flex-direction: column;
   padding: 10px;
   width:280px;
   box-shadow: 0 3px 10px 0 #aaa;
   cursor: pointer;
`;
const CoverImage = styled.img`
   object-fit: cover;
   height: 362px;
`;

const MovieName = styled.span`
     font-size: 18px;
     font-weight: 600;
     color: black;
     margin:15px 0;
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
`;
const InfoColumn = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   font-size: 15px;
   font-weight: 600;
   color:black;
`
export default function MovieComponent(props) {
    const {Title , Year,imdbID ,Type, Poster}= props.movie;
  return (
    <div>
      <MovieContainer onClick={()=> props.onMovieSelect(imdbID)}>
        <CoverImage src={Poster}/>
        <MovieName>{Title}</MovieName>
        <InfoColumn>
            <span> Year: {Year}</span>
            <span>Type: {Type}</span>
        </InfoColumn>
      </MovieContainer>
    </div>
  )
}