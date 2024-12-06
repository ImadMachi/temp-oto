'use client'

import { useState } from 'react'
import RecipientFilter, { recipients, type RecipientType } from './RecipientFilter'
import RecipientOrderList from './RecipientOrderList'
import StatisticCards from './StatisticCards'
import Image from 'next/image'

export default function RecipientDetails() {
  const [recipient, setRecipient] = useState<RecipientType | null>(null)

  return (
    <>
      <RecipientFilter recipient={recipient} setRecipient={setRecipient} />
      {!!recipient ? (
        <>
          <StatisticCards />
          <RecipientOrderList />
        </>
      ) : (
        <div className='relative w-full max-w-xl aspect-[4/3] mx-auto'>
          <Image src='/images/no-data-found.svg' alt='No Data' fill />
        </div>
      )}
    </>
  )
}
