// If token valid returns status 200
// If token invalid or expired throws 401 status
export const getGuestTokenValidity = async (token: string): Promise<boolean> => new Promise<boolean>(
    (resolve) => {
        fetch(`${import.meta.env.VITE_TOKEN_URL}/token`,  {
            method: "POST",
            headers: {
                'MBCL-TOKEN': token,
            },
        })
            .then((response) => {
                resolve(response.status === 200);
            })
            .catch(() => resolve(false));
    },
);
