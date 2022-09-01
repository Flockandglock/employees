import { useContext } from "react";
import { useState, useCallback } from "react";
import { EmplsContext } from "../context";


// Она используется в employees-list, там в нее передается колбэк фун-ия из API EmplService getAllEmpls 
export const useFetching = (callback) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    

    const fetchEmpls = async () => {
        try {
            setLoading(true)
            await callback()
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    };

    return {loading, error, fetchEmpls}
};



// export const useHttp = () => {
//     const request = async(url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
//         try {
//             const response = await fetch(url, {method, body, headers});

//             if(!response.ok) {
//                 throw new Error(`Could not fetch ${url}, status: ${response.status}`)
//             }

//             const data = await response.json();
//             console.log(data)
//             return data;
//         } catch (error) {
//             throw error;
//         }
        
//     };

   
//     return request;
// };
