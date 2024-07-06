"use client";

import * as React from "react";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";
import { Agent } from "@/app/lib/agent/agent-client";
import { chatClient } from "@/app/lib/chat/chat_client";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/ui/auth/user-provider";
import { path } from "@/app/lib/path";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ClickableFavoriteIcon() {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleClick}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}

export function AgentCard({ agent }: { agent: Agent }) {
  const router = useRouter();
  const { user } = React.useContext(UserContext);
  if (!user) {
    return null;
  }

  const handleClick = async () => {
    // 只要一点击，我们就首先创建一个chat
    // 然后在进入真正的chat页面 岂不完美！哈哈
    const { chat_id, error } = await chatClient.createChat({
      user_id: user.id,
      agent_id: agent.id,
    });
    if (error) {
      console.error("Error:", error);
      return;
    }
    if (!chat_id) {
      console.error("Error: chat_id is null");
      return;
    }

    router.push(`${path.agent.chat}/${chat_id}`);
  };

  const description =
    "aldjflasjdflkasjdfljaslkdfjalskjdflkasjflkasjflkajsdlfkjaslkdfjlaksjdflkasjfklasjfkljaslkfjaslkdfjklsajdflk";

  return (
    <Card
      sx={
        {
          // width: 300,
          //height: 200,
          // "&:last-child": {
          //   // Targeting the last-child pseudo-class can help remove padding applied by Material-UI
          //   paddingBottom: 0,
          //   marginBottom: 0,
          // },
        }
      }
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />

      <CardContent>
        <Typography
          // sx={{ border: "1px solid red" }}
          // width="100%"
          // height={50}
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
