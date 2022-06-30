import React from 'react'
import RatingSelect from './RatingSelect';
import Button from './shared/Button';
import Card from './shared/Card';
import { nanoid } from "nanoid";
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {

    const [text, setText] = React.useState('')
    const [rating, setRating] = React.useState(10)
    const [btnDisabled, setBtnDisabled] = React.useState(true)
    const [message, setMessage] = React.useState('')
  

  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)
  
  React.useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
        setText(feedbackEdit.item.text)
        setRating(feedbackEdit.item.rating)
    }
    
  },[feedbackEdit])

    
    function handleTextChange(e) {
        const textValue = e.target.value;
        if (textValue.trim() === '') {
            setBtnDisabled(true)
            setMessage('')
        }
        else if(textValue.trim() !=='' && textValue.trim().length <= 10){
            setBtnDisabled(true)
            setMessage('Text must be at least 10 characters')
        }
        else {
            setBtnDisabled(false)
            setMessage('')
        }
        setText(textValue)
    }

    function handleSubmit(e) {
      e.preventDefault();
      if (feedbackEdit.edit) {
        updateFeedback(
          feedbackEdit.item.id,{
              text: text, rating: rating  
            }
          )
      }
      else {
        addFeedback({ id:nanoid(), text:text, rating:rating })
      }
      setText('')
      setBtnDisabled(true)
        
    }
  return (
        <Card>
          <form onSubmit={handleSubmit}>
              <h2>How would you rate your service with us?</h2>
              <RatingSelect select={(newRating)=>{setRating(newRating)}} />
              <div className="input-group">
                  <input type="text" value={text} placeholder='Write a review' onChange={handleTextChange} />
                  <Button type="submit" isDisabled={btnDisabled}>Send</Button>
              </div>
                {
                  message && 
                  <div className="message">{ message }</div>
                }
          </form>
        </Card>
  )
}

export default FeedbackForm