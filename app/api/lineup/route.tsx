import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const team1 = searchParams.get("team1") ?? "Team 1";
  const team2 = searchParams.get("team2") ?? "Team 2";

  const players = [
    searchParams.get("p1"),
    searchParams.get("p2"),
    searchParams.get("p3"),
    searchParams.get("p4"),
    searchParams.get("p5"),
    searchParams.get("p6"),
  ];

  const debug = searchParams.get("debug") === "true";

  if (!debug && players.some(p => !p)) {
    return new Response("All players not joined", { status: 400 });
  }

  // 🔥 Load Teko font
  const fontData = await fetch(
    new URL("/fonts/Teko-Regular.ttf", req.url)
  ).then(res => res.arrayBuffer());

  const templateIndex = Math.floor(Math.random() * 4) + 1;
  const bg = new URL(`/templates/template${templateIndex}.png`, req.url).toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1920px",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          position: "relative",
          fontFamily: "Teko",
        }}
      >
        {/* TEAM NAMES */}
        <div style={teamStyle(190, 180)}>{team1}</div>
        <div style={teamStyle(760, 180)}>{team2}</div>

        {/* LEFT TEAM PLAYERS */}
        <div style={playerStyle(190, 450)}>{players[0]}</div>
        <div style={playerStyle(190, 750)}>{players[1]}</div>
        <div style={playerStyle(190, 1050)}>{players[2]}</div>

        {/* RIGHT TEAM PLAYERS */}
        <div style={playerStyle(760, 450)}>{players[3]}</div>
        <div style={playerStyle(760, 750)}>{players[4]}</div>
        <div style={playerStyle(760, 1050)}>{players[5]}</div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
      fonts: [
        {
          name: "Teko",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}

function teamStyle(left: number, top: number) {
  return {
    position: "absolute",
    left,
    top,
    fontSize: 64,
    fontWeight: 700,
    color: "#000000",
    whiteSpace: "nowrap",
  };
}

function playerStyle(left: number, top: number) {
  return {
    position: "absolute",
    left,
    top,
    fontSize: 48,
    fontWeight: 500,
    color: "#000000",
    whiteSpace: "nowrap",
  };
    }
