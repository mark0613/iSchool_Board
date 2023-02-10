import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllCoursesPage } from '../pages';
import { getAllCourses, selectAllCourses, selectDataStatus } from '../slices/sheetsSlice';
import { LOADING } from '../utils/constants';

export const AllCoursesPageContainer = () => {
    const allCourses = useSelector(selectAllCourses);
    const dataStatus = useSelector(selectDataStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dataStatus]);

    return (
        <AllCoursesPage
            dataStatus={{
                isLoading: dataStatus === LOADING,
            }}
            allCoursesData={allCourses}
        />
    );
};
