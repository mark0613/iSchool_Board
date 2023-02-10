import axios from 'axios';

const SHEETS_API = process.env.REACT_APP_SHEETS_API;

export const fetchStudentData = (studentId) => {
    const api = `${SHEETS_API}?type=student_data&id=${studentId}`;
    return axios.get(api);
};

export const sendRegisterRequest = ({ id, course, data }) => {
    const dataString = JSON.stringify(data);
    const api = `${SHEETS_API}?type=register&id=${id}&course=${course}&data=${dataString}`;
    return axios.get(api);
};
