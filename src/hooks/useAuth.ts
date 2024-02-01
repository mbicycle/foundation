import {useCookies} from "react-cookie";
import * as authFn from "../utils/msal/auth.ts";
import {useCallback, useEffect, useState} from "react";
import msGraph from "../utils/msal/msGraph.ts";
import {getGuestTokenValidity} from "../utils/api.ts";

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
        if (role !== 'guest') authFn.logoutFn()
        setUserName('')
        removeCookie("token")
        removeCookie("role")
        window.history.replaceState({}, "", "/")
    }, [removeCookie, role]);



    // TODO: do we log in or log out if there is no token but there is ms acc
    useEffect(() => {
        if (!token && role !== 'guest'){
            msGraph.acquireToken().then(result => {
                console.log('msGraph.getToken()', result)
                if (result){
                    setUserName(result.account.username)
                    setCookie('token', result.accessToken)
                    setCookie('role', result.idTokenClaims.roles[0] || '')
                }
            })
        }
    }, [role, setCookie, token]);

    useEffect(() => {
        if (searchParams.get("unauth")) {
            logout();
        }

        const guestToken = searchParams.get('token')
        if (guestToken){
            getGuestTokenValidity(guestToken)
                .then((isValid) => {
                    if (isValid){
                        setUserName("Guest")
                        setCookie('token', guestToken)
                        setCookie('role', "guest")
                    }else {
                        alert('Token invalid')
                    }
                });
        }
    }, [logout, removeCookie, searchParams, setCookie]);


    return {
        userName,
        token,
        role,
        login,
        logout,
    }
}
