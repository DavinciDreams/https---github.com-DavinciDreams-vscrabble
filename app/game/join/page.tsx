"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function JoinGamePage() {
  const router = useRouter()
  const [playerName, setPlayerName] = useState("")
  const [gameId, setGameId] = useState("")
  const [isJoining, setIsJoining] = useState(false)
  const { toast } = useToast()

  const handleJoinGame = async () => {
    if (!playerName.trim() || !gameId.trim()) return

    setIsJoining(true)

    try {
      // Validate game ID format
      const formattedGameId = gameId.toUpperCase().trim()
      if (!/^[A-Z0-9]{6}$/.test(formattedGameId)) {
        throw new Error("Invalid game code format. Must be 6 characters.")
      }

      // Call API to validate and join game
      const response = await fetch('/api/game/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: formattedGameId,
          playerName: playerName.trim()
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to join game')
      }

      // Navigate to the game
      router.push(`/game/${formattedGameId}?name=${encodeURIComponent(playerName.trim())}`)
    } catch (error) {
      console.error("Failed to join game:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to join game",
        variant: "destructive"
      })
      setIsJoining(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-amber-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Join Game</CardTitle>
          <CardDescription>Enter a game code to join an existing Scrabble game</CardDescription>
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
            <div className="space-y-2">
              <Label htmlFor="gameId">Game Code</Label>
              <Input
                id="gameId"
                placeholder="Enter 6-digit code"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                maxLength={6}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-amber-700 hover:bg-amber-800"
            onClick={handleJoinGame}
            disabled={!playerName.trim() || !gameId.trim() || isJoining}
          >
            {isJoining ? "Joining Game..." : "Join Game"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
