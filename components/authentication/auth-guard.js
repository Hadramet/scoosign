import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSession from "../../lib/useSession"
export const AuthGuard = (props) => {

    const { children } = props 
    const { user } = useSession({ redirectTo: '/authentication/login' })
    const router = useRouter()

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (!router.isReady) return
        if (user) setChecked(true)

    },[router.isReady])

    if(!checked) return null

    return <>{children}</>
}
