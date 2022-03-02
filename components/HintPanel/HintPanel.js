import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap';
import { getHints } from './HintHelpers'
import { MAX_HINTS } from '../../next.config';
// import {FaSignOutAlt} from 'react-icons/fa'

function HintPanel({gameboardState, wordList, showHints}){

    const [hints, setHints] = useState()
    const [hintInfo, setHintInfo] = useState()
    
    const hintboxRef = useRef(null)
    const [hintboxHeight, setHintboxHeight] = useState(0)

    useEffect( () => {
      const [hintInfo, hints] = getHints(wordList, gameboardState.chars, MAX_HINTS)
      setHints(hints)
      setHintInfo(hintInfo)
    }, [gameboardState])

    useEffect(() => {
      const h = hintboxRef.current.clientHeight;
      console.log(h)
      setHintboxHeight(hintboxRef.current.clientHeight)
    }, [hints])
    
    
    if(!showHints) return <></>
    
    return (
      <Row >
        <Col> 
        <InfoBox hints={hints} hintboxHeight={hintboxHeight}>
            <p ref={hintboxRef}><strong>Hints {hintInfo}: </strong>{hints}</p>
        </InfoBox>
        </Col>
      </Row>
    )
  }
  
const InfoBox = styled.div`
  border: 1px solid grey;
  background-color: ${props => props.theme.InfoBGColor};
  font-size: 12px;
  overflow: none;
  margin-bottom: 12px;
  height: ${ props => props.hintboxHeight + 15}px;
  padding: 5px 10px;
`

HintPanel.propTypes = {
  gameboardState: PropTypes.object.isRequired
}

export default HintPanel