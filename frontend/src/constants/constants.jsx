export const BASIC_SUBSCRIPTION = "freelance-basic";
export const MID_SUBSCRIPTION = "PREMIUM";
export const PREMIUM_SUBSCRIPTION = "PRO_PREMIUM";

export const getSubscriptionType = (subscription) => { 
  switch(subscription){
    case "freelance-basic":
      return "Basic";
    case "PREMIUM":
      return "Premium";
    case "PRO_PREMIUM":
      return "Pro Premium";
  }
}