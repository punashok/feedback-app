import React from 'react'
import { useContext } from "react"
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {

    const {feedbacks} = useContext(FeedbackContext)

    //calculate avearting rating
    let average_rating = feedbacks.reduce((acc,cur) => {
        return acc + cur.rating
    }, 0) / feedbacks.length
    
    if (isNaN(average_rating)) {
        average_rating = 0;
    }
      return (
      <div className='feedback-stats'>
          <h4>{feedbacks.length} {feedbacks.length === 1 ? 'Review' : 'Reviews'}</h4>
          <h4>Average Rating: {  average_rating.toFixed(1) }</h4>
    </div>
  )
}

export default FeedbackStats