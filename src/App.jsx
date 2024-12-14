import Description from "./components/Description/Description"
import Options from "./components/Options/Options"
import { useState, useEffect } from "react";
import Feedback from "./components/Feedback/Feedback"
import Notification from "./components/Notification/Notification"
 
const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });
  useEffect(() => {
    const savedFeedback = localStorage.getItem('feedback');
       if (savedFeedback) {
      try {
        const parsedFeedback = JSON.parse(savedFeedback);
        setFeedback(parsedFeedback ?? { good: 0, neutral: 0, bad: 0 });
      } catch (error) {
         error;
      }
    }
  }, []); 

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

    const positiveFeedback = totalFeedback
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

  const updateFeedback = (feedbackType) => {
    setFeedback((prev) => {
      const updatedFeedback = { ...prev, [feedbackType]: prev[feedbackType] + 1 };
      localStorage.setItem('feedback', JSON.stringify(updatedFeedback));   
      return updatedFeedback;
    });
  };
    const resetFeedback = () => {
  const initialState = { good: 0, neutral: 0, bad: 0 };
  setFeedback(initialState);
  localStorage.setItem('feedback', JSON.stringify(initialState));
    };
  
  return (
    <>
    <Description/>
      <Options updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback } />
       {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification message="No feedback yet." />
      )}
      
    </> 


);


};
export default App
