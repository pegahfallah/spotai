import { getServerSession } from "next-auth"
import WhoAmIButton from "../components/Button/WhoAmIButton";
    
export default async function ServerActionPage() {
    const whoAmI = async () => {
        'use server';
        const session = await getServerSession()
        return session?.user?.name || 'not logged in'
    }
    return (
        <div>
            <WhoAmIButton whoAmIAction={whoAmI} />
        </div>
    )
}