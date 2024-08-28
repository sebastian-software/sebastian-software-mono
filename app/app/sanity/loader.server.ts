import { setServerClient } from "@sanity/react-loader"

import { client } from "~/sanity/client"



// We need to set the client used by `loadQuery` here, it only affects the server and ensures the browser bundle isn't bloated
setServerClient(client)

export {loadQuery} from "@sanity/react-loader"