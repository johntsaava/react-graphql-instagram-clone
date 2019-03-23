export default (state, action) => {
  switch (action.type) {
    case "INIT_USER":
      return { ...state, user: { ...action.payload } };
    case "RESET_USER":
      return { ...state, user: null };
    case "SET_POST":
      return { ...state, postId: action.payload };
    case "RESET_POST":
      return { ...state, postId: null };
    default:
      throw new Error();
  }
};
