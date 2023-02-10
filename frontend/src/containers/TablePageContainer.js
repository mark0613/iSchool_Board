import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StatusTable } from '../components/tables';

import { TablePage } from '../pages/TablePage';
import {
    getStudentData,
    handleRegisterResponse,
    selectCourseHomeworks,
    selectDataStatus,
    selectStudentCourses,
    selectStudentInfo,
    selectRegisterMessage,
    selectRegisterStatus,
    register,
    selectRegisteringMap,
} from '../slices/sheetsSlice';
import { FAIL, LOADING, OK } from '../utils/constants';

export const TablePageContainer = () => {
    const { keywords } = useParams();
    const dataStatus = useSelector(selectDataStatus);
    const studentCourses = useSelector(selectStudentCourses);
    const studentInfo = useSelector(selectStudentInfo);
    const courseHomeworks = useSelector(selectCourseHomeworks);
    const registerStatus = useSelector(selectRegisterStatus);
    const registerMessage = useSelector(selectRegisterMessage);
    const registeringMap = useSelector(selectRegisteringMap);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedCourse, setSelectedCourse] = useState('');
    const getCurrentCourseHomeworks = () => {
        if (selectedCourse in courseHomeworks) {
            return courseHomeworks[selectedCourse].filter((item) => item.description !== '');
        }
        return [];
    };

    useEffect(() => {
        if (keywords !== undefined) {
            dispatch(getStudentData(keywords));
        }

        if (dataStatus === OK) {
            setSelectedCourse(studentCourses[0].name);
        }

        if (registerStatus === OK) {
            messageApi.open({
                type: 'success',
                content: '成功!',
            });
            window.location.reload();
        }
        if (registerStatus === FAIL) {
            messageApi.open({
                type: 'error',
                content: registerMessage,
            });
        }
    }, [dataStatus, registerStatus]);

    return (
        <>
            {contextHolder}
            <TablePage
                dataStatus={{
                    isLoading: dataStatus === LOADING,
                    isEmpty: dataStatus === FAIL,
                }}
                student={studentInfo}
                courses={{
                    default: selectedCourse,
                    tabsData: studentCourses.map((item) => ({
                        key: item.name,
                        label: item.name,
                        children: (
                            <StatusTable
                                data={item.status}
                                onWrite={({ week, dateText }) => {
                                    dispatch(register({ week, dateText }));
                                }}
                            />
                        ),
                    })),
                    onChange: (key) => setSelectedCourse(key),
                }}
                homeworks={getCurrentCourseHomeworks()}
                save={{
                    isSaving: registerStatus === LOADING,
                    onSave: () => dispatch(handleRegisterResponse({
                        id: studentInfo.id,
                        course: selectedCourse,
                        data: registeringMap,
                    })),
                }}
            />
        </>
    );
};
