import React, { useEffect, useState } from "react";
import '../src/Subscription.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/Backbutton";

const SubscriptionPage = () => {
  const { username, userid } = useParams();
  const navigate = useNavigate();

  // State for storing plan details
  const [plans, setPlans] = useState([
    {
      name: "Basic",
      price: 0,
      features: ["Add upto 5 jobs", "Limited Profile Access", "Basic Support"],
      buttonText: "Choose Normal",
      className: "normal-plan",
    },
    {
      name: "Premium",
      price: 6000,
      features: [
        "Add upto 10 jobs",
        "Moderate Profile Access",
        "Priority Support",
      ],
      buttonText: "Choose Premium",
      className: "premium-plan",
      badge: "Popular",
    },
    {
      name: "Pro Premium",
      price: 9000,
      features: [
        "Add Unlimited Jobs",
        "Full Profile Access",
        "24/7 Support",
      ],
      buttonText: "Choose Premium",
      className: "premium-plan"
    }
  ]);

  useEffect(() => {
    // Getting data from the backend about the user
    const getUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${userid}`);
        const userdata = response.data;
        
        if (!userdata.userprofilefound) {
          alert("You need to login first... Or some error occurred. Try again after some time.");
          return;
        }

        let updatedPlans = [...plans]; // Create a copy of the current plans

        // Check current user's subscription and update the buttonText accordingly
        if (userdata.userProfiledata.subscription === "workprovider-basic") {
          updatedPlans[0].buttonText = "Current Plan";
        } else if (userdata.userProfiledata.subscription === "workprovider-mid") {
          updatedPlans[1].buttonText = "Current Plan";
        } else {
          updatedPlans[2].buttonText = "Current Plan";
        }

        // Update the state with the new plans
        setPlans(updatedPlans);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []); // Adding plans in the dependency array to avoid re-creating plans on each render
  
  const paymentmethod = async (plan,subscriptiontype) => {
    try {
        const response = await axios.post('http://localhost:5000/create-checkout-session', {
            planName: plan.name,
            price: plan.price,
            userId: userid,
            subscriptiontype:subscriptiontype,
            username: username,
            usertype: "freelance"
        });

        if (response.data?.url) {
            window.location.href = response.data.url;
        } else {
            throw new Error("Invalid response from server.");
        }
    } catch (error) {
        console.error('Error redirecting to Stripe Checkout:', error);
        alert("An error occurred while processing your payment. Please try again.");
    }
};


  const handleClick = async(plan)=>{
    //if payment success
    const subscriptiontype = (plan.name==="Basic")?"workprovider-basic":(plan.name==="Premium")?"workprovider-mid":"workprovider-adv";

    await paymentmethod(plan,subscriptiontype);
    
    // makeChangestodb(userid,subscriptiontype);
    
  }


  return (
    <>
    <BackButton/>
    <div className="timepass">
      <div className="subscription-page">
        <div className="content-container">
          <h1 className="page-title">Choose Your Plan</h1>
          <div className="plans-container">
            {plans.map((plan, index) => (
              <div key={index} className={`plan-card ${plan.className}`}>
                {plan.badge && <div className="featured-badge">{plan.badge}</div>}
                <h2 className="plan-name">{plan.name}</h2>
                <p className="plan-price">₹{plan.price}/Lifetime</p>
                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="feature-items">
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className="choose-button" 
                  style={{
                    backgroundColor: (plan.buttonText === "Current Plan") ? 'purple' : 'gray',
                    cursor: (plan.buttonText === "Current Plan") ? 'not-allowed' : 'pointer'
                  }} 
                  disabled={plan.buttonText === "Current Plan"}
                  onClick={()=>handleClick(plan)}
                  value={plan.name}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SubscriptionPage;
