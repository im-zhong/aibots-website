// 2024/7/5
// zhangzhong

// https://mui.com/material-ui/react-list/

import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
  IconButton,
} from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { KnowledgePoint } from "@/app/lib/agent/types";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

// 如果可以顺便显示文件的大小就好了
export function KnowledgePointsShower({
  knowledgePoints,
}: {
  knowledgePoints: KnowledgePoint[];
}) {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List disablePadding>
        {knowledgePoints.map((knowledgePoint) => (
          <ListItem
            key={knowledgePoint.id}
            disablePadding
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
            sx={{
              paddingTop: "0px", // Reduce top padding
              paddingBottom: "0px", // Reduce bottom padding
              "& .MuiListItemIcon-root": {
                minWidth: "32px", // Reduce the width if necessary
              },
              "& .MuiListItemText-root": {
                margin: "0px", // Adjust text margin if necessary
              },
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {knowledgePoint.type === "file" ? (
                  <InsertDriveFileOutlinedIcon fontSize="small" />
                ) : (
                  <LanguageOutlinedIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  knowledgePoint.path.slice(0, 10) +
                  (knowledgePoint.path.length > 10 ? " ..." : "")
                }
                secondary="secondary"
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
