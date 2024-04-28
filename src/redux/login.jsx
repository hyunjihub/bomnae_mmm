const SET_LOGIN = 'login/SET_LOGIN';
const SET_MEMBER_ID = 'login/SET_MEMBER_ID';
const SET_PROFILEIMG = 'login/SET_PROFILEIMG';
const SET_IS_ADMIN = 'login/SET_IS_ADMIN';

export const setLogin = (isLogIn) => ({ type: SET_LOGIN, isLogIn });
export const setMemberid = (id) => ({ type: SET_MEMBER_ID, id });
export const setProfileimg = (profileImg) => ({ type: SET_PROFILEIMG, profileImg });
export const setAdmin = (isAdmin) => ({ type: SET_IS_ADMIN, isAdmin });

const initailState = {
  isLogIn: false,
  isAdmin: false,
  memberId: null,
  profileImg: null,
};

export default function login(state = initailState, action) {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLogIn: action.isLogIn,
      };
    case SET_MEMBER_ID:
      return {
        ...state,
        memberId: action.id,
      };
    case SET_PROFILEIMG:
      return {
        ...state,
        profileImg: action.profileImg,
      };
    case SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.isAdmin,
      };
    default:
      return state;
  }
}
