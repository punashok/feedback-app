import React from 'react'
import FeedbackItem from './FeedbackItem'
import Card from './shared/Card'
import { motion, AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

export default function FeedbackList() {
    const {feedbacks} = useContext(FeedbackContext)

    if (feedbacks.length === 0) {
        return (
            <Card>
                No Feedbacks!!!
            </Card>
        )
    }
    

    return (
        <div className="feedbak-list">
            <AnimatePresence>
            {
                    feedbacks.map((item) => 
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity:0 }}
                        >
                            <FeedbackItem item={item} key={item.id} />
                    </motion.div>
                )
            }
                </AnimatePresence>
        </div>
    )
   
}
