import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useSession({ redirectTo, redirectIfFound }) {

    const { data: user, mutate: mutateUser, isValidating: isLoading } = useSWR('/api/authentication/session-user')

    useEffect(() => {

        if (!redirectTo && !user) return
        if ((redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
            (redirectIfFound && user?.isLoggedIn)) {

            Router.push(redirectTo)
        }
    }, [user, redirectIfFound, redirectTo])

    return { user, mutateUser, isLoading }
}

