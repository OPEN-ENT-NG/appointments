import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
} from "@cgi-learning-hub/ui";
import {
  ShareRight,
  ShareRightAction,
  ShareRightActionDisplayName,
} from "@edifice.io/client";
import { useTranslation } from "react-i18next";

import { BoxComponentType } from "~/core/themeProps";

import { hasRight, showShareRightLine } from "./utils";
import {
  actionColumnStyle,
  avatarColumnStyle,
  avatarStyle,
  defaultAvatarStyle,
  nameColumnStyle,
  rightsColumnStyle,
  RotativeExpandMoreRoundedIcon,
} from "./style";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

export const ShareLine = ({
  shareRight,
  showBookmark,
  toggleBookmark,
  shareRightActions,
  toggleRight,
  onDeleteRow,
}: {
  shareRight: ShareRight;
  shareRightActions: ShareRightAction[];
  showBookmark: boolean;
  toggleRight: (
    shareRight: ShareRight,
    actionName: ShareRightActionDisplayName,
  ) => void;
  toggleBookmark: () => void;
  onDeleteRow: (shareRight: ShareRight) => void;
}) => {
  const { t: tEdifice } = useTranslation();
  return (
    showShareRightLine(shareRight, showBookmark) && (
      <Box
        component={BoxComponentType.TR}
        key={shareRight.id}
        className={shareRight.isBookmarkMember ? "bg-light" : ""}
      >
        <Box component={BoxComponentType.TD} sx={avatarColumnStyle}>
          {shareRight.type !== "sharebookmark" && (
            <Avatar src={shareRight.avatarUrl} sx={avatarStyle}>
              <PersonRoundedIcon sx={defaultAvatarStyle} />
            </Avatar>
          )}
          {shareRight.type === "sharebookmark" && <BookmarkBorderRoundedIcon />}
        </Box>
        <Box component={BoxComponentType.TD} sx={nameColumnStyle}>
          <Box>
            {shareRight.type === "sharebookmark" && (
              <Button
                variant="text"
                color="inherit"
                endIcon={
                  <RotativeExpandMoreRoundedIcon showBookmark={showBookmark} />
                }
                onClick={toggleBookmark}
              >
                {shareRight.displayName}
              </Button>
            )}
            {shareRight.type !== "sharebookmark" && shareRight.displayName}
            {shareRight.type === "user" &&
              ` (${tEdifice(shareRight.profile || "")})`}
          </Box>
        </Box>
        {shareRightActions
          .filter((shareRightAction) => shareRightAction.id === "read")
          .map((shareRightAction) => (
            <Box
              component={BoxComponentType.TD}
              key={shareRightAction.displayName}
              sx={rightsColumnStyle}
            >
              {!shareRight.isBookmarkMember && (
                <Checkbox
                  color="secondary"
                  checked={hasRight(shareRight, shareRightAction)}
                  onChange={() => {
                    toggleRight(shareRight, shareRightAction.id);
                  }}
                />
              )}
            </Box>
          ))}
        <Box component={BoxComponentType.TD} sx={actionColumnStyle}>
          {!shareRight.isBookmarkMember && (
            <IconButton onClick={() => onDeleteRow(shareRight)}>
              <CloseRoundedIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    )
  );
};
