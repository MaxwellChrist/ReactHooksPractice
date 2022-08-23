import React, { useState} from "react";
import { FaStar } from 'react-icons/fa'


const Star = ({total = 5}) => {

    const [selectedStars, setSelectedStars] = useState(0)
    
    const CreateStarArray = (lengthOfArr) => [
        ...Array(lengthOfArr)
    ]
    
    const CreateStarArrayRating = ({ selected = false, onSelect}) => {
        return (
            <FaStar color={selected ? "orange" : "gray"} onClick={onSelect}/>
        )
    }
    
    return (
        <>
            {CreateStarArray(total).map((item, index) => (
                <CreateStarArrayRating key={index} selected={selectedStars > index} onSelect={() => setSelectedStars(index + 1)}/>
            ))}
            <p>{selectedStars} of {total}</p>
        </>

    )
}

export default Star