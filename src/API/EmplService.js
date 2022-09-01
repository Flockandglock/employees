
import axios from "axios";

// Делаем запрос к сервеву и возрващаем массив с объектами(работниками)
export const getAllEmpls = async () => {
    const response = await axios.get("http://localhost:3001/employees");
    return response.data
};

export const postEmpl = async (empl) => {
    const posting = await axios.post("http://localhost:3001/employees", empl);
    
};

export const deleteEmpl = async (id) => {
    const deleting = await axios.delete(`http://localhost:3001/employees/${id}`)
}