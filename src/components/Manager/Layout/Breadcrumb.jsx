import React, { Component } from 'react';
import ANTDBreadcrumb from 'antd/lib/breadcrumb';
import routes from 'routes/admin';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {get} from 'lodash';

export default class Breadcrumb extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    static defaultProps = {
        history: {}
    }

    RenderBreadcrumbs = () => {
        const {history} = this.props;
        let array = get(history, 'location.pathname', "").split('/');
        let breadcrumbs = [];
        while(array.length){
            let path = array.join('/');
            let route = routes.find((route) => route.path === path);
            if(route){
                breadcrumbs.push({
                    path: path,
                    title: route.title,
                    icon: route.icon
                });
            }
            array.pop();
        }
        return (
            <ANTDBreadcrumb style={{ margin: '16px 0' }} separator=">">
                {breadcrumbs.reverse().map((breadcrumb, key) => (
                    <ANTDBreadcrumb.Item key={key}>
                        {breadcrumb.icon}
                        <Link to={breadcrumb.path}>{breadcrumb.title}</Link>
                    </ANTDBreadcrumb.Item>
                ))}
            </ANTDBreadcrumb>
        )
    }

    render() {
        return <this.RenderBreadcrumbs/>;
    }
}
