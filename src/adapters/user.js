const adaptUserData = (userData) => {
  return {
    avatarUrl: userData.avatar_url,
    email: userData.email,
    isPro: userData.is_pro,
    name: userData.name,
  };
};

export default adaptUserData;
