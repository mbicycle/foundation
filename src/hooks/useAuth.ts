import {useCookies} from "react-cookie";
import * as authFn from "../utils/msal/auth.ts";
import {useCallback, useEffect, useState} from "react";
import msGraph from "../utils/msal/msGraph.ts";

export const useAuth = () => {
    const [userName, setUserName] = useState('')
    const [{ token, role }, setCookie, removeCookie] = useCookies(["token", "role"]);
    const searchParams = new URLSearchParams(window.location.search);


    const login = async () => {
        try {
            const user = await authFn.loginFn()
            console.log("auth user", user)
            setUserName(user.account.username)
            setCookie("token", user.accessToken, {
                path: "/",
                secure: true,
                sameSite: "none",
            });
            setCookie("role", user.idTokenClaims.roles[0] || '', {
                path: "/",
                secure: true,
                sameSite: "none",
            });
        } catch (e) {
            console.error(e)
        }
    };

    const logout = useCallback(() => {
        authFn.logoutFn()
        setUserName('')
        removeCookie("token", )
        removeCookie("role")
    }, [removeCookie]);



    useEffect(() => {
        msGraph.acquireToken().then(result => {
            console.log('msGraph.getToken()', result)
            if (result){
                setUserName(result.account.username)
                setCookie('token', result.accessToken)
                setCookie('role', result.idTokenClaims.roles[0] || '')
            }
        })
    }, [setCookie]);

    useEffect(() => {
        if (searchParams.get("unauth")) {
            logout();
            window.history.replaceState({}, "", "/");
        }
    }, [logout, removeCookie, searchParams]);


    return {
        userName,
        token,
        role,
        login,
        logout,
    }
}
