import Description from "./components/Description/Description"
import Options from "./components/Options/Options"
import { useState, useEffect } from "react";
import Feedback from "./components/Feedback/Feedback"
import Notification from "./components/Notification/Notification"
 
const App = () => {
 const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("feedback");
    if (savedFeedback) {
      try {
        const parsedFeedback = JSON.parse(savedFeedback);
        if (
          parsedFeedback &&
          typeof parsedFeedback.good === "number" &&
          typeof parsedFeedback.neutral === "number" &&
          typeof parsedFeedback.bad === "number"
        ) {
          return parsedFeedback;
        }
      } catch (error) {
        error;
      }
    }
    return { good: 0, neutral: 0, bad: 0 };
  });


    useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

    const positiveFeedback = totalFeedback
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

  const updateFeedback = (feedbackType) => {
    setFeedback((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
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
