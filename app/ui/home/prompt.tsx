// 2024/6/29
// zhangzhong

import { Typography, Box, Stack, TextField, Button } from "@mui/material";

export function Prompt() {
  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={9}
        height={"60vh"}
      >
        <Stack direction="row" justifyContent="center" spacing={5}>
          <TextField variant="outlined" label="prompt"></TextField>
          <Button variant="contained" color="primary">
            generate
          </Button>
        </Stack>
        <Typography
          variant="caption"
          sx={{
            color: "white",
          }}
        >
          A surreal image of a Caucasian male astronaut, suited up in full space
          gear, helmet included, astride a galloping horse mid-flight, seemingly
          defying gravity. The pair is surrounded by the expanse of outer space,
          complete with distant stars and celestial bodies. The horse, chestnut
          brown in colour, appears equally prepared for space travel, with
          futuristic devices attached to it. Shadowy asteroids float past, and a
          colorful nebula blooms in the far distance, contrasting against the
          stark blackness of space. The astronaut holds onto the reins,
          determination evident even through the reflective visor of his helmet.
        </Typography>
      </Stack>
    </>
  );
}
