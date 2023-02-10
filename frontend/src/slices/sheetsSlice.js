import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchStudentData, sendRegisterRequest } from '../services/sheetsApi';
import { FAIL, LOADING, OK } from '../utils/constants';
import { DateFormatter } from '../utils/formatters/DateFormatter';
import { RegisterTextFormatter } from '../utils/formatters/RegisterTextFormatter';

const initialState = {
    dataStatus: LOADING,
    studentInfo: {
        id: '',
        name: '',
    },
    studentCourses: [],
    courseHomeworks: {},
    registerStatus: '',
    registerMessage: {},
    registeringMap: {},
};

export const getStudentData = createAsyncThunk(
    'sheets/fetchStudentData',
    async (studentId) => {
        const response = await fetchStudentData(studentId);
        const studentInfo = response.data.student;
        const studentCourses = response.data.courses;
        const courses = [];
        const courseHomeworks = {};
        Object.keys(studentCourses).forEach((courseName) => {
            const { homeworks } = studentCourses[courseName];
            const { status } = studentCourses[courseName];
            const tableData = [];
            const homeworkData = [];
            Object.keys(homeworks).forEach((week) => {
                const date = DateFormatter.monthAndDay(homeworks[week].date);
                tableData.push({
                    date,
                    key: date,
                    status: {
                        status: RegisterTextFormatter.formatWithPlus(status[week]),
                        week,
                    },
                });
                homeworkData.push({
                    date,
                    description: homeworks[week].homework,
                });
            });
            courses.push({
                name: courseName,
                status: tableData,
                points: status['加分'],
            });
            courseHomeworks[courseName] = homeworkData;
        });
        return {
            info: studentInfo,
            courses,
            courseHomeworks,
        };
    },
);

export const handleRegisterResponse = createAsyncThunk(
    'sheets/sendRegisterRequest',
    async ({ id, course, data }) => {
        const response = await sendRegisterRequest({ id, course, data });
        return response.data;
    },
);

export const sheetsSlice = createSlice({
    name: 'sheets',
    initialState,
    reducers: {
        register: (state, action) => {
            const { week, dateText } = action.payload;
            state.registeringMap[week] = dateText;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudentData.fulfilled, (state, action) => {
                state.dataStatus = OK;
                const { info, courses, courseHomeworks } = action.payload;
                state.studentInfo = info;
                state.studentCourses = courses;
                state.courseHomeworks = courseHomeworks;
            })
            .addCase(getStudentData.rejected, (state) => {
                state.dataStatus = FAIL;
            });
        builder
            .addCase(handleRegisterResponse.pending, (state) => {
                state.registerStatus = LOADING;
            })
            .addCase(handleRegisterResponse.fulfilled, (state, action) => {
                state.registerStatus = OK;
                const { status, message } = action.payload;
                if (status !== OK) {
                    state.registerStatus = FAIL;
                }
                state.registerMessage = message;
            })
            .addCase(handleRegisterResponse.rejected, (state) => {
                state.registerStatus = FAIL;
            });
    },
});

export const { register } = sheetsSlice.actions;

export const selectDataStatus = (state) => state.sheets.dataStatus;
export const selectStudentInfo = (state) => state.sheets.studentInfo;
export const selectStudentCourses = (state) => state.sheets.studentCourses;
export const selectCourseHomeworks = (state) => state.sheets.courseHomeworks;
export const selectRegisterStatus = (state) => state.sheets.registerStatus;
export const selectRegisterMessage = (state) => state.sheets.registerMessage;
export const selectRegisteringMap = (state) => state.sheets.registeringMap;

export default sheetsSlice.reducer;
