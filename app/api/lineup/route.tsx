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
          fontFamily: "Arial",
        }}
      >
        <div style={{ position: "absolute", left: 190, top: 180 }}>{team1}</div>
        <div style={{ position: "absolute", left: 760, top: 180 }}>{team2}</div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
