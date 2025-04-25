model Game {
  id          String    @id
  status      String    @default("waiting")
  players     Player[]
  maxPlayers  Int       @default(4)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Player {
  id        String    @id @default(cuid())
  name      String
  game      Game      @relation(fields: [gameId], references: [id])
  gameId    String
  joinedAt  DateTime  @default(now())
}