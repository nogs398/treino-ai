"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HomeTab } from "@/components/tabs/home-tab"
import { ProfileTab } from "@/components/tabs/profile-tab"
import { WorkoutTab } from "@/components/tabs/workout-tab"
import { DietTab } from "@/components/tabs/diet-tab"
import { ChatTab } from "@/components/tabs/chat-tab"
import { CalendarTab } from "@/components/tabs/calendar-tab"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === "home" && <HomeTab />}
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "workout" && <WorkoutTab />}
        {activeTab === "diet" && <DietTab />}
        {activeTab === "chat" && <ChatTab />}
        {activeTab === "calendar" && <CalendarTab />}
      </main>
    </div>
  )
}
