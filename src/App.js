import React,{useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import MovieComponent from "./Components/MovieComponent";
import MovieInfoComponent from './Components/MovieInfoComponent';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  background-color: black;
  color: white;
  padding: 10px;
  // padding-left:20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px #555;
  width: 100vw;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MovieImage= styled.img`
  width:55px;
  height:52px;
  margin:15px;
  margin-left: 20px;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding:10px 10px;
  width:50%;
  border-radius: 6px;
  margin-left:20px;
  margin-right:5px;
`;
const SearchIcon = styled.img`
  height: 25px;
  width: 25px;
`;
const SearchInput = styled.input`
  margin-left: 20px;
  border: none;
  outline: none;
  font-size: 15px;
  font-weight: bold;
`;
const MovieListContainer= styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap : wrap;
  padding: 30px; 
  gap:24px;
  justify-content: space-evenly;
  // justify-content:space-around;
  width:100%;
  margin-bottom: 10px;
`;


function App() {

  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList ,updateMovieList] = useState([]);
  const [selectedMovie ,updateSelectedMovie] = useState();
  const [initialSearch, updateInitialSearch] = useState([]);


  const fetchData = async(searchString)=>{
    const response= await axios.get(`http://www.omdbapi.com/?s=${searchString}&apikey=92dd219e`);
    // console.log(response);
    updateMovieList(response.data.Search)
    if(!initialSearch.length){
      updateInitialSearch([...movieList]);
    }
  }
  
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    if(event.target.value !== ""){
      const timeout= setTimeout(() => fetchData(event.target.value), 500);
     updateTimeoutId(timeout);
    }
    else{
      updateMovieList(initialSearch)
    }
    
  };
  //  useEffect(()=>{
  //   fetchData('anime');
  //  },[])


  return (
    <Container>
      <Header>
      <AppName>
          <MovieImage src="/Movie-icon.svg"/>
            My Movie App 
            </AppName>
            <SearchBox>
            <SearchIcon src="/Search-icon.svg"/>
            <SearchInput placeholder="Search Movie" value={searchQuery} onChange={onTextChange}/>
            </SearchBox>
      </Header>
      {selectedMovie ? <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={updateSelectedMovie} /> :null}
        <MovieListContainer>
          {movieList?.length
          ?movieList.map((movie , index)=> <MovieComponent key={index} movie={movie} onMovieSelect={updateSelectedMovie}/>)
        :"No Movie Found"}
          
        </MovieListContainer>
    </Container>
  );
}

export default App;
