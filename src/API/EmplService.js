import axios from "axios";

// Делаем запрос к сервеву и возрващаем массив с объектами(работниками)
export const getAllEmpls = async () => {
    const response = await axios.get("http://localhost:3001/employees");
    return response.data
};