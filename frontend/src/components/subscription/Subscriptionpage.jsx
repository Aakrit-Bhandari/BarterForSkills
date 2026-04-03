import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CHECKOUT_URL,TYPE_GET, TYPE_POST, USER_URL } from "../../fetchers/constants";
import { pokeBarterForSkillsServer } from "../../fetchers/fetchers";
import BackButton from "../backButton/Backbutton";
import "./Subscription.css";

export default function SubscriptionPage() {
  const { username, userid } = useParams();

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
      features: ["Add Unlimited Jobs", "Full Profile Access", "24/7 Support"],
      buttonText: "Choose Premium",
      className: "premium-plan",
    },
  ]);

  useEffect(() => {
    // Getting data from the backend about the user
    const getUserData = async () => {
      try {
        //   // `https://barter-5cky.onrender.com/user/${userid}`,
        const options = {};
        const responseData = await pokeBarterForSkillsServer(
          `${USER_URL}/${userid},${options},${TYPE_GET}`,
        );

        if (!responseData.userprofilefound) {
          alert(
            "You need to login first... Or some error occurred. Try again after some time.",
          );
          return;
        }

        let updatedPlans = [...plans]; // Create a copy of the current plans

        // Check current user's subscription and update the buttonText accordingly
        if (responseData.userProfiledata.subscription === "workprovider-basic") {
          updatedPlans[0].buttonText = "Current Plan";
        } else if (
          responseData.userProfiledata.subscription === "workprovider-mid"
        ) {
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

  const paymentmethod = async (plan, subscriptiontype) => {
    try {
      //   // "https://barter-5cky.onrender.com/create-checkout-session",
      const options = {
        data: {
          planName: plan.name,
          price: plan.price,
          useId: userid,
          subscriptionType: subscriptiontype,
          username: username,
          usertype: "freelance",
        },
      };
      const responseData = await pokeBarterForSkillsServer(
        `${CHECKOUT_URL},${options},${TYPE_POST}`,
      );

      if (responseData?.url) {
        window.location.href = responseData.url;
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while processing your payment. Please try again.",
      );
    }
  };

  const handleClick = async (plan) => {
    //if payment success
    const subscriptiontype =
      plan.name === "Basic"
        ? "workprovider-basic"
        : plan.name === "Premium"
          ? "workprovider-mid"
          : "workprovider-adv";

    await paymentmethod(plan, subscriptiontype);
  };

  return (
    <>
      <BackButton />
      <div className="timepass">
        <div className="subscription-page">
          <div className="content-container">
            <h1 className="page-title">Choose Your Plan</h1>
            <div className="plans-container">
              {plans.map((plan, index) => (
                <div key={index} className={`plan-card ${plan.className}`}>
                  {plan.badge && (
                    <div className="featured-badge">{plan.badge}</div>
                  )}
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
                      backgroundColor:
                        plan.buttonText === "Current Plan" ? "purple" : "gray",
                      cursor:
                        plan.buttonText === "Current Plan"
                          ? "not-allowed"
                          : "pointer",
                    }}
                    disabled={plan.buttonText === "Current Plan"}
                    onClick={() => handleClick(plan)}
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
}
