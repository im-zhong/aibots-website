// 2024/6/29
// zhangzhong

import {
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { InputButton } from "@/app/ui/common/input-button";
import theme from "@/app/ui/theme";

export function Prompt() {
  return (
    <Container
      sx={{
        width: "90%",
      }}
    >
      <Stack direction="column" spacing={2}>
        <InputButton
          label=""
          placeholder="prompt to gen background"
          button="gen"
          onSubmit={async (data: string) => {
            console.log(data);
          }}
        />

        <Typography
          variant="body2"
          sx={{
            color: "white",
          }}
        >
          A surreal image of a Caucasian male astronaut, suited up in full space
          gear, helmet included, astride a galloping horse mid-flight, seemingly
          defying gravity. The pair is surrounded by the expanse of outer space,
          complete with distant stars and celestial bodies. The horse, chestnut
          brown in colour, appears equally prepared for space travel, with
          futuristic devices attached to it.
        </Typography>
      </Stack>
    </Container>
  );
}
