import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from 'antd';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { NavBar } from '../components/navbars';

const { Footer } = Layout;

const Content = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        padding: '10px 10px',
    },
    [theme.breakpoints.up('md')]: {
        padding: '10px 50px',
    },
    background: theme.palette.common.white,
    minHeight: 'calc(100vh - 122.4px)',
}));

export const Template = ({ content }) => {
    const { keywords } = useParams();
    const onSearch = (value) => {
        window.location.href = `/student/${value}`;
    };

    return (
        <Layout className="layout">
            <NavBar searchText={keywords} onSearch={onSearch} />

            <Content>{content}</Content>

            <Footer style={{ textAlign: 'center' }}>
                Copyright © 2023 FCU iSchool
            </Footer>
        </Layout>
    );
};
