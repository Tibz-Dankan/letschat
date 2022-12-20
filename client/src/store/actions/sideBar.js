import { sideBarActions } from "../store";

export const openSideBar = () => {
  if (window.innerWidth <= 300) {
    document.getElementById("sidebar-section").style.width = "100%";
  } else {
    document.getElementById("sidebar-section").style.width = "250px";
  }
  return async (dispatch) => {
    await dispatch(sideBarActions.openSideBar({ isOpenSideBar: true }));
  };
};

export const closeSideBar = () => {
  document.getElementById("sidebar-section").style.width = "0";
  return async (dispatch) => {
    await dispatch(sideBarActions.closeSideBar({ isOpenSideBar: false }));
  };
};
