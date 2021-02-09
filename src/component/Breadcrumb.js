import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { NavLink } from "react-router-dom";
import { Box , FormLabel } from '@material-ui/core';

const Breadcrumbs = ({ breadcrumbs }) => (
    <Box display="flex" flexDirection="row" p={1} m={1} className="breadcrumbs-box">
        {breadcrumbs.map(({ match, breadcrumb },index) => (
            <Box  p={1} key={match.url}>
                {/* <NavLink to={match.url}>{breadcrumb}</NavLink> */}
                {(index === 1) ? <FormLabel >{breadcrumb}</FormLabel>  : <NavLink to={match.url}>{breadcrumb}</NavLink>}
            </Box>
        ))}
    </Box>
)

export default withBreadcrumbs()(Breadcrumbs);