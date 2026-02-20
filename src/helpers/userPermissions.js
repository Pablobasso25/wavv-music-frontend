
export const isPremiumUser = (user) => {
  return user?.role === "admin" || user?.subscription?.status === "premium";
};

export const isAdmin = (user) => {
  return user?.role === "admin";
};

export const isFreeUser = (user) => {
  return !isPremiumUser(user);
};
