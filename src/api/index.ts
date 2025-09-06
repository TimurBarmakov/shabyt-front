import axios from '../utils/api/axios';
import {Cookies, useCookies} from "react-cookie";
import {COOKIE_KEY} from '../utils/constants/cookie';

// const API_BASE_URL = process.env.REACT_APP_URL;
const API_BASE_URL = 'http://195.93.152.109:8080/api/v1';
const cookies = new Cookies();

export const fetchRegister = async (data: { fullName: string; phoneNumber: string; password: string  }) => {
    try {
      const payload = { 
        fullName: data.fullName, 
        phoneNumber: data.phoneNumber,
        password: data.password,
      };
  
      const response = await axios.post(`${API_BASE_URL}/auth/register`, payload);
      
      return response.data;
    } catch (error) {
      console.error('Confirmation request error:', error);
      throw error;
    }
  };

export const fetchAuth = async (data: {email: string; password: string  }) => {
    try {
      const payload = { 
        email: data.email,
        password: data.password,
      };
  
      const response = await axios.post(`${API_BASE_URL}/auth/login`, payload);
      cookies.set(COOKIE_KEY.ACCESS_TOKEN,  response.data?.token , {path: '/'})
      return response.data;
    } catch (error) {
      console.error('Confirmation request error:', error);
      throw error;
    }
  };

  export const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/dashboard/stats`, {
      });
      return response.data;
    } catch (error) {
      console.error('Fetch content by category request error:', error);
      throw error;
    }
  };

  export const fetchGetCompany = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/company`, {
      });
      return response.data;
    } catch (error) {
      console.error('Fetch content by category request error:', error);
      throw error;
    }
  };

  export const fetchAddCompany = async (data: {name: any; bin: string, legalAddress: any, physicalAddress: any, bankName:any,bic:any, iban:any, planId: any   }) => {
    try {
      const payload = { 
        name: data.name,
        bin: data.bin,
        bic: data.bic,
        legalAddress: data.legalAddress,
        physicalAddress: data.physicalAddress,
        bankName: data.bankName,
        iban: data.iban,
        planId: data.planId
      };
  
      const response = await axios.post(`${API_BASE_URL}/company`, payload);
      return response.data;
    } catch (error) {
      console.error('Confirmation request error:', error);
      throw error;
    }
  };

  export const fetchGetChecklist = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/checklist`, {
      });
      return response.data;
    } catch (error) {
      console.error('Fetch content by category request error:', error);
      throw error;
    }
  };

export const fetchGetCompanyTable = async ({ pageable = {} } = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/company/table`, {
      params: {
        ...(pageable.page !== undefined && { page: pageable.page }),
        ...(pageable.size !== undefined && { size: pageable.size }),
        ...(pageable.sort !== undefined && { sort: pageable.sort }),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch company table error:", error);
    throw error;
  }
};



   export const fetchGetPlans = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/plan`, {
      });
      return response.data;
    } catch (error) {
      console.error('Fetch content by category request error:', error);
      throw error;
    }
  };

  export const fetchGetCompanyDashboard = async (companyId: any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/dashboard/stats/company/${companyId}`, {
      });
      return response.data;
    } catch (error) {
      console.error('Fetch article list request error:', error);
      throw error;
    }
  };

  export const fetchGetCompanyId = async (id: any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/company/${id}`, {
      });
      return response.data;
    } catch (error) {
      console.error('Fetch article list request error:', error);
      throw error;
    }
  };

  export const fetchLinkCreate = async (data: {companyId: any; targetEmail: string, role: any, validHours: any, inviteType: any  }) => {
    try {
      const payload = { 
        companyId: data.companyId,
        targetEmail: data.targetEmail,
        role: data.role,
        validHours: data.validHours,
        inviteType: data.inviteType
      };
  
      const response = await axios.post(`${API_BASE_URL}/invite/create`, payload);
      return response.data;
    } catch (error) {
      console.error('Confirmation request error:', error);
      throw error;
    }
  };