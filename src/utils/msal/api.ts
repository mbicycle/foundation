import {MsUser} from "./models";
import msGraph from "./msGraph.ts";

// TODO: is this needed?
export const getUser = async (): Promise<MsUser> => new Promise<MsUser>(
    (resolve, reject) => {
        // if (getGuestTokenFromStorage()) {
        //     resolve(mockUser);
        // }
        msGraph.graphClient.api('/me')
            .select('givenName,mail,surname')
            .get()
            .then((response: MsUser) => resolve(response))
            .catch((error) => reject(error));
    },
);
