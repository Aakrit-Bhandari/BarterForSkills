import React from "react";
import '../src/Subscription.css'

const SubscriptionPage = () => {
  const plans = [
    {
      name: "Normal",
      price: "₹0/month",
      features: ["Basic support", "Access to standard content", "1 user"],
      buttonText: "Choose Normal",
      className: "normal-plan",
    },
    {
      name: "Premium",
      price: "₹6000/month",
      features: [
        "Priority support",
        "Access to premium content",
        "Up to 5 users",
      ],
      buttonText: "Choose Premium",
      className: "premium-plan",
      badge:"Popular",
    },
    {
      name: "Advanced",
      price: "₹9000/month",
      features: [
        "24/7 VIP support",
        "All content access",
        "Unlimited users",
      ],
      buttonText: "Choose Advanced",
      className: "advanced-plan",
    },
  ];

  return (
    <div className="timepass">
    <div className="subscription-page">
      <div className="content-container">
        <h1 className="page-title">Choose Your Plan</h1>
        <div className="plans-container">
          {plans.map((plan, index) => (
            <div key={index} className={`plan-card ${plan.className}`}>
                {plan.badge && <div className="featured-badge">{plan.badge}</div>}
              <h2 className="plan-name">{plan.name}</h2>
              <p className="plan-price">{plan.price}</p>
              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="feature-items">
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="choose-button">{plan.buttonText}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SubscriptionPage;