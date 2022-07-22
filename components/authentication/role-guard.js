import { useEffect, useState } from "react"
import useSession from "../../lib/useSession"
import PropTypes from 'prop-types';

export const RoleGuard = (props) => {
    const { children, permissions } = props
    const { user } = useSession({})
    
    const [canView, setCanView] = useState(false)

    useEffect(() => {
        if (user) {

            let res = false
            
            console.log(permissions)
            permissions?.map( val => {
                if ( val === 'all' || val === user.infos.role ) res = true
            })
            
            if (res) setCanView(true)
        }

    },[])

    if (!canView) return null
    
    return <>{children}</>
}
RoleGuard.propTypes = {
    children: PropTypes.node,
    permissions: PropTypes.array
};