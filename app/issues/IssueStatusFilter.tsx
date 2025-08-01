"use client";
import { Select } from '@radix-ui/themes'
import React from 'react'
import { Status } from '../generated/prisma'
import { useRouter, useSearchParams } from 'next/navigation';


const statuses: { label: string, value: Status | "unassigned"}[] = [
    { label: 'All', value: 'unassigned'},
    { label: 'Open', value: 'OPEN'},
    { label: 'In Progress', value: 'IN_PROGRESS'},
    { label: 'Closed', value: 'CLOSED'},
]

const IssueStatusFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
  return (
    <Select.Root
    defaultValue={searchParams.get('status') || 'unassigned'}
     onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status!=='unassigned') params.append('status', status);
        if (searchParams.get('orderBy'))
            params.append('orderBy', searchParams.get('orderBy')!)
        
        const query = params.size ? '?' + params.toString() : ''
        router.push('/issues' + query)
    }}>
        <Select.Trigger placeholder='Filter by status...' />
        <Select.Content>
            {statuses.map(status => (
                <Select.Item key={status.value} value={status.value}>
                    {status.label}
                </Select.Item>
            ))}
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter