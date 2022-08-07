import axios from "axios";
import axiosApi from "../axios/axiosApi";

import { API_ROUTER } from "../config";

export const plansSearchByText = async ({ text }) => {
  const response = await axiosApi.get(
    `${API_ROUTER.USER.userGetUsersBySearch}/${text}`
  );
  const { data, status } = response;

  return {
    okUsers: data?.length > 0 ? true : false,
    users: data || [],
    status,
  };
};

export const planSearchByPack = async ({ role }) => {
  const response = await axiosApi.get(
    `${API_ROUTER.USER.userGetUsersByRole}/${role}`
  );
  const { data, status } = response;

  return {
    okUsers: data?.length > 0 ? true : false,
    users: data || [],
    status,
  };
};

export const planSearchAll = async () => {
  const response = await axiosApi.get(`${API_ROUTER.PLAN.getPlanInstance}`);
  const { data, status } = response;

  return {
    ok: data?.count > 0 ? true : false,
    plans: data.data || [],
    status,
  };
};

export const plansById = async (planId) => {
  const response = await axiosApi.get(
    `${API_ROUTER.PLAN.getPlanInstance}/${planId}`
  );
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    data: data || [],
    status,
  };
};

export const getImagesPlan = async (planId) => {
  const response = await axiosApi.get(`${API_ROUTER.PLAN.getImages}/${planId}`);
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    data: data || [],
    status,
  };
};

export const getTourguides = async () => {
  const response = await axiosApi.get(API_ROUTER.PLAN.getTourguide);
  const { data, status } = response;

  return {
    ok: status === 200 ? true : false,
    data: data || [],
    status,
  };
};

/*

export const userSearchDomain = async (id) => {
  const response = await axiosApi.get(
    `${API_ROUTER.USER.userGetUsersForDomain}/${id}`
  );
  const { data, status } = response;

  return {
    okUsers: data?.length > 0 ? true : false,
    users: data || [],
    status,
  };
};

export const userDomainByTag = async (id) => {
  const response = await axiosApi.get(
    `${API_ROUTER.USER.userGetUsersByTag}/${id}`
  );
  const { data, status } = response;

  return {
    okUsers: data?.length > 0 ? true : false,
    users: data || [],
    status,
  };
};

export const userTotalByActive = async (active) => {
  const response = await axiosApi.post(API_ROUTER.USER.userGetUsersByStatus, {
    active,
  });
  const { data, status } = response;

  return {
    okUsers: data?.length > 0 ? true : false,
    users: data || [],
    status,
  };
};

*/
