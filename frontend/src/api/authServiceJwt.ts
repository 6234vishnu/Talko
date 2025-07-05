import api from "./axiosInstance"

export const refreshAccessToken =async ():Promise<any>=>{
try {
    const response=await api.post('/user/auth/refresh')
    if(response.data.success){
        localStorage.setItem("accessToken", response.data.accessToken);
    }
} catch (error) {
    console.log(error,'error in auth service JWT');
    
}
}