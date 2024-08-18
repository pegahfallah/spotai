'use client'
import { useState } from 'react'


export default function WhoAmIButton({ whoAmIAction }: {
    whoAmIAction: () => Promise<string>;
}) {
    const [name, setName] = useState<string>();
    return (
        <div>
            <button className='btn-primary' onClick={async () => {
                setName(await whoAmIAction())
            }}>
                who am i ?
            </button>
            {name && <div> you are {name} </div>}
        </div>
    )

}