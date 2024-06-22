import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";
import { Agent } from "@/app/lib/agent/agent-client";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Avatar>Agent</Avatar>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Agent Name: {agent.name}
        </Typography>
        <Divider />
        <Typography variant="body2">
          A long long long long long long long long long long long long long
          long agent description: {agent.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Chat with it</Button>
      </CardActions>
    </Card>
  );
}
