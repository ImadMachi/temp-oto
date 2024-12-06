'use client'

import { useState } from 'react'
import DeliveryCompanyFilter, { type DeliveryCompanyType } from './DeliveryCompanyFilter'
import DeliveryCompanyStatisticTable from './DeliveryCompanyStatisticTable'

export default function DeliveryCompany() {
  const [deliveryCompany, setDeliveryCompany] = useState<DeliveryCompanyType | null>(null)

  return (
    <>
      <DeliveryCompanyFilter deliveryCompany={deliveryCompany} setDeliveryCompany={setDeliveryCompany} />
      <DeliveryCompanyStatisticTable deliveryCompany={deliveryCompany} />
    </>
  )
}
