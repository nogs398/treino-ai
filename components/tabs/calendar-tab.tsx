"use client"

import { useState } from "react"
import { Calendar } from "@/components/calendar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Dumbbell, Utensils } from "lucide-react"

interface CalendarEvent {
  id: string
  date: Date
  type: "workout" | "diet"
  title: string
  description?: string
}

export function CalendarTab() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      date: new Date(),
      type: "workout",
      title: "Treino de Peito",
      description: "Supino 4x12, Crucifixo 3x15, Flexão 3x20"
    },
    {
      id: "2",
      date: new Date(),
      type: "diet",
      title: "Dieta do Dia",
      description: "2000 calorias, alto teor de proteína"
    }
  ])

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  const selectedDateEvents = selectedDate
    ? events.filter((event) => 
        event.date.toDateString() === selectedDate.toDateString()
      )
    : []

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Calendário</h2>
        <p className="text-gray-400">Visualize seus treinos e dietas organizados</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Calendar
            events={events}
            onDateClick={handleDateClick}
          />
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate
                  ? format(selectedDate, "dd 'de' MMMM", { locale: ptBR })
                  : "Selecione uma data"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length === 0 ? (
                <p className="text-gray-400 text-center py-4">
                  Nenhum evento para esta data
                </p>
              ) : (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-4 rounded-lg ${
                        event.type === "workout"
                          ? "bg-blue-600/20 border border-blue-600/30"
                          : "bg-green-600/20 border border-green-600/30"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {event.type === "workout" ? (
                          <Dumbbell className="h-4 w-4 text-blue-400" />
                        ) : (
                          <Utensils className="h-4 w-4 text-green-400" />
                        )}
                        <h4 className="font-semibold">{event.title}</h4>
                      </div>
                      {event.description && (
                        <p className="text-sm text-gray-300">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Legenda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-600/30 border border-blue-600/50" />
                <span className="text-sm">Treino</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-600/30 border border-green-600/50" />
                <span className="text-sm">Dieta</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
