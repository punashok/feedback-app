import { createContext, useEffect, useState } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [feedbacks, setFeedbacks] = useState(getLocalStorageData()
        /* [
        {
            id: 1,
            text: 'This is a test only from context',
            rating: 9
            
        },
        {
            id: 2,
            text: '2nd from the context',
            rating: 6
            
        }
    ] */
    );

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit:false
    })

    function getLocalStorageData() {
        return JSON.parse(localStorage.getItem('feedback')) || []
    }
    function updateLocalStorageData(data) {
        return localStorage.setItem('feedback',JSON.stringify(data))
    }

    useEffect(function () {
        updateLocalStorageData(feedbacks)
    },[feedbacks])



    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure want to delete this?')) {
          setFeedbacks(feedbacks.filter((item)=>item.id!==id))  
        }
    }

    function addFeedback(newFeedback) {
        setFeedbacks([newFeedback,...feedbacks])
    }

    function editFeedback(item) {
        setFeedbackEdit({item,edit:true})
    }

    function updateFeedback(id,updItem) {
        //now loop through the items and udpate the one
        setFeedbacks(prevFeedback => {
            return prevFeedback.map(function (item) {
                if (item.id === id) {
                    return {...item,...updItem}
                }
                else {
                    return item;
                }
            })
        })
        setFeedbackEdit({ edit: false, item:{}})
    }

    return <FeedbackContext.Provider
        value={
            { 
                feedbacks,
                deleteFeedback,
                addFeedback,
                editFeedback,
                feedbackEdit,
                updateFeedback
            }
        }
        >
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext