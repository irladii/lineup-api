import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const team1 = searchParams.get("team1") ?? "Team 1";
  const team2 = searchParams.get("team2") ?? "Team 2";

  const players = [
    searchParams.get("p1") ?? "Waiting",
    searchParams.get("p2") ?? "Waiting",
    searchParams.get("p3") ?? "Waiting",
    searchParams.get("p4") ?? "Waiting",
    searchParams.get("p5") ?? "Waiting",
    searchParams.get("p6") ?? "Waiting",
  ];

  const debug = searchParams.get("debug") === "true";

  if (!debug && players.includes("Waiting")) {
    return new Response("All 6 players must be joined", { status: 400 });
  }

  const templateIndex = Math.floor(Math.random() * 4) + 1;
  const bg = new URL(
    `/templates/template${templateIndex}.png`,
    req.url
  ).toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1920px",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          position: "relative",
          fontFamily: "Arial",
        }}
      >
        {/* TEAM NAMES */}
        <div style={teamStyle(190, 180)}>{team1}</div>
        <div style={teamStyle(760, 180)}>{team2}</div>

        {/* LEFT TEAM */}
        <div style={playerStyle(270, 530)}>{players[0]}</div>
        <div style={playerStyle(270, 770)}>{players[1]}</div>
        <div style={playerStyle(270, 1010)}>{players[2]}</div>

        {/* RIGHT TEAM */}
        <div style={playerStyle(810, 530)}>{players[3]}</div>
        <div style={playerStyle(810, 770)}>{players[4]}</div>
        <div style={playerStyle(810, 1010)}>{players[5]}</div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
    }
  );
}

function teamStyle(x: number, y: number) {
  return {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    width: "300px",
    textAlign: "center",
    fontSize: "42px",
    fontWeight: "700",
    color: "#ffffff",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
}

function playerStyle(x: number, y: number) {
  return {
    position: "absolute",
    left: `${x - 120}px`,
    top: `${y}px`,
    width: "240px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    color: "#000000",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
}
