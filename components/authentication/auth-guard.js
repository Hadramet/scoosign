import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSession from "../../lib/useSession"
export const AuthGuard = (props) => {

    const { children } = props 
    const { user } = useSession({})
    const router = useRouter()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (!router.isReady) return
        if(!user) router.push({pathname:'/authentication/login', query:{returnUrl: router.asPath}}).catch(console.error)
        if (user) setChecked(true)

    },[router.isReady])

    if(!checked) return null

    return <>{children}</>
}
