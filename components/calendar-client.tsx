'use client'

import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "./ui/button"
import { Booking, Resource } from "@/lib/generated/prisma/client"

export default function CalendarClient() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [resource, setResource] = useState<Resource[]>([])
  const [selectedResource, setSelected] = useState("")
  const [booking, setBooking] = useState<Booking[]>([])

  const FetchData = async()=>{
    const res = await fetch("/api/resource")
    const data = await res.json()
    setResource(data)
  }
  const FetchBooking = async()=>{
    const res = await fetch("/api/booking")
    const data = await res.json()
    setBooking(data)
  }
  const HandleResource = async(id:string)=>{
    setSelected(id)
  }
  const HandleBooking = async()=>{
    const res = await fetch("/api/booking", {method:"POST", body:JSON.stringify({selectedResource, date})})
    const data = await res.json()
  }

  useEffect(()=>{FetchData(); FetchBooking()}, [])

  return (
    <div>
        <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
        />
        {resource.map(r=>(
            <div>
                <h1 onClick={()=>HandleResource(r.id)} className="cursor-pointer">{r.name}</h1>
            </div>
        ))}
        <Button onClick={HandleBooking} className="cursor-pointer">Book</Button>
        {booking.map(b=>(
            <div>
                <h1>{new Date(b.date).toLocaleDateString()}</h1>
                <h2>{b.resourceId}</h2>
            </div>
        ))}
    </div>
  )
}