"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function NewGamePage() {
  const router = useRouter()
  const [playerName, setPlayerName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  const handleCreateGame = async () => {
    if (!playerName.trim()) return
    setIsCreating(true)

    try {
      const response = await fetch('/api/game/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName: playerName.trim(),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create game')
      }

      const { gameId } = await response.json()
      router.push(`/game/${gameId}?name=${encodeURIComponent(playerName.trim())}`)
    } catch (error) {
      console.error("Failed to create game:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create game",
        variant: "destructive"
      })
      setIsCreating(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-amber-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create New Game</CardTitle>
          <CardDescription>Set up a new Scrabble game and invite friends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-amber-700 hover:bg-amber-800"
            onClick={handleCreateGame}
            disabled={!playerName.trim() || isCreating}
          >
            {isCreating ? "Creating Game..." : "Create Game"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
