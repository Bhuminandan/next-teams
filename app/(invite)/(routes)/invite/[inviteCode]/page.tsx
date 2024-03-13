import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


interface InviteCodePageProps {
    params: {
        inviteCode: string
    }    
}



const InviteCodePage =  async ( {
    params
} : InviteCodePageProps ) => {


    const profile = await currentProfile();

    if(!profile) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.inviteCode) {
        return redirect('/');
    }

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (existingServer) {
        return redirect(`/servers/${existingServer.id}`)
    }

    const serveer = await db.server.update({
        where: {
            inviteCode: params.inviteCode
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id
                    }
                ]
            }
        }
    });

    if (serveer) {
        return redirect(`/servers/${serveer.id}`)
    }
    
  return (
    <div>InviteCodePage</div>
  )
}

export default InviteCodePage