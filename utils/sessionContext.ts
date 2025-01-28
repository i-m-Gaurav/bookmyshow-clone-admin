import {auth} from "@/auth"

export default async function getSessionContext() {

    const session = await auth();

    return session;

    
}
