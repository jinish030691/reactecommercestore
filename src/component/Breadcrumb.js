import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { NavLink } from "react-router-dom";
import { FormLabel,Box  } from '@material-ui/core';

const Breadcrumbs = ({ breadcrumbs }) => (
    <Box display="flex" flexDirection="row" p={1} m={1} className="breadcrumbs-box">
        
        {breadcrumbs.map(({ match, index , breadcrumb }) => (
            <Box  p={1} key={match.url}>
                {/* <NavLink to={match.url}>{breadcrumb}</NavLink> */}
                {(index === 1) ? <NavLink to={match.url}>{breadcrumb}</NavLink>  : <FormLabel >{breadcrumb}</FormLabel>}
            </Box>
        ))}
    </Box>
)

export default withBreadcrumbs()(Breadcrumbs);