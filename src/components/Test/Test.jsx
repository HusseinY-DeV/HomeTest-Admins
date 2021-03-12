import React , {useEffect,useState} from 'react';
import styled from "styled-components";
import {getTests} from "./api";


const TestContainer = styled.div`


`;


const EachTest = styled.div`

`;



const Test = () => {

    const [tests,setTests] = useState([]);

    useEffect(() => {

        (async () => {
            const response = await getTests();
            setTests([...response.response]);
        })();
        
    }, []);

    return ( 
        <TestContainer>
        </TestContainer>
     );
}
 
export default Test;