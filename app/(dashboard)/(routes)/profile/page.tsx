import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const ProfilePage = () => {
    return (
        <div className='w-full -z-10 max-w-3xl mx-auto'>
            <UserProfile
                appearance={{
                    elements: {
                        rootBox: {
                            boxShadow: "none",
                            width: "100%"
                        },
                        card: {
                            border: "1px solid #e5e5e5",
                            backgroundColor:"#F1F7ED",
                            boxShadow: "none",
                            width: "100%"
                        }
                    },

                }}
            />
        </div>
    )
}

export default ProfilePage