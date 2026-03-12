'use client'

import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "./ui/button"

export default function CalendarClient() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [resource, setResource] = useState([])
  const [selectedResource, setSelected] = useState("")

  const FetchData = async()=>{
    const res = await fetch("/api/resource")
    const data = await res.json()
    setResource(data)
  }
  const HandleResource = async(id:string)=>{
    setSelected(id)
  }
  const HandleBooking = async()=>{
    const res = await fetch("/api/booking", {method:"POST", body:JSON.stringify({selectedResource, date})})
    const data = await res.json()
  }

  useEffect(()=>{FetchData()}, [])

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
    </div>
  )
}